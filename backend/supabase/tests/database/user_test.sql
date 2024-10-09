begin;
select plan(1);

SELECT has_column(
    'public',
    'User',
    'user_id',
    'User table should have user_id column'
);

select * from finish();
rollback;
