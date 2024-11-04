-- Drop tables with capitalized names
DROP TABLE IF EXISTS public."Friendship" CASCADE;
DROP TABLE IF EXISTS public."Notification" CASCADE;
DROP TABLE IF EXISTS public."Review" CASCADE;
DROP TABLE IF EXISTS public."SearchHistory" CASCADE;
DROP TABLE IF EXISTS public."UserPreference" CASCADE;
DROP TABLE IF EXISTS public."VenueAttribute" CASCADE;
DROP TABLE IF EXISTS public."VenuePhoto" CASCADE;
DROP TABLE IF EXISTS public."Venue" CASCADE;
DROP TABLE IF EXISTS public."User" CASCADE;

DROP TYPE IF EXISTS public."FriendshipStatus";
DROP TYPE IF EXISTS public."VenueType";