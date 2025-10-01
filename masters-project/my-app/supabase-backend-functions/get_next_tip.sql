
begin
  return query
  with tip_views as (
    select
      et.id as tip_id,
      et.title,
      et.description,
      et.category,
      et.estimated_savings,
      coalesce(etv.views, 0) as views
    from emissions_tips et
    left join emissions_tips_viewed etv
      on et.id = etv.tips_id and etv.user_id = p_user_id
  ),
  min_views as (
    select min(views) as min_view from tip_views
  )
  select tip_id, title, description, category, estimated_savings
  from tip_views
  where views = (select min_view from min_views)
  order by random()
  limit 1;
end;
