# Jaldi.io Project  														   <img src=".\Images\Logo-B.png" style="zoom:7%;" />

[TOC]

### Introduction

- Family Oriented Social Media Application Web Based, programmed in React (front-end) and Express (back-end)
- Has features like sharing event details, recipes and much more among the family connection
- An idea that can be wildly explored and could turn into a real project in future
- Excellent UI created by the members of the group.

<img src=".\Images\cover.png" style="zoom:25%;" />

### Architecture

<img src=".\Images\Jaldi.io Architecture.png" style="zoom:75%;" />

This serves as our architecture about how the website functions.

### Login / Signup

- This allows the users to create a login access which provides private access to the app with encryption.
- Uses the SHA1 Encryption Algorithm to store passwords for security.
- This also allows the new users to create a private profile.
- Stops the creation of duplicate profiles on the signup page.
- Gives an error upon entering incorrect credentials to login.
- Errors are handled by checking the MongoDB Atlas database for the users.
- Login adds new users in the MongoDB Atlas database.

<img src=".\Images\login.png" style="zoom:60%;" />

<img src="\Images\incorrect_password.png" style="zoom:50%;" />    <img src=".\Images\existing_user.png" style="zoom:45%;" />

<img src=".\Images\Database.PNG" style="zoom:100%;" />

### Home Page

- Allows the user to create or join a family. 
- This allows the members of the family to share specific data to each other.
- This will create a family entry in the database.

<img src=".\Images\home.png" style="zoom:50%;" />

<img src=".\Images\create_family.png" style="zoom:40%;" /><img src=".\Images\join_family.png" style="zoom:40%;" />

### Navbar

- Allows the users to access different pages of the site.
- Has a functionality which allows the user to log out.

<img src="\Images\navbar.png" style="zoom:60%;" />

### Calendar

- An Event Calendar which uses the Storing Algorithm to fetch and store items from and to Database.

- Allows the user to view events the other members of the family have saved.

- Allows the user to create more events for specific dates, edit events and also delete the events.

- Gives a monthly, weekly and daily view for the calendar. 

- Provides the user with the ability to reach back to today's date with a click of the button.

- Allows the user to view all the events in the calendar.

  <img src=".\Images\Calendar1.PNG" style="zoom:20%;" />       <img src=".\Images\Calendar2.PNG" style="zoom:20%;" />

  <img src=".\Images\Calendar3.PNG" style="zoom:20%;" />               <img src=".\Images\Calendar4.PNG" alt="Calendar4" style="zoom:20%;" />   <img src=".\Images\Calendar5.PNG" style="zoom:30%;" />                                        <img src=".\Images\Calendar6.PNG" alt="Calendar6" style="zoom:25%;" />											                        <img src=".\Images\Calendar7.PNG" style="zoom:30%;" />                                                                                   <img src=".\Images\Calendar8.PNG" alt="Calendar8" style="zoom:25%;" />  



### Recipe

- Allows the users in a family to share recipes through adding recipes to the recipe page.
- The recipe's data is stored and accessed through the MongoDB Atlas Database.
- Has functionality which allows the users to add ingredients, instructions and author.

<img src=".\Images\add_recipe.png" style="zoom:50%;" />

<img src=".\Images\edit_recipe.png" alt="edit_recipe" style="zoom:50%;" />

<img src=".\Images\view_recipe.png" alt="view_recipe" style="zoom:50%;" />

<img src=".\Images\view_recipes.png" alt="view_recipes" style="zoom:50%;" />



### Server

- Connects the database to the client and helps control the database.
- Server is used for Processing requests and sending response.
- Encrypting information before storage.

<img src=".\Images\server.PNG" style="zoom:100%;" />