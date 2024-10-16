create extension if not exists "postgis" with schema "public" version '3.3.2';

create type "public"."FriendshipStatus" as enum ('PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED');

create type "public"."VenueType" as enum ('BAR', 'CLUB', 'LOUNGE');

create table "public"."Friendship" (
    "user_id1" uuid not null default gen_random_uuid(),
    "user_id2" uuid not null default gen_random_uuid(),
    "friendship_status" "FriendshipStatus" not null,
    "created_at" timestamp without time zone not null default now()
);


alter table "public"."Friendship" enable row level security;

create table "public"."Notification" (
    "notification_id" bigint generated by default as identity not null,
    "user_id" uuid not null default gen_random_uuid(),
    "message" text,
    "is_read" boolean not null default false,
    "created_at" timestamp without time zone not null default now()
);


alter table "public"."Notification" enable row level security;

create table "public"."Review" (
    "review_id" bigint generated by default as identity not null,
    "user_id" uuid not null default gen_random_uuid(),
    "venue_id" uuid default gen_random_uuid(),
    "overall_rating" bigint,
    "ambiance_rating" bigint,
    "music_rating" bigint,
    "crowd_rating" bigint,
    "service_rating" bigint,
    "review_text" text,
    "created_at" timestamp without time zone not null default now(),
    "udpated_at" timestamp without time zone
);


alter table "public"."Review" enable row level security;

create table "public"."SearchHistory" (
    "search_id" bigint generated by default as identity not null,
    "user_id" uuid default gen_random_uuid(),
    "search_term" timestamp without time zone not null,
    "search_time" timestamp without time zone not null default now()
);


alter table "public"."SearchHistory" enable row level security;

create table "public"."User" (
    "user_id" uuid not null default gen_random_uuid(),
    "first_name" character varying not null,
    "username" character varying not null,
    "email" character varying not null,
    "age" bigint not null,
    "location" geography not null,
    "profile_picture_url" character varying,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone
);


alter table "public"."User" enable row level security;

create table "public"."UserPreference" (
    "user_id" uuid not null default gen_random_uuid(),
    "preference_type" character varying not null,
    "preference_value" character varying not null
);


alter table "public"."UserPreference" enable row level security;

create table "public"."Venue" (
    "venue_id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "address" character varying not null,
    "city" character varying,
    "state" character varying,
    "zip_code" character varying,
    "location" geography not null,
    "venue_type" "VenueType" not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone
);


alter table "public"."Venue" enable row level security;

create table "public"."VenueAttribute" (
    "venue_id" uuid not null default gen_random_uuid(),
    "attribute_type" character varying not null,
    "attribute_value" character varying not null
);


alter table "public"."VenueAttribute" enable row level security;

create table "public"."VenuePhoto" (
    "photo_id" uuid not null default gen_random_uuid(),
    "review_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default gen_random_uuid(),
    "photo_url" character varying not null,
    "caption" text,
    "uploaded_at" timestamp without time zone not null default now()
);


alter table "public"."VenuePhoto" enable row level security;

create table "public"."temp_rating" (
    "rating_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "review" integer
);


create table "public"."temp_user" (
    "user_id" uuid not null default gen_random_uuid(),
    "name" character varying not null
);


create table "public"."testMigrationTable" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone
);


alter table "public"."testMigrationTable" enable row level security;

CREATE UNIQUE INDEX "Friendship_pkey" ON public."Friendship" USING btree (user_id1, user_id2);

CREATE UNIQUE INDEX "Notification_notification_id_key" ON public."Notification" USING btree (notification_id);

CREATE UNIQUE INDEX "Notification_pkey" ON public."Notification" USING btree (notification_id);

CREATE UNIQUE INDEX "Review_pkey" ON public."Review" USING btree (review_id);

CREATE UNIQUE INDEX "Review_review_id_key" ON public."Review" USING btree (review_id);

CREATE UNIQUE INDEX "SearchHistory_pkey" ON public."SearchHistory" USING btree (search_id);

CREATE UNIQUE INDEX "SearchHistory_search_id_key" ON public."SearchHistory" USING btree (search_id);

CREATE UNIQUE INDEX "UserPreference_pkey" ON public."UserPreference" USING btree (user_id, preference_type, preference_value);

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (user_id);

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);

