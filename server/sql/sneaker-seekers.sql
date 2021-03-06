drop database if exists sneaker_seekers; 
create database sneaker_seekers; 
use sneaker_seekers; 

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    profile_picture varchar(1000) null,
    first_name varchar(100) null,
    last_name varchar(100) null,
    email varchar(100) null
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
		primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
		references app_user(app_user_id),
	constraint fk_app_user_role_role_id
		foreign key (app_role_id)
		references app_role(app_role_id)
);

create table location (
	location_id int primary key auto_increment, 
    location_name varchar(100) not null, 
    location_address varchar(100) not null, 
    location_city varchar(100) not null
);

create table `event` (
	event_id int primary key auto_increment,
    event_name varchar(150) not null,
    event_date date not null, 
    num_table int not null,
    event_image varchar(300) null, 
    location_id int not null, 
    constraint fk_event_location_id
		foreign key (location_id)
        references location(location_id)
);

create table vendor_table (
	vendor_table_id int primary key auto_increment, 
    is_booked boolean not null default(0),
    table_number int not null, 
    event_id int not null, 
    app_user_id int null,
    constraint fk_vendor_table_event_id
		foreign key (event_id)
        references `event`(event_id), 
	constraint fk_vendor_table_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table brand (
	brand_id int primary key auto_increment, 
    brand_name varchar(50) not null
);

create table style (
	style_id int primary key auto_increment, 
	external_style_id varchar(500) null, 
    style_name varchar(100) not null, 
    `description` varchar(3600) null,
    release_year date null, 
    colorway varchar(100) null, 
    style_image varchar(300) null, 
    brand_id int not null, 
    constraint fk_style_brand_id
		foreign key (brand_id)
        references brand(brand_id)
);

create table `condition` (
	condition_id int primary key auto_increment, 
    condition_name varchar(50) not null
);

create table listing (
	listing_id int primary key auto_increment, 
    listing_price int not null, 
    quantity int not null, 
    style_id int not null, 
    vendor_table_id int not null, 
    condition_id int not null,
    constraint listing_style_id 
		foreign key (style_id)
        references style(style_id),
	constraint listing_vendor_table_id
		foreign key (vendor_table_id)
        references vendor_table(vendor_table_id),
    constraint listing_condition_id
		foreign key (condition_id)
        references `condition`(condition_id)    
);

create table follow (
    follower_id int not null,
    vendor_id int not null,
    constraint fk_follow_follower_id
		foreign key (follower_id)
        references app_user(app_user_id),
    constraint fk_follow_vendor_id
		foreign key (vendor_id)
        references app_user(app_user_id)    
);

create table favorite (
	favorite_id int primary key auto_increment, 
    style_id int not null, 
    app_user_id int not null, 
    constraint favorite_style_id 
		foreign key (style_id)
        references style(style_id),
	constraint fk_favorite_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table upgrade_request (
	upgrade_request_id int primary key auto_increment, 
    app_user_id int not null,
    constraint fk_upgrade_request_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

insert into app_role (`name`) values
    ('USER'),
    ('VENDOR'),
    ('ADMIN');

-- ehCX7MexUCb&T7
insert into app_user (username, password_hash) values
    ('user', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K'),
    ('vendor', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K'),
    ('admin', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K');

insert into app_user_role (app_user_id, app_role_id) values
	(1, 1),
    (2, 2),
    (3, 3);
    
insert into `condition` (condition_id, condition_name) values
	(1, "New"),
    (2, "Open Box"),
    (3, "Used");
