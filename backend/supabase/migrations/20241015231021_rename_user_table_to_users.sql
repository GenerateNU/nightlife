-- Rename "user" table to "users"
ALTER TABLE "public"."user" RENAME TO "users";

-- Friendship table
ALTER TABLE "public"."friendship" DROP CONSTRAINT "friendship_user_id1_fkey";
ALTER TABLE "public"."friendship" ADD CONSTRAINT "friendship_user_id1_fkey" 
FOREIGN KEY (user_id1) REFERENCES "public"."users" (user_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."friendship" DROP CONSTRAINT "friendship_user_id2_fkey";
ALTER TABLE "public"."friendship" ADD CONSTRAINT "friendship_user_id2_fkey" 
FOREIGN KEY (user_id2) REFERENCES "public"."users" (user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Notification table
ALTER TABLE "public"."notification" DROP CONSTRAINT "notification_user_id_fkey";
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_user_id_fkey" 
FOREIGN KEY (user_id) REFERENCES "public"."users" (user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Review table
ALTER TABLE "public"."review" DROP CONSTRAINT "review_user_id_fkey";
ALTER TABLE "public"."review" ADD CONSTRAINT "review_user_id_fkey" 
FOREIGN KEY (user_id) REFERENCES "public"."users" (user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Search History table
ALTER TABLE "public"."search_history" DROP CONSTRAINT "search_history_user_id_fkey";
ALTER TABLE "public"."search_history" ADD CONSTRAINT "search_history_user_id_fkey" 
FOREIGN KEY (user_id) REFERENCES "public"."users" (user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- User Preference table
ALTER TABLE "public"."user_preference" DROP CONSTRAINT "user_preference_user_id_fkey";
ALTER TABLE "public"."user_preference" ADD CONSTRAINT "user_preference_user_id_fkey" 
FOREIGN KEY (user_id) REFERENCES "public"."users" (user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Venue Photo table
ALTER TABLE "public"."venue_photo" DROP CONSTRAINT "venue_photo_user_id_fkey";
ALTER TABLE "public"."venue_photo" ADD CONSTRAINT "venue_photo_user_id_fkey" 
FOREIGN KEY (user_id) REFERENCES "public"."users" (user_id) ON UPDATE CASCADE ON DELETE SET NULL;

-- Update any permissions related to the table "users"
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.users TO anon, authenticated, service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.user_preference TO anon, authenticated, service_role;

-- Optional: Validate all the foreign key constraints
ALTER TABLE "public"."friendship" VALIDATE CONSTRAINT "friendship_user_id1_fkey";
ALTER TABLE "public"."friendship" VALIDATE CONSTRAINT "friendship_user_id2_fkey";
ALTER TABLE "public"."notification" VALIDATE CONSTRAINT "notification_user_id_fkey";
ALTER TABLE "public"."review" VALIDATE CONSTRAINT "review_user_id_fkey";
ALTER TABLE "public"."search_history" VALIDATE CONSTRAINT "search_history_user_id_fkey";
ALTER TABLE "public"."user_preference" VALIDATE CONSTRAINT "user_preference_user_id_fkey";
ALTER TABLE "public"."venue_photo" VALIDATE CONSTRAINT "venue_photo_user_id_fkey";