CREATE UNIQUE INDEX "VenueAttribute_pkey" ON public."VenueAttribute" USING btree (venue_id, attribute_type, attribute_value);

CREATE UNIQUE INDEX "VenuePhoto_pkey" ON public."VenuePhoto" USING btree (photo_id);

CREATE UNIQUE INDEX "Venue_pkey" ON public."Venue" USING btree (venue_id);

CREATE UNIQUE INDEX temp_rating_pkey ON public.temp_rating USING btree (rating_id);

CREATE UNIQUE INDEX temp_user_pkey ON public.temp_user USING btree (user_id);

CREATE UNIQUE INDEX "testMigrationTable_pkey" ON public."testMigrationTable" USING btree (id);

alter table "public"."Friendship" add constraint "Friendship_pkey" PRIMARY KEY using index "Friendship_pkey";

alter table "public"."Notification" add constraint "Notification_pkey" PRIMARY KEY using index "Notification_pkey";

alter table "public"."Review" add constraint "Review_pkey" PRIMARY KEY using index "Review_pkey";

alter table "public"."SearchHistory" add constraint "SearchHistory_pkey" PRIMARY KEY using index "SearchHistory_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."UserPreference" add constraint "UserPreference_pkey" PRIMARY KEY using index "UserPreference_pkey";

alter table "public"."Venue" add constraint "Venue_pkey" PRIMARY KEY using index "Venue_pkey";

alter table "public"."VenueAttribute" add constraint "VenueAttribute_pkey" PRIMARY KEY using index "VenueAttribute_pkey";

alter table "public"."VenuePhoto" add constraint "VenuePhoto_pkey" PRIMARY KEY using index "VenuePhoto_pkey";

alter table "public"."temp_rating" add constraint "temp_rating_pkey" PRIMARY KEY using index "temp_rating_pkey";

alter table "public"."temp_user" add constraint "temp_user_pkey" PRIMARY KEY using index "temp_user_pkey";

alter table "public"."testMigrationTable" add constraint "testMigrationTable_pkey" PRIMARY KEY using index "testMigrationTable_pkey";

alter table "public"."Friendship" add constraint "Friendship_user_id1_fkey" FOREIGN KEY (user_id1) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Friendship" validate constraint "Friendship_user_id1_fkey";

alter table "public"."Friendship" add constraint "Friendship_user_id2_fkey" FOREIGN KEY (user_id2) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Friendship" validate constraint "Friendship_user_id2_fkey";

alter table "public"."Notification" add constraint "Notification_notification_id_key" UNIQUE using index "Notification_notification_id_key";

alter table "public"."Notification" add constraint "Notification_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Notification" validate constraint "Notification_user_id_fkey";

alter table "public"."Review" add constraint "Review_ambiance_rating_check" CHECK (((ambiance_rating >= 1) AND (ambiance_rating <= 10))) not valid;

alter table "public"."Review" validate constraint "Review_ambiance_rating_check";

alter table "public"."Review" add constraint "Review_crowd_rating_check" CHECK (((crowd_rating >= 1) AND (crowd_rating <= 10))) not valid;

alter table "public"."Review" validate constraint "Review_crowd_rating_check";

alter table "public"."Review" add constraint "Review_music_rating_check" CHECK (((music_rating >= 1) AND (music_rating <= 10))) not valid;

alter table "public"."Review" validate constraint "Review_music_rating_check";

alter table "public"."Review" add constraint "Review_overall_rating_check" CHECK (((overall_rating >= 1) AND (overall_rating <= 5))) not valid;

alter table "public"."Review" validate constraint "Review_overall_rating_check";

alter table "public"."Review" add constraint "Review_review_id_key" UNIQUE using index "Review_review_id_key";

alter table "public"."Review" add constraint "Review_service_rating_check" CHECK (((service_rating >= 1) AND (service_rating <= 10))) not valid;

alter table "public"."Review" validate constraint "Review_service_rating_check";

alter table "public"."Review" add constraint "Review_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Review" validate constraint "Review_user_id_fkey";

alter table "public"."Review" add constraint "Review_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES "Venue"(venue_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Review" validate constraint "Review_venue_id_fkey";

alter table "public"."SearchHistory" add constraint "SearchHistory_search_id_key" UNIQUE using index "SearchHistory_search_id_key";

alter table "public"."SearchHistory" add constraint "SearchHistory_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SearchHistory" validate constraint "SearchHistory_user_id_fkey";

