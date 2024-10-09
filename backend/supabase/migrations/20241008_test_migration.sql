-- Create a new table called "testMigrationTable"
CREATE TABLE "public"."testMigrationTable" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" character varying NOT NULL,
    "created_at" timestamp without time zone NOT NULL DEFAULT now(),
    "updated_at" timestamp without time zone
);

-- Enable row-level security for the table
ALTER TABLE "public"."testMigrationTable" ENABLE ROW LEVEL SECURITY;

-- Add a primary key constraint
ALTER TABLE "public"."testMigrationTable" ADD CONSTRAINT "testMigrationTable_pkey" PRIMARY KEY ("id");

-- Grant permissions for the new table (adjust roles and permissions as needed)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."testMigrationTable" TO "anon";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."testMigrationTable" TO "authenticated";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."testMigrationTable" TO "service_role";
