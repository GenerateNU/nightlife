begin;
select plan(1);

SELECT has_column(
    'public',
    'UserPreference',
    'user_id',
    'UserPreference table should have user_id column'
);

select * from finish();
rollback;
