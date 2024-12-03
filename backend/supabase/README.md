# Supabase Migrations and Table Alterations Guide

This guide will help you through the process of altering database tables.

Make sure the proposed database change you are making has been approved.

## IMPORTANT:

If you are altering the database, make a new branch off of main and create a PR (after changes have been made)  only with the database changes and any necesarry fixes that must be implemented if your database change broke any previous functionality.

You need to have the most up-to-date migrations folder there is (the [remote database](https://supabase.com/dashboard/project/nydgnuqtgjljprotsccz/database/migrations) has the most recent) in order for this all to work properly. 

```bash
(start on main)
git checkout -b database-change/<my-database-change>
```


## Create a new migration file

First, you need to generate a migration file that will capture the changes you're making to your database schema.

Run the following command to generate a new migration file:

```bash
supabase migration new <migration_name>
```
This will create a new migration file inside the supabase/migrations folder with the specified <migration_name>.
## Write SQL Code

Now you can click into that file and write the SQL code to make the changes you want.

The table editor in Supabase is very limited and not all SQL code can be written in it. Furthermore the table editor is quite unreliable.

If you need help writing the SQL code, using GPT or other LLMS is a great option, give it the past migration files and ask it to implement the changes you want, GPT is very well trained on SQL. 

Just be careful and do not enter in any sensitive data.

## Apply the migration locally

```bash
supabase db reset
```
This will reset your local database to the current state of your migrations and apply the latest one. You can test your local database after the migration is applied to ensure everything works as expected.

So now you would go in and check to make sure the database works as expected, write a quick endpoint to test your database change. 

## Push the migrations to remote

With the github actions set up, you can push the migrations to the remote database by simply having your PR merged into main. 

Ensure you are on your branch still

```bash
git add <migration_file>
git commit -m "Added migration file to update <describe_change_here>"
```

With the github actions -- once the PR is merged, it will link up to the remote database and then push the migration.

After the PR is approved and merged into main, ensure the changes were reflected in the [table editor](https://supabase.com/dashboard/project/nydgnuqtgjljprotsccz/editor)

---
## If Github Actions Are Not Working (USE THIS FOR NOW)
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

It might make you do 

```bash
supbase db push --include-all
```
In my experience, this works fine, not too sure what the side effects are, I thikn just do not run it unless you have
all the migration files in your local

Ensure the changes were reflected in the [table editor](https://supabase.com/dashboard/project/nydgnuqtgjljprotsccz/editor)

[Docs](https://supabase.com/docs/guides/local-development/overview#database-migrations)
