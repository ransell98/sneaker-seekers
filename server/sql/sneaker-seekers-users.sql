use sneaker_seekers;

set foreign_key_checks = 0;
truncate table `app_user`;
truncate table `app_user_role`;
set foreign_key_checks = 1;

insert into app_user (username, password_hash, profile_picture, first_name, last_name, email) values
    ('user', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K',
		null, null, null, null),
    ('vendor', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K',
		null, null, null, null),
    ('admin', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K',
		null, null, null, null),
    ('alice_in_chains', '$2a$10$SoYpbYTaI6BqEbI3d2NURedbOL44/ZR1zdos9NDtgS6c/1Rf7Fiw2', 
		'https://upload.wikimedia.org/wikipedia/en/4/43/Alice_In_Chains-Facelift.jpg',
        'Alice', 'Atlanta', 'alicewithmalice95@gmail.com'),
	('BobTheSlob99', '$2a$10$vRaDscbwZCqiY.Sm0oi1D.qwDJwmzJPI8HZsRkV8U50vE.Ajt171q',
		null,
        'Bob', 'Bartleby', 'bobtheslob99@yahoo.com'),
	('xmascarol63', '$2a$10$vRaDscbwZCqiY.Sm0oi1D.qwDJwmzJPI8HZsRkV8U50vE.Ajt171q',
		'https://i5.walmartimages.com/asr/00dc2778-e05e-4eeb-8011-baf31ec93b23_1.6346fa6da588f848856fcf511c10ef9f.jpeg',
        'Carol', 'Carell', 'xmascarol63@hotmail.com');

insert into app_user_role (app_user_id, app_role_id) values
	(1, 1),
    (2, 2),
    (3, 3),
    (4, 2),
    (5, 2),
    (6, 2);
