begin;
select plan(1);

SELECT has_column(
    'public',
    'Friendship',
    'user_id1',
    'Friendship table should have user_id1 column'
);

select * from finish();
rollback;
