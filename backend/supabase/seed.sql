-- Insert test data into "User" table
INSERT INTO public."User" (first_name, username, email, age, location, profile_picture_url)
VALUES
    ('Alice', 'alice1', 'alice1@test.com', 25, ST_GeogFromText('POINT(40.748817 -73.985428)'), 'https://example.com/alice.jpg'),
    ('Bob', 'bob2', 'bob2@test.com', 30, ST_GeogFromText('POINT(34.052235 -118.243683)'), 'https://example.com/bob.jpg'),
    ('Charlie', 'charlie3', 'charlie3@test.com', 27, ST_GeogFromText('POINT(37.774929 -122.419418)'), 'https://example.com/charlie.jpg'),
    ('David', 'david4', 'david4@test.com', 22, ST_GeogFromText('POINT(51.507351 -0.127758)'), 'https://example.com/david.jpg'),
    ('Eve', 'eve5', 'eve5@test.com', 35, ST_GeogFromText('POINT(48.856614 2.352222)'), 'https://example.com/eve.jpg'),
    ('Frank', 'frank6', 'frank6@test.com', 29, ST_GeogFromText('POINT(40.730610 -73.935242)'), 'https://example.com/frank.jpg'),
    ('Grace', 'grace7', 'grace7@test.com', 28, ST_GeogFromText('POINT(34.052235 -118.243683)'), 'https://example.com/grace.jpg'),
    ('Hank', 'hank8', 'hank8@test.com', 31, ST_GeogFromText('POINT(37.774929 -122.419418)'), 'https://example.com/hank.jpg'),
    ('Ivy', 'ivy9', 'ivy9@test.com', 33, ST_GeogFromText('POINT(51.507351 -0.127758)'), 'https://example.com/ivy.jpg'),
    ('Jack', 'jack10', 'jack10@test.com', 26, ST_GeogFromText('POINT(48.856614 2.352222)'), 'https://example.com/jack.jpg');

-- Insert test data into "UserPreference" table
INSERT INTO public."UserPreference" (user_id, preference_type, preference_value)
VALUES
    ((SELECT user_id FROM public."User" WHERE username='alice1'), 'Music', 'Jazz'),
    ((SELECT user_id FROM public."User" WHERE username='bob2'), 'Music', 'Rock'),
    ((SELECT user_id FROM public."User" WHERE username='charlie3'), 'Drink', 'Cocktail'),
    ((SELECT user_id FROM public."User" WHERE username='david4'), 'Ambiance', 'Quiet'),
    ((SELECT user_id FROM public."User" WHERE username='eve5'), 'Music', 'Pop'),
    ((SELECT user_id FROM public."User" WHERE username='frank6'), 'Ambiance', 'Lively'),
    ((SELECT user_id FROM public."User" WHERE username='grace7'), 'Drink', 'Beer'),
    ((SELECT user_id FROM public."User" WHERE username='hank8'), 'Ambiance', 'Classy'),
    ((SELECT user_id FROM public."User" WHERE username='ivy9'), 'Music', 'Classical'),
    ((SELECT user_id FROM public."User" WHERE username='jack10'), 'Drink', 'Wine');

-- Insert test data into "Venue" table
INSERT INTO public."Venue" (name, address, city, state, zip_code, location, venue_type)
VALUES
    ('Blue Bar', '123 Main St', 'New York', 'NY', '10001', ST_GeogFromText('POINT(40.748817 -73.985428)'), 'BAR'),
    ('The Night Club', '456 Sunset Blvd', 'Los Angeles', 'CA', '90028', ST_GeogFromText('POINT(34.052235 -118.243683)'), 'CLUB'),
    ('Smooth Lounge', '789 Market St', 'San Francisco', 'CA', '94103', ST_GeogFromText('POINT(37.774929 -122.419418)'), 'LOUNGE'),
    ('Vibe Bar', '101 Oxford St', 'London', '', 'W1D 2HS', ST_GeogFromText('POINT(51.507351 -0.127758)'), 'BAR'),
    ('Parisian Lounge', '202 Champs-Elysees', 'Paris', '', '75008', ST_GeogFromText('POINT(48.856614 2.352222)'), 'LOUNGE'),
    ('The High Club', '303 King St', 'New York', 'NY', '10012', ST_GeogFromText('POINT(40.730610 -73.935242)'), 'CLUB'),
    ('The Jazz Spot', '404 Central Ave', 'Los Angeles', 'CA', '90012', ST_GeogFromText('POINT(34.052235 -118.243683)'), 'BAR'),
    ('Chill Lounge', '505 Broadway', 'San Francisco', 'CA', '94133', ST_GeogFromText('POINT(37.774929 -122.419418)'), 'LOUNGE'),
    ('Club Infinity', '606 Times Square', 'New York', 'NY', '10036', ST_GeogFromText('POINT(40.758896 -73.985130)'), 'CLUB'),
    ('Elegant Bar', '707 Rue de Rivoli', 'Paris', '', '75001', ST_GeogFromText('POINT(48.860611 2.337644)'), 'BAR');

