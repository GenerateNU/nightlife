begin;
select plan(1);

SELECT has_column(
    'public',
    'SearchHistory',
    'search_id',
    'SearchHistory table should have search_id column'
);

select * from finish();
rollback;