alter table "public"."User" add constraint "User_email_key" UNIQUE using index "User_email_key";

alter table "public"."User" add constraint "User_username_key" UNIQUE using index "User_username_key";

alter table "public"."UserPreference" add constraint "UserPreference_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."UserPreference" validate constraint "UserPreference_user_id_fkey";

alter table "public"."VenueAttribute" add constraint "VenueAttribute_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES "Venue"(venue_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."VenueAttribute" validate constraint "VenueAttribute_venue_id_fkey";

alter table "public"."VenuePhoto" add constraint "VenuePhoto_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."VenuePhoto" validate constraint "VenuePhoto_user_id_fkey";

alter table "public"."temp_rating" add constraint "fk_user" FOREIGN KEY (user_id) REFERENCES temp_user(user_id) not valid;

alter table "public"."temp_rating" validate constraint "fk_user";

alter table "public"."temp_rating" add constraint "temp_rating_review_check" CHECK (((review >= 0) AND (review <= 5))) not valid;

alter table "public"."temp_rating" validate constraint "temp_rating_review_check";

create type "public"."geometry_dump" as ("path" integer[], "geom" geometry);

create type "public"."valid_detail" as ("valid" boolean, "reason" character varying, "location" geometry);

grant delete on table "public"."Friendship" to "anon";

grant insert on table "public"."Friendship" to "anon";

grant references on table "public"."Friendship" to "anon";

grant select on table "public"."Friendship" to "anon";

grant trigger on table "public"."Friendship" to "anon";

grant truncate on table "public"."Friendship" to "anon";

grant update on table "public"."Friendship" to "anon";

grant delete on table "public"."Friendship" to "authenticated";

grant insert on table "public"."Friendship" to "authenticated";

grant references on table "public"."Friendship" to "authenticated";

grant select on table "public"."Friendship" to "authenticated";

grant trigger on table "public"."Friendship" to "authenticated";

grant truncate on table "public"."Friendship" to "authenticated";

grant update on table "public"."Friendship" to "authenticated";

grant delete on table "public"."Friendship" to "service_role";

grant insert on table "public"."Friendship" to "service_role";

grant references on table "public"."Friendship" to "service_role";

grant select on table "public"."Friendship" to "service_role";

grant trigger on table "public"."Friendship" to "service_role";

grant truncate on table "public"."Friendship" to "service_role";

grant update on table "public"."Friendship" to "service_role";

grant delete on table "public"."Notification" to "anon";

grant insert on table "public"."Notification" to "anon";

grant references on table "public"."Notification" to "anon";

grant select on table "public"."Notification" to "anon";

grant trigger on table "public"."Notification" to "anon";

grant truncate on table "public"."Notification" to "anon";

grant update on table "public"."Notification" to "anon";

grant delete on table "public"."Notification" to "authenticated";

grant insert on table "public"."Notification" to "authenticated";

grant references on table "public"."Notification" to "authenticated";

grant select on table "public"."Notification" to "authenticated";

grant trigger on table "public"."Notification" to "authenticated";

grant truncate on table "public"."Notification" to "authenticated";

grant update on table "public"."Notification" to "authenticated";

grant delete on table "public"."Notification" to "service_role";

grant insert on table "public"."Notification" to "service_role";

grant references on table "public"."Notification" to "service_role";

grant select on table "public"."Notification" to "service_role";

grant trigger on table "public"."Notification" to "service_role";

grant truncate on table "public"."Notification" to "service_role";

grant update on table "public"."Notification" to "service_role";

grant delete on table "public"."Review" to "anon";

grant insert on table "public"."Review" to "anon";

grant references on table "public"."Review" to "anon";

grant select on table "public"."Review" to "anon";

grant trigger on table "public"."Review" to "anon";

grant truncate on table "public"."Review" to "anon";

grant update on table "public"."Review" to "anon";

grant delete on table "public"."Review" to "authenticated";

grant insert on table "public"."Review" to "authenticated";

grant references on table "public"."Review" to "authenticated";

grant select on table "public"."Review" to "authenticated";

grant trigger on table "public"."Review" to "authenticated";

grant truncate on table "public"."Review" to "authenticated";

grant update on table "public"."Review" to "authenticated";

grant delete on table "public"."Review" to "service_role";

grant insert on table "public"."Review" to "service_role";

