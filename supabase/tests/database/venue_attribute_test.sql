begin;
select plan(1);

SELECT has_column(
    'public',
    'VenueAttribute',
    'venue_id',
    'VenueAttribute table should have venue_id column'
);

select * from finish();
rollback;