-- Insert test data into "VenueAttribute" table
INSERT INTO public."VenueAttribute" (venue_id, attribute_type, attribute_value)
VALUES
    ((SELECT venue_id FROM public."Venue" WHERE name='Blue Bar'), 'Drink Special', 'Happy Hour'),
    ((SELECT venue_id FROM public."Venue" WHERE name='The Night Club'), 'Music', 'Electronic'),
    ((SELECT venue_id FROM public."Venue" WHERE name='Smooth Lounge'), 'Ambiance', 'Relaxed'),
    ((SELECT venue_id FROM public."Venue" WHERE name='Vibe Bar'), 'Music', 'Live Band'),
    ((SELECT venue_id FROM public."Venue" WHERE name='Parisian Lounge'), 'Drink Special', 'Champagne'),
    ((SELECT venue_id FROM public."Venue" WHERE name='The High Club'), 'Ambiance', 'High Energy'),
    ((SELECT venue_id FROM public."Venue" WHERE name='The Jazz Spot'), 'Music', 'Jazz'),
    ((SELECT venue_id FROM public."Venue" WHERE name='Chill Lounge'), 'Ambiance', 'Chill'),
    ((SELECT venue_id FROM public."Venue" WHERE name='Club Infinity'), 'Music', 'Pop'),
    ((SELECT venue_id FROM public."Venue" WHERE name='Elegant Bar'), 'Ambiance', 'Elegant');

-- Insert test data into "Friendship" table
INSERT INTO public."Friendship" (user_id1, user_id2, friendship_status)
VALUES
    ((SELECT user_id FROM public."User" WHERE username='alice1'), (SELECT user_id FROM public."User" WHERE username='bob2'), 'ACCEPTED'),
    ((SELECT user_id FROM public."User" WHERE username='charlie3'), (SELECT user_id FROM public."User" WHERE username='david4'), 'PENDING'),
    ((SELECT user_id FROM public."User" WHERE username='eve5'), (SELECT user_id FROM public."User" WHERE username='frank6'), 'ACCEPTED'),
    ((SELECT user_id FROM public."User" WHERE username='grace7'), (SELECT user_id FROM public."User" WHERE username='hank8'), 'BLOCKED'),
    ((SELECT user_id FROM public."User" WHERE username='ivy9'), (SELECT user_id FROM public."User" WHERE username='jack10'), 'DECLINED'),
    ((SELECT user_id FROM public."User" WHERE username='alice1'), (SELECT user_id FROM public."User" WHERE username='charlie3'), 'ACCEPTED'),
    ((SELECT user_id FROM public."User" WHERE username='bob2'), (SELECT user_id FROM public."User" WHERE username='eve5'), 'PENDING'),
    ((SELECT user_id FROM public."User" WHERE username='david4'), (SELECT user_id FROM public."User" WHERE username='grace7'), 'ACCEPTED'),
    ((SELECT user_id FROM public."User" WHERE username='frank6'), (SELECT user_id FROM public."User" WHERE username='ivy9'), 'ACCEPTED'),
    ((SELECT user_id FROM public."User" WHERE username='hank8'), (SELECT user_id FROM public."User" WHERE username='jack10'), 'PENDING');

