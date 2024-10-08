begin;
select plan(1);

SELECT has_column(
    'public',
    'Review',
    'review_id',
    'Review table should have review_id column'
);

select * from finish();
rollback;
