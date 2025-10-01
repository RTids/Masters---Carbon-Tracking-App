BEGIN
  INSERT INTO monthly_totals (user_id, month_start, total, category_breakdown)
  SELECT
      user_id,
      month_start,
      SUM(sum_value) AS total,
      jsonb_object_agg(key, sum_value) AS category_breakdown
  FROM (
      SELECT
          user_id,
          DATE_TRUNC('month', week_start)::date AS month_start,
          (category_breakdown_each.key)::text AS key,
          SUM((category_breakdown_each.value)::float8) AS sum_value
      FROM weekly_totals,
           LATERAL jsonb_each(category_breakdown) AS category_breakdown_each
      WHERE week_start < DATE_TRUNC('month', CURRENT_DATE)  -- ✅ only full months
      GROUP BY user_id, month_start, key
  ) AS monthly_parts
  GROUP BY user_id, month_start
  ON CONFLICT (user_id, month_start) DO NOTHING;
END;