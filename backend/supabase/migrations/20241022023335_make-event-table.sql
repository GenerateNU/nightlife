CREATE TABLE "public"."event" (
    "event_id" SERIAL PRIMARY KEY,  
    "name" VARCHAR(255) NOT NULL,          
    "event_date" DATE NOT NULL,            
    "event_time" TIME NOT NULL,
    "image_path" CHAR(200) NOT NULL,
    "venue_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);

INSERT INTO "public"."event" (name, event_date, event_time, image_path, venue_id) 
VALUES
    ('Jazz Night', '2024-11-15', '19:00:00', 'https://images.pexels.com/photos/593467/pexels-photo-593467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2edc969e-bf93-4b3b-9273-5b0aa968b79c'),
    ('Rock Concert', '2024-12-01', '20:30:00', 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2edc969e-bf93-4b3b-9273-5b0aa968b79c'),
    ('Comedy Show', '2024-10-25', '18:00:00', 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2edc969e-bf93-4b3b-9273-5b0aa968b79c'),
    ('90s Night', '2024-10-31', '18:00:00', 'https://images.pexels.com/photos/2191013/pexels-photo-2191013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2edc969e-bf93-4b3b-9273-5b0aa968b79c'),
    ('Cher Tribute', '2025-01-19', '19:00:00', 'https://images.pexels.com/photos/4200745/pexels-photo-4200745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2edc969e-bf93-4b3b-9273-5b0aa968b79c'),
    ('EDM Night', '2025-01-21', '21:00:00', 'https://images.pexels.com/photos/878998/pexels-photo-878998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2edc969e-bf93-4b3b-9273-5b0aa968b79c');