grant references on table "public"."Review" to "service_role";

grant select on table "public"."Review" to "service_role";

grant trigger on table "public"."Review" to "service_role";

grant truncate on table "public"."Review" to "service_role";

grant update on table "public"."Review" to "service_role";

grant delete on table "public"."SearchHistory" to "anon";

grant insert on table "public"."SearchHistory" to "anon";

grant references on table "public"."SearchHistory" to "anon";

grant select on table "public"."SearchHistory" to "anon";

grant trigger on table "public"."SearchHistory" to "anon";

grant truncate on table "public"."SearchHistory" to "anon";

grant update on table "public"."SearchHistory" to "anon";

grant delete on table "public"."SearchHistory" to "authenticated";

grant insert on table "public"."SearchHistory" to "authenticated";

grant references on table "public"."SearchHistory" to "authenticated";

grant select on table "public"."SearchHistory" to "authenticated";

grant trigger on table "public"."SearchHistory" to "authenticated";

grant truncate on table "public"."SearchHistory" to "authenticated";

grant update on table "public"."SearchHistory" to "authenticated";

grant delete on table "public"."SearchHistory" to "service_role";

grant insert on table "public"."SearchHistory" to "service_role";

grant references on table "public"."SearchHistory" to "service_role";

grant select on table "public"."SearchHistory" to "service_role";

grant trigger on table "public"."SearchHistory" to "service_role";

grant truncate on table "public"."SearchHistory" to "service_role";

grant update on table "public"."SearchHistory" to "service_role";

grant delete on table "public"."User" to "anon";

grant insert on table "public"."User" to "anon";

grant references on table "public"."User" to "anon";

grant select on table "public"."User" to "anon";

grant trigger on table "public"."User" to "anon";

grant truncate on table "public"."User" to "anon";

grant update on table "public"."User" to "anon";

grant delete on table "public"."User" to "authenticated";

grant insert on table "public"."User" to "authenticated";

grant references on table "public"."User" to "authenticated";

grant select on table "public"."User" to "authenticated";

grant trigger on table "public"."User" to "authenticated";

grant truncate on table "public"."User" to "authenticated";

grant update on table "public"."User" to "authenticated";

grant delete on table "public"."User" to "service_role";

grant insert on table "public"."User" to "service_role";

grant references on table "public"."User" to "service_role";

grant select on table "public"."User" to "service_role";

grant trigger on table "public"."User" to "service_role";

grant truncate on table "public"."User" to "service_role";

grant update on table "public"."User" to "service_role";

grant delete on table "public"."UserPreference" to "anon";

grant insert on table "public"."UserPreference" to "anon";

grant references on table "public"."UserPreference" to "anon";

grant select on table "public"."UserPreference" to "anon";

grant trigger on table "public"."UserPreference" to "anon";

grant truncate on table "public"."UserPreference" to "anon";

grant update on table "public"."UserPreference" to "anon";

grant delete on table "public"."UserPreference" to "authenticated";

grant insert on table "public"."UserPreference" to "authenticated";

grant references on table "public"."UserPreference" to "authenticated";

grant select on table "public"."UserPreference" to "authenticated";

grant trigger on table "public"."UserPreference" to "authenticated";

grant truncate on table "public"."UserPreference" to "authenticated";

grant update on table "public"."UserPreference" to "authenticated";

grant delete on table "public"."UserPreference" to "service_role";

grant insert on table "public"."UserPreference" to "service_role";

grant references on table "public"."UserPreference" to "service_role";

grant select on table "public"."UserPreference" to "service_role";

grant trigger on table "public"."UserPreference" to "service_role";

grant truncate on table "public"."UserPreference" to "service_role";

grant update on table "public"."UserPreference" to "service_role";

grant delete on table "public"."Venue" to "anon";

grant insert on table "public"."Venue" to "anon";

grant references on table "public"."Venue" to "anon";

grant select on table "public"."Venue" to "anon";

grant trigger on table "public"."Venue" to "anon";

grant truncate on table "public"."Venue" to "anon";

grant update on table "public"."Venue" to "anon";

grant delete on table "public"."Venue" to "authenticated";

grant insert on table "public"."Venue" to "authenticated";

grant references on table "public"."Venue" to "authenticated";

grant select on table "public"."Venue" to "authenticated";

grant trigger on table "public"."Venue" to "authenticated";

