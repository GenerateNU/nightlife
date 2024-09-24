begin;
select plan(1);

SELECT has_column(
    'public',
    'Notification',
    'notification_id',
    'Notification table should have notification_id column'
);

select * from finish();
rollback;
