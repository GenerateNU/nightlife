begin;
select plan(1);

SELECT has_column(
    'public',
    'VenuePhoto',
    'photo_id',
    'VenuePhoto table should have photo_id column'
);

select * from finish();
rollback;
