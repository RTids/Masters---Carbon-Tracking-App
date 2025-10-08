DECLARE
    p_user_id uuid := auth.uid();
BEGIN
    RETURN QUERY
    WITH tip_views AS (
        SELECT
            et.id AS chosen_tip_id,
            et.title AS tip_title,
            et.description AS tip_description,
            et.category AS tip_category,
            et.estimated_savings AS tip_estimated_savings,
            COALESCE(etv.views, 0) AS views
        FROM emission_tips et
        LEFT JOIN emission_tips_viewed etv
          ON et.id = etv.tips_id AND etv.user_id = p_user_id
    ),
    min_views AS (
        SELECT MIN(views) AS min_view FROM tip_views
    ),
    chosen_tip AS (
        SELECT
            tv.chosen_tip_id,
            tv.tip_title,
            tv.tip_description,
            tv.tip_category,
            tv.tip_estimated_savings
        FROM tip_views tv
        WHERE tv.views = (SELECT min_view FROM min_views)
        ORDER BY random()
        LIMIT 1
    ),
    upsert AS (
        INSERT INTO emission_tips_viewed(user_id, tips_id, views, last_show_date)
        SELECT
            p_user_id,
            ct.chosen_tip_id,
            1,
            now()
        FROM chosen_tip ct
        ON CONFLICT (user_id, tips_id)
        DO UPDATE SET
            views = emission_tips_viewed.views + 1,
            last_show_date = now()
    )
    SELECT
        ct.chosen_tip_id AS tip_id,
        ct.tip_title,
        ct.tip_description,
        ct.tip_category,
        ct.tip_estimated_savings
    FROM chosen_tip ct;
END;