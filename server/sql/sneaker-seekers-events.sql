use sneaker_seekers;

set foreign_key_checks = 0;
truncate table `listing`;
truncate table `vendor_table`;
truncate table `event`;
truncate table `location`;
set foreign_key_checks = 1;

insert into `location` (location_id, location_name, location_address, location_city) values
	(1, "Atlanta Convention Center", "240 Peachtree Street NW Suite 2200", "Atlanta, GA"),
    (2, "Austin Convention Center", "500 E. Cesar Chavez St.", "Austin, TX"),
    (3, "Minneapolis Convention Center", "1301 Second Avenue South", "Minneapolis, MN"),
    (4, "Denver Convention Center", "700 14th St.", "Denver, CO");

insert into `event` (event_name, event_date, num_table, event_image, location_id) values
	('Sneaker Seekers Atlanta 2022', '2022-03-05', 50, "images/events/atlanta.jpg", 1),
    ("Sneaker Seekers Austin 2022", "2022-04-16", 36, "images/events/austin.jpg", 2),
    ("Sneaker Seekers Minneapolis 2022", "2022-03-26", 72, "images/events/minneapolis.jpg", 3),
    ("Sneaker Seekers Denver 2022", "2022-04-03", 47, "images/events/denver.jpg", 4);