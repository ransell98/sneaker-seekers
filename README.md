# Sneaker Seekers

## Problem Statement
The world of sneakers expands across multiple communities due to its diversity in individuals! It provides a common ground for sneaker-heads to connect with one another on their love for rare, unique, and limited edition sneakers. Another common practice in the world of sneakers is the practice of selling, trading, and flipping sneakers with other sneaker-heads. Sneaker Seekers is a sneaker convention that will allow sneaker-heads to connect face-to-face, whether it is to share their love or to sell and flip sneakers. Through the Sneaker Seekers website, vendors, customers, and guests will be able to explore upcoming Sneaker Seekers convention events, whether it is to book a table as a vendor, explore the different vendors and sneakers available at the event, or to simply attend the convention event. <br />
It may be difficult for customers and even vendors to bridge the gap in connecting with others. Sneaker Seekers will provide a common ground for customers and sellers. Customers will have the ability to come onto the Sneaker Seekers website to explore the different vendors and the shoes available through various vendors. Additionally, customers will have the power at the tip of their fingers to pre-shop for their favorite shoes at upcoming Sneaker Seekers conventions by simpling going on the website. Vendors will have the opportunity to expand their platform and promote the shoes they are selling by connecting with customers and other vendors. Overall, sharing the love of sneakers and developing/expanding one's platform has never been easier!

## Scenarios
Create an application for planning sneaker conventions. Make it easy to search conventions, vendors, and sneakers, and to sign up for a convention.

### Scenario 1
Alice is traveling to Atlanta for the weekend. She loves collecting sneakers, and uses *Sneaker Seekers* to find info about the sneaker convention that weekend. She searches her favorite brands of sneakers and finds a couple of vendors that will be selling those brands.

### Scenario 2
Bob is a sneaker flipper who travels from convention to convention. He uses *Sneaker Seekers* to find the location of the next convention and to sign up for a table. He is able to list the sneakers he has to sell and list their price and condition.

## Vocabulary
<dl>
    <dt>Guest</dt>
    <dd>Anyone who uses Sneaker Seekers without being logged into an account. Guests are able to view events and vendors.</dd>
    <dt>User</dt>
    <dd>Anyone who uses Sneaker Seekers while being logged into an account. Users can do everything a guest can do, as well as 
    modify lists of the favorited shoes and followed vendors. Users can also apply to become a vendor and view notifications. 
    All vendors and admins are users, but not all users are vendors and admins.</dd>
    <dt>Vendor</dt>
    <dd>A user who has been approved by an admin to become a vendor. Vendors can claim one table per event on a first-come-
    first-serve basis, as well as modify the list of shoes they are selling at that table. A vendor may cancel their table
    if they wish to do so.</dd>
    <dt>Admin</dt>
    <dd>A user with the ability to approve or deny other users' vendor applications. Admins are also able to add and delete 
    upcoming events.</dd> 
    <dt>Event</dt>
    <dd>A day planned by Sneaker Seekers in which a marketplace is held at a convention center for the sale of shoes. Anyone can 
    attend events, but only vendors with tables may sell shoes at their table. Different events have a different number of 
    tables depending on which convention center is hosting.</dd> 
    <dt>Table</dt>
    <dd>A list of shoes being sold by a certain vendor at a certain event.</dd>
    <dt>Style</dt>
    <dd>A specific pair of shoes including brand, model, release year, and color.</dd>
    <dt>Brand</dt>
    <dd>A company that makes shoes. Guests and users are able to search for only specific brands if they wish to do so.</dd>
    <dt>Condition</dt>
    <dd>The current state or quality of a pair of shoes being sold (used, new, deadstock, etc.)</dd>
    <dt>Listing</dt>
    <dd>A specific sale of a pair of shoes including its vendor, event, price, condition, etc.</dd>
</dl>

## Learning Goal Candidates
- React animation/transition 
- Lombok 
- Icons 
- Third-party sneaker API
- Third-party maps API 
- Third-party calendar api 

## User Stories

### Browse Conventions
Look through upcoming conventions. Filter by date and location.

*Precondition*: None

*Post-condition*: None

### Browse Tables at a Convention
Once a visitor finds a convention, they can view the vendors and the styles of shoe they can purchase.

*Precondition*: None

*Post-condition*: None

### Search by Style
A visitor can search through a huge list of shoe styles and find the vendors and tables that will be selling that style.

*Precondition*: None

*Post-condition*: None

### Favorite and Follow
If a user enjoys a certain style of shoe, or a certain vendor, they can "favorite" the style and "follow" the vendor.

*Precondition*: User must be logged in.

*Post-condition*: The style is added to the user's favorites list, or the vendor is added to the user's followed list.

### Search by Favorite Style
A user can view all the vendors/tables that will be carrying their favorited style.

*Precondition*: User must be logged in. User must have at least one style on their favorites list.

*Post-condition*: None

### Search by Followed Vendor
A user can view all the upcoming conventions that a followed vendor will have a table at.

*Precondition*: User must be logged in. User must have at least one vendor on their followed list.

*Post-condition*: None

### Apply to Become a Vendor
A user can request to become a vendor for upcoming conventions.

*Precondition*: User must be loggied in.

*Post-condition*: User is not automatically given the VENDOR role. The request is sent to the admins to approve or deny.

### Book a Table
A vendor can sign up to have a table at a given convention.

*Precondition*: User must be logged in with the VENDOR role.

*Post-condition*: Table is registered for that vendor.

### Add Shoes to a Table
A vendor can add shoe styles to their table at a convention. They set the price, condition, and quantity for the style.

*Precondition*: User must be logged in with the VENDOR role. User must have a registered table at the given event.

*Post-condition*: Styles are added to the table with the price, condition, and quantity set.

### Remove and Edit Shoes at a Table
If a vendor makes a mistake or has a change in their inventory, they can edit the price, condition, or quantity for the style, or else delete the listing altogether.

*Precondition*: User must be logged in with the VENDOR role. User must have a registered table at the given event. User must have one or more shoe styles listed at their table.

*Post-condition*: The price, condition, and quantity are changed for the given listing, or else the listing is deleted from the table.

### Cancel a Table
If a vendor will be unable to attend a convention they previously booked a table for, they can cancel the table.

*Precondition*: User must be logged in with the VENDOR role. User must have a registered table at the given event.

*Post-condition*: The table is deleted from the event and becomes available for another vendor to book.

### Create a Convention
The ADMIN can create an upcoming convention. The ADMIN must set a date, a location, and a number of tables.

*Precondition*: User must be logged in with the ADMIN role.

*Post-condition*: The event is created and added to the calendar of events.

### Cancel a Convention
The ADMIN can cancel an upcoming convention.

*Precondition*: User must be logged in with the ADMIN role.

*Post-condition*: The event is deleted from the calendar of events, along with all the tables.

### Approve/Deny an Upgrade to Vendor
Through an administrative UI, the ADMIN finds the users that wish to be approved as vendors. The ADMIN can approve or deny these requests.

*Precondition*: User must be logged in with the ADMIN role.

*Post-condition*: The user is either given the VENDOR role, or their role is not changed. Either way, the request is removed from the list.

## Technical Tasks
 * Database Schema
 * Set Known Good State Implementation
 * Models Implementation & Testing
 * Data (Repository/Mapper) Implementation & Testing
 * Service Implementation & Testing
 * Controllers Implemenation & Testing
 * HTTP Request Testing 