grant truncate on table "public"."Venue" to "authenticated";

grant update on table "public"."Venue" to "authenticated";

grant delete on table "public"."Venue" to "service_role";

grant insert on table "public"."Venue" to "service_role";

grant references on table "public"."Venue" to "service_role";

grant select on table "public"."Venue" to "service_role";

grant trigger on table "public"."Venue" to "service_role";

grant truncate on table "public"."Venue" to "service_role";

grant update on table "public"."Venue" to "service_role";

grant delete on table "public"."VenueAttribute" to "anon";

grant insert on table "public"."VenueAttribute" to "anon";

grant references on table "public"."VenueAttribute" to "anon";

grant select on table "public"."VenueAttribute" to "anon";

grant trigger on table "public"."VenueAttribute" to "anon";

grant truncate on table "public"."VenueAttribute" to "anon";

grant update on table "public"."VenueAttribute" to "anon";

grant delete on table "public"."VenueAttribute" to "authenticated";

grant insert on table "public"."VenueAttribute" to "authenticated";

grant references on table "public"."VenueAttribute" to "authenticated";

grant select on table "public"."VenueAttribute" to "authenticated";

grant trigger on table "public"."VenueAttribute" to "authenticated";

grant truncate on table "public"."VenueAttribute" to "authenticated";

grant update on table "public"."VenueAttribute" to "authenticated";

grant delete on table "public"."VenueAttribute" to "service_role";

grant insert on table "public"."VenueAttribute" to "service_role";

grant references on table "public"."VenueAttribute" to "service_role";

grant select on table "public"."VenueAttribute" to "service_role";

grant trigger on table "public"."VenueAttribute" to "service_role";

grant truncate on table "public"."VenueAttribute" to "service_role";

grant update on table "public"."VenueAttribute" to "service_role";

grant delete on table "public"."VenuePhoto" to "anon";

grant insert on table "public"."VenuePhoto" to "anon";

grant references on table "public"."VenuePhoto" to "anon";

grant select on table "public"."VenuePhoto" to "anon";

grant trigger on table "public"."VenuePhoto" to "anon";

grant truncate on table "public"."VenuePhoto" to "anon";

grant update on table "public"."VenuePhoto" to "anon";

grant delete on table "public"."VenuePhoto" to "authenticated";

grant insert on table "public"."VenuePhoto" to "authenticated";

grant references on table "public"."VenuePhoto" to "authenticated";

grant select on table "public"."VenuePhoto" to "authenticated";

grant trigger on table "public"."VenuePhoto" to "authenticated";

grant truncate on table "public"."VenuePhoto" to "authenticated";

grant update on table "public"."VenuePhoto" to "authenticated";

grant delete on table "public"."VenuePhoto" to "service_role";

grant insert on table "public"."VenuePhoto" to "service_role";

grant references on table "public"."VenuePhoto" to "service_role";

grant select on table "public"."VenuePhoto" to "service_role";

grant trigger on table "public"."VenuePhoto" to "service_role";

grant truncate on table "public"."VenuePhoto" to "service_role";

grant update on table "public"."VenuePhoto" to "service_role";

grant delete on table "public"."spatial_ref_sys" to "anon";

grant insert on table "public"."spatial_ref_sys" to "anon";

grant references on table "public"."spatial_ref_sys" to "anon";

grant select on table "public"."spatial_ref_sys" to "anon";

grant trigger on table "public"."spatial_ref_sys" to "anon";

grant truncate on table "public"."spatial_ref_sys" to "anon";

grant update on table "public"."spatial_ref_sys" to "anon";

grant delete on table "public"."spatial_ref_sys" to "authenticated";

grant insert on table "public"."spatial_ref_sys" to "authenticated";

grant references on table "public"."spatial_ref_sys" to "authenticated";

grant select on table "public"."spatial_ref_sys" to "authenticated";

grant trigger on table "public"."spatial_ref_sys" to "authenticated";

grant truncate on table "public"."spatial_ref_sys" to "authenticated";

grant update on table "public"."spatial_ref_sys" to "authenticated";

grant delete on table "public"."spatial_ref_sys" to "postgres";

grant insert on table "public"."spatial_ref_sys" to "postgres";

grant references on table "public"."spatial_ref_sys" to "postgres";

grant select on table "public"."spatial_ref_sys" to "postgres";

