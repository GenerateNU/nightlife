CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,          
    event_date DATE NOT NULL,            
    event_time TIME NOT NULL,
    image_path CHAR(200) NOT NULL
    venue_id uuid(36),    
    FOREIGN KEY (venue_id) REFERENCES venue(venue_id)         
);

INSERT INTO event(name, event_date, event_time, venue_id) 
VALUE
('Jazz Night', 
'2024-11-15', 
'19:00:00',
'https://images.pexels.com/photos/593467/pexels-photo-593467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
'2edc969e-bf93-4b3b-9273-5b0aa968b79c'),

('Rock Concert',
 '2024-12-01',
'20:30:00',
'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
'2edc969e-bf93-4b3b-9273-5b0aa968b79c'),

('Comedy Show',
'2024-10-25',
'18:00:00',
'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
'2edc969e-bf93-4b3b-9273-5b0aa968b79c'),

('90s Night',
'2024-10-31',
'18:00:00',
'https://images.pexels.com/photos/2191013/pexels-photo-2191013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
'2edc969e-bf93-4b3b-9273-5b0aa968b79c'),

('Cher Tribute',
'2025-1-19',
'19:00:00',
'https://images.pexels.com/photos/4200745/pexels-photo-4200745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
'2edc969e-bf93-4b3b-9273-5b0aa968b79c'),

('EDM Night',
'2025-1-21',
'21:00:00',
'https://images.pexels.com/photos/878998/pexels-photo-878998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
'2edc969e-bf93-4b3b-9273-5b0aa968b79c')