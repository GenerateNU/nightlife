create extension if not exists "postgis" with schema "public" version '3.3.2';

create type "public"."VenueType" as enum ('BAR', 'CLUB', 'LOUNGE');

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

CREATE UNIQUE INDEX "UserPreference_pkey" ON public."UserPreference" USING btree (user_id, preference_type, preference_value);

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (user_id);

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);

CREATE UNIQUE INDEX "VenueAttribute_pkey" ON public."VenueAttribute" USING btree (venue_id, attribute_type, attribute_value);

CREATE UNIQUE INDEX "VenuePhoto_pkey" ON public."VenuePhoto" USING btree (photo_id);

CREATE UNIQUE INDEX "Venue_pkey" ON public."Venue" USING btree (venue_id);

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."UserPreference" add constraint "UserPreference_pkey" PRIMARY KEY using index "UserPreference_pkey";

alter table "public"."Venue" add constraint "Venue_pkey" PRIMARY KEY using index "Venue_pkey";

alter table "public"."VenueAttribute" add constraint "VenueAttribute_pkey" PRIMARY KEY using index "VenueAttribute_pkey";

alter table "public"."VenuePhoto" add constraint "VenuePhoto_pkey" PRIMARY KEY using index "VenuePhoto_pkey";

alter table "public"."User" add constraint "User_email_key" UNIQUE using index "User_email_key";

alter table "public"."User" add constraint "User_username_key" UNIQUE using index "User_username_key";

alter table "public"."UserPreference" add constraint "UserPreference_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."UserPreference" validate constraint "UserPreference_user_id_fkey";

alter table "public"."VenueAttribute" add constraint "VenueAttribute_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES "Venue"(venue_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."VenueAttribute" validate constraint "VenueAttribute_venue_id_fkey";

alter table "public"."VenuePhoto" add constraint "VenuePhoto_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."VenuePhoto" validate constraint "VenuePhoto_user_id_fkey";

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


