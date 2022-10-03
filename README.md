# Student_teacher_fav_API

This is complete node application with routes, controllers and models.

## Setup

Run `npm start` to install required dependencies

Create .env with following variables

- PORT = [Your Port]
- MongoURL = [Your MongoDB Url]
- Run `npm start`

## API urls

* Api to register Student : [POST] `localhost:[Your Port]/register` with [name, email, phoneNo, password, grade] in postman to create new Student![stu_register](https://user-images.githubusercontent.com/99065594/193482449-02a7a77f-feba-4e05-8eb8-534bfa05ff46.png)
* Api to login : [POST] `localhost:[Your Port]/login` with [email, password] in postman for login & generating token![login_success](https://user-images.githubusercontent.com/99065594/193482568-bc4fa101-4610-4830-a856-2c8c732282fe.png)
* Api to create Teacher : [POST] `localhost:[Your Port]/add` with [Authorization] in headers with value [Bearer token] & with body [mame, email, phoneNo, subject] in postman to create Teacher if it doesn't exist![add_header](https://user-images.githubusercontent.com/99065594/193482783-0deb609c-aed9-4ad8-a3d3-5edea8c4b8b5.png) & add it to favourite list of loggedIn student AND if it exists then also add it to favourite list of loggedIn student![add_body](https://user-images.githubusercontent.com/99065594/193482812-bc3d20d7-e784-430c-a61f-630f2b42fdfa.png)
* Api to delete specific teacher from Student's list : [DELETE] `localhost:[Your Port]/remove/{teacher.id}` in postman from logged in Student![remove](https://user-images.githubusercontent.com/99065594/193483064-9d5cd1b5-45d2-4fab-878d-3724b0d5de5e.png)
* Api to get favourite teacher: [GET] `localhost:[Your Port]/favourite` in postman from logged in Student![favourite](https://user-images.githubusercontent.com/99065594/193483164-dbb1b56b-b96d-461f-ad67-b687460a7606.png)
