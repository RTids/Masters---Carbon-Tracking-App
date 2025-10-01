
DECLARE
  inserted_rows INTEGER;
BEGIN
  WITH aggregated_data AS (
    SELECT
      user_id,
      DATE_TRUNC('week', now() - INTERVAL '1 day')::date AS week_start,
      SUM(sum_value) AS total,
      jsonb_object_agg(key, sum_value) AS category_breakdown
    FROM (
      SELECT
        user_id,
        (category_breakdown_each.key)::text AS key,
        SUM((category_breakdown_each.value)::float8) AS sum_value
      FROM daily_totals,
        LATERAL jsonb_each(category_breakdown) AS category_breakdown_each
      WHERE date >= DATE_TRUNC('week', now() - INTERVAL '1 day')
        AND date < DATE_TRUNC('week', now() + INTERVAL '6 days')
      GROUP BY user_id, key
    ) AS aggregated
    GROUP BY user_id
  )
  INSERT INTO weekly_totals (user_id, week_start, total, category_breakdown)
  SELECT user_id, week_start, total, category_breakdown
  FROM aggregated_data
  ON CONFLICT (user_id, week_start) DO NOTHING
  RETURNING 1 INTO inserted_rows;

  RAISE NOTICE 'Inserted % weekly summary rows', inserted_rows;

END;