grant trigger on table "public"."spatial_ref_sys" to "postgres";

grant truncate on table "public"."spatial_ref_sys" to "postgres";

grant update on table "public"."spatial_ref_sys" to "postgres";

grant delete on table "public"."spatial_ref_sys" to "service_role";

grant insert on table "public"."spatial_ref_sys" to "service_role";

grant references on table "public"."spatial_ref_sys" to "service_role";

grant select on table "public"."spatial_ref_sys" to "service_role";

grant trigger on table "public"."spatial_ref_sys" to "service_role";

grant truncate on table "public"."spatial_ref_sys" to "service_role";

grant update on table "public"."spatial_ref_sys" to "service_role";

grant delete on table "public"."temp_rating" to "anon";

grant insert on table "public"."temp_rating" to "anon";

grant references on table "public"."temp_rating" to "anon";

grant select on table "public"."temp_rating" to "anon";

grant trigger on table "public"."temp_rating" to "anon";

grant truncate on table "public"."temp_rating" to "anon";

grant update on table "public"."temp_rating" to "anon";

grant delete on table "public"."temp_rating" to "authenticated";

grant insert on table "public"."temp_rating" to "authenticated";

grant references on table "public"."temp_rating" to "authenticated";

grant select on table "public"."temp_rating" to "authenticated";

grant trigger on table "public"."temp_rating" to "authenticated";

grant truncate on table "public"."temp_rating" to "authenticated";

grant update on table "public"."temp_rating" to "authenticated";

grant delete on table "public"."temp_rating" to "service_role";

grant insert on table "public"."temp_rating" to "service_role";

grant references on table "public"."temp_rating" to "service_role";

grant select on table "public"."temp_rating" to "service_role";

grant trigger on table "public"."temp_rating" to "service_role";

grant truncate on table "public"."temp_rating" to "service_role";

grant update on table "public"."temp_rating" to "service_role";

grant delete on table "public"."temp_user" to "anon";

grant insert on table "public"."temp_user" to "anon";

grant references on table "public"."temp_user" to "anon";

grant select on table "public"."temp_user" to "anon";

grant trigger on table "public"."temp_user" to "anon";

grant truncate on table "public"."temp_user" to "anon";

grant update on table "public"."temp_user" to "anon";

grant delete on table "public"."temp_user" to "authenticated";

grant insert on table "public"."temp_user" to "authenticated";

grant references on table "public"."temp_user" to "authenticated";

grant select on table "public"."temp_user" to "authenticated";

grant trigger on table "public"."temp_user" to "authenticated";

grant truncate on table "public"."temp_user" to "authenticated";

grant update on table "public"."temp_user" to "authenticated";

grant delete on table "public"."temp_user" to "service_role";

grant insert on table "public"."temp_user" to "service_role";

grant references on table "public"."temp_user" to "service_role";

grant select on table "public"."temp_user" to "service_role";

grant trigger on table "public"."temp_user" to "service_role";

grant truncate on table "public"."temp_user" to "service_role";

grant update on table "public"."temp_user" to "service_role";

grant delete on table "public"."testMigrationTable" to "anon";

grant insert on table "public"."testMigrationTable" to "anon";

grant references on table "public"."testMigrationTable" to "anon";

grant select on table "public"."testMigrationTable" to "anon";

grant trigger on table "public"."testMigrationTable" to "anon";

grant truncate on table "public"."testMigrationTable" to "anon";

grant update on table "public"."testMigrationTable" to "anon";

grant delete on table "public"."testMigrationTable" to "authenticated";

grant insert on table "public"."testMigrationTable" to "authenticated";

grant references on table "public"."testMigrationTable" to "authenticated";

grant select on table "public"."testMigrationTable" to "authenticated";

grant trigger on table "public"."testMigrationTable" to "authenticated";

grant truncate on table "public"."testMigrationTable" to "authenticated";

grant update on table "public"."testMigrationTable" to "authenticated";

grant delete on table "public"."testMigrationTable" to "service_role";

grant insert on table "public"."testMigrationTable" to "service_role";

grant references on table "public"."testMigrationTable" to "service_role";

grant select on table "public"."testMigrationTable" to "service_role";

grant trigger on table "public"."testMigrationTable" to "service_role";

grant truncate on table "public"."testMigrationTable" to "service_role";

grant update on table "public"."testMigrationTable" to "service_role";


