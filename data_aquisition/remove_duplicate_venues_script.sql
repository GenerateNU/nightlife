WITH ranked_venues AS (
    SELECT 
        venue_id,
        address,
        ROW_NUMBER() OVER (PARTITION BY address ORDER BY venue_id) AS row_num
    FROM 
        public.venue
)
DELETE FROM public.venue
WHERE venue_id IN (
    SELECT venue_id
    FROM ranked_venues
    WHERE row_num > 1  -- Keep only the first occurrence
);