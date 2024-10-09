begin;
select plan(1);

SELECT has_column(
    'public',
    'Venue',
    'venue_id',
    'Venue table should have venue_id column'
);

select * from finish();
rollback;