-- Insert test data into "Notification" table
INSERT INTO public."Notification" (user_id, message)
VALUES
    ((SELECT user_id FROM public."User" WHERE username='alice1'), 'You have a new friend request from Bob.'),
    ((SELECT user_id FROM public."User" WHERE username='bob2'), 'Your review has been approved.'),
    ((SELECT user_id FROM public."User" WHERE username='charlie3'), 'You have a new message.'),
    ((SELECT user_id FROM public."User" WHERE username='david4'), 'Your profile has been updated.'),
    ((SELECT user_id FROM public."User" WHERE username='eve5'), 'You have a new friend request from Grace.'),
    ((SELECT user_id FROM public."User" WHERE username='frank6'), 'Your notification settings have been changed.'),
    ((SELECT user_id FROM public."User" WHERE username='grace7'), 'New venues near you have been added.'),
    ((SELECT user_id FROM public."User" WHERE username='hank8'), 'Your review for Club Infinity has been published.'),
    ((SELECT user_id FROM public."User" WHERE username='ivy9'), 'You have a new friend request from Jack.'),
    ((SELECT user_id FROM public."User" WHERE username='jack10'), 'Your review has been flagged.');

-- Insert test data into "Review" table
INSERT INTO public."Review" (user_id, venue_id, overall_rating, ambiance_rating, music_rating, crowd_rating, service_rating, review_text)
VALUES
    ((SELECT user_id FROM public."User" WHERE username='alice1'), (SELECT venue_id FROM public."Venue" WHERE name='Blue Bar'), 5, 9, 8, 7, 10, 'Great atmosphere, excellent service.'),
    ((SELECT user_id FROM public."User" WHERE username='bob2'), (SELECT venue_id FROM public."Venue" WHERE name='The Night Club'), 4, 7, 9, 8, 7, 'Loved the music, but it was too crowded.'),
    ((SELECT user_id FROM public."User" WHERE username='charlie3'), (SELECT venue_id FROM public."Venue" WHERE name='Smooth Lounge'), 4, 8, 7, 6, 8, 'Nice and relaxing spot.'),
    ((SELECT user_id FROM public."User" WHERE username='david4'), (SELECT venue_id FROM public."Venue" WHERE name='Vibe Bar'), 5, 9, 9, 8, 9, 'Live band was fantastic!'),
    ((SELECT user_id FROM public."User" WHERE username='eve5'), (SELECT venue_id FROM public."Venue" WHERE name='Parisian Lounge'), 4, 8, 7, 6, 8, 'Classy ambiance, good drinks.'),
    ((SELECT user_id FROM public."User" WHERE username='frank6'), (SELECT venue_id FROM public."Venue" WHERE name='The High Club'), 5, 8, 9, 9, 7, 'High energy, awesome music.'),
    ((SELECT user_id FROM public."User" WHERE username='grace7'), (SELECT venue_id FROM public."Venue" WHERE name='The Jazz Spot'), 5, 9, 10, 7, 8, 'Jazz night was amazing!'),
    ((SELECT user_id FROM public."User" WHERE username='hank8'), (SELECT venue_id FROM public."Venue" WHERE name='Chill Lounge'), 3, 7, 6, 6, 6, 'Good place but average experience.'),
    ((SELECT user_id FROM public."User" WHERE username='ivy9'), (SELECT venue_id FROM public."Venue" WHERE name='Club Infinity'), 5, 10, 9, 8, 9, 'Loved everything about it!'),
    ((SELECT user_id FROM public."User" WHERE username='jack10'), (SELECT venue_id FROM public."Venue" WHERE name='Elegant Bar'), 4, 8, 7, 7, 8, 'Sophisticated and nice.');

-- Insert test data into "SearchHistory" table
INSERT INTO public."SearchHistory" (user_id, search_term)
VALUES
    ((SELECT user_id FROM public."User" WHERE username='alice1'), now()),
    ((SELECT user_id FROM public."User" WHERE username='bob2'), now()),
    ((SELECT user_id FROM public."User" WHERE username='charlie3'), now()),
    ((SELECT user_id FROM public."User" WHERE username='david4'), now()),
    ((SELECT user_id FROM public."User" WHERE username='eve5'), now()),
    ((SELECT user_id FROM public."User" WHERE username='frank6'), now()),
    ((SELECT user_id FROM public."User" WHERE username='grace7'), now()),
    ((SELECT user_id FROM public."User" WHERE username='hank8'), now()),
    ((SELECT user_id FROM public."User" WHERE username='ivy9'), now()),
    ((SELECT user_id FROM public."User" WHERE username='jack10'), now());
