# Supabase Migrations and Table Alterations Guide

This guide will help you through the process of altering database tables using the Supabase Table Editor, managing migrations, and pushing changes.

---

## Running the Database

To work with the Supabase database, you can start the database using the following command:

Start the Supabase DB:

```bash
make db-run
```
Then you want to link to the remote database we have setup:

```bash
cd backend

supabase link --project-ref nydgnuqtgjljprotsccz
```
Enter in the password
```bash
NightlifeGenerateSpring
```
If successful, you should see "Finished supabase link."

---

# Alter the tables using Supabase Table Editor
### Open the [Table Editor](https://supabase.com/dashboard/project/nydgnuqtgjljprotsccz/editor):

Use the interface to add, modify, or delete columns in your tables.

Once you are done and all changes were successful and saved, you can go on to migrating the database.

---
# Create a new migration file

```bash
supabase db diff --use-migra <name> -f <name>
```
The name here should be what the change reflected. If you have changed a column in user_id, then name should be something like "alter_user_id_column". Keep the names the same in both placeholders.

This should create a new file in the supabase/migrations folder.

---

### What to do with the Migration:

Review the migration file in the supabase/migrations folder to ensure it reflects the changes you made in the Table Editor.

---

# Push the migration to the database

To run the migrations manually (safer option), you can do the following:

```bash
supabase db push
```

There are github actions set up to run the migrations on the database. Once your PR is merged into main, the migrations
should be automatically pushed/ran. You must add and commit the migration file to your PR.


After we have done some migrations manually, we can look into the github actions to automatically push the migrations, this is more useful once we have a testing environment and production environment. 
