
declare
  log_date date := current_date - 1;
  record record;
begin
  -- Loop through all users
  for record in
    select
      p.id as user_id,
      coalesce(jsonb_object_agg(cat_data.category, cat_data.emissions) filter (where cat_data.category is not null), '{}'::jsonb) as breakdown,
      coalesce(sum(cat_data.emissions), 0) as total_emissions
    from profiles p
    left join (
      select
        ual.user_id,
        coalesce(a.category, 'uncategorized') as category,
        sum(ual.calculated_emissions) as emissions
      from user_activity_logs ual
      left join activities a on ual.activity_id = a.id
      where ual.date_logged >= log_date
        and ual.date_logged < log_date + interval '1 day'
      group by ual.user_id, coalesce(a.category, 'uncategorized')
    ) cat_data
    on p.id = cat_data.user_id
    group by p.id
  loop
    -- Insert or upsert into daily_totals
    insert into daily_totals (user_id, date, total, category_breakdown)
    values (
      record.user_id,
      log_date,
      record.total_emissions,
      record.breakdown
    )
    on conflict (user_id, date)
    do update set
      total = excluded.total,
      category_breakdown = excluded.category_breakdown;
  end loop;
end;
