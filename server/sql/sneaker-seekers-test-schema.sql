drop database if exists sneaker_seekers_test; 
create database sneaker_seekers_test; 
use sneaker_seekers_test; 

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null
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
    style_name varchar(100) not null, 
    `description` varchar(3600) not null,
    release_year int not null, 
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


delimiter //
create procedure set_known_good_state()
begin

	delete from upgrade_request;
    alter table upgrade_request auto_increment = 1; 
    delete from favorite; 
    alter table favorite auto_increment = 1;
    delete from follow;
    alter table follow auto_increment = 1;
    delete from listing; 
    alter table listing auto_increment = 1;
    delete from `condition`;
    alter table `condition` auto_increment = 1;
    delete from style; 
    alter table style auto_increment = 1;
    delete from brand;
    alter table brand auto_increment = 1;
    delete from vendor_table;
    alter table vendor_table auto_increment = 1;
    delete from `event`;
    alter table `event` auto_increment = 1;
    delete from location; 
    alter table location auto_increment = 1;
    delete from app_user; 
    alter table app_user auto_increment = 1; 
    
    insert into app_user (username, password_hash)
		values
        ('dn7149ns', 'Great!password'),
        ('nx9187tx', 'Somethingpassword?');
    
    insert into location (location_name, location_address, location_city)
		values
        ('Minneapolis Convention Center', '1301 2nd Ave S', 'Minneapolis, MN'),
        ('Los Angeles Convention Center', '1201 S Figueroa St', 'Los Angeles, CA'),
        ('Austin Convention Center', '500 E Cesar Chavez St', 'Austin, TX');
        
	insert into `event` (event_date, num_table, location_id)
		values
        ('2022-06-10', 45, 2),
        ('2022-10-21', 30, 1),
        ('2023-03-25', 35, 3);
        
	insert into vendor_table (is_booked, event_id, app_user_id)
		values 
        (1, 2, 2),
        (1, 3, 1);
        
	insert into brand (brand_name)
		values 
        ('Nike'),
        ('Addidas');
    
    insert into style (style_name, `description`, release_year, brand_id)
		values 
        ('Panda Dunks', 'Black and white low-top dunks', 2019, 1),
        ('Nature Pale Coral Dunks', 'Peachy pink and white low-top dunks', 2020, 1);
        
	insert into `condition` (condition_name)
		values 
        ('Mint'),
        ('New'),
        ('Never worn'),
        ('Slightly worn'),
        ('Bad');
        
	
    insert into listing (listing_price, quantity, style_id, vendor_table_id, condition_id)
		values 
        (450, 15, 1, 1, 2),
        (400, 12, 2, 2, 2);
        
	insert into follow (follower_id, vendor_id)
		values 
        (1, 2),
        (2, 1);
        
	insert into favorite (style_id, app_user_id)
		values (1, 2);
        
	insert into upgrade_request (app_user_id)
		values (1);

end //
delimiter ;
        
	




