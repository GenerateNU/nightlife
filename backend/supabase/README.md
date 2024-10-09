# Supabase Migrations and Table Alterations Guide

This guide will help you through the process of altering database tables.

Make sure the proposed database change you are making has been approved.

## IMPORTANT:

If you are altering the database, make a new branch off of main and create a PR (after changes have been made)  only with the database changes and any necesarry fixes that must be implemented if your database change broke any previous functionality.

```bash
(start on main)
git checkout -b database-change/<my-database-change>
```


## Create a new migration file

Go to backend/supabase/migrations and create a new file with the name of the change you are making.

### IMPORTANT: the file name must be unique and not match any previous migrations and MUST be in the format: 

```
<timestamp>_<name>.sql
```
There are two ways to do this (#2 is recommended):

1. Manually name the file with the above format:
```bash
20241008170200_update_user_table_with_name_column.sql
```
The timestamp format is YYYYMMDDHHMMSS (military time and just put 00 for seconds).


2. Use the command line to create the file:
```
Ensure you are in the backend dir:
```
```bash
cd backend
touch supabase/migrations/$(date +"%Y%m%d%H%M%S")_enter_name_here.sql
```
The above will create a file with the current timestamp in the right directory (make sure you are in backend first!). Change _enter_name_here to whatever describes the migration (just copy and paste what is above and then add the name).


## Write SQL Code

Now you can click into that file and write the SQL code to make the changes you want.

The table editor in Supabase is very limited and not all SQL code can be written in it. Furthermore the table editor is quite unreliable.

If you need help writing the SQL code, using GPT or other LLMS is a great option, give it the past migration files and ask it to implement the changes you want, GPT is very well trained on SQL. 

Just be careful and do not enter in any sensitive data.

## Push the migrations to remote

With the github actions set up, you can push the migrations to the remote database by simply having your PR merged into main. 

Ensure you are on your branch still

```bash
git add <migration_file>
git commit -m "Added migration file to update <describe_change_here>"
git push
```

With the github actions -- once the PR is merged, it will link up to the remote database and then push the migration.

After the PR is approved and merged into main, ensure the changes were reflected in the [table editor](https://supabase.com/dashboard/project/nydgnuqtgjljprotsccz/editor)

---
## If Github Actions Are Not Working
Here is how to push the migrations manually (do not do this if the github actions are working):

First link to the remote database:
```bash
supabase link --project-ref nydgnuqtgjljprotsccz
```

Then enter in the password:
```bash
NightlifeGenerateSpring
```

Once it says: "Finished supabase link." You are ready to push.

```bash
supabase db push
```

Ensure the changes were reflected in the [table editor](https://supabase.com/dashboard/project/nydgnuqtgjljprotsccz/editor)