# Important

This project is a basic project to learn the most basic conceptos of React, Redux, and related libraries.
Do not use this source code as reference of better practices.

# To Do

- Comment all functions and routes
- Improve the implementation of the Redux to handle the database information.

# On Heroku

You can see this project online on Heroku (delay because is a free account):
https://learningreactredux-sharelinks.herokuapp.com/ 

# API Routes

All routes MUST return a json with parameters {boolean} ```success``` and {string} ```message```, for example:
```{success: true, message: "The operation is successful"}```.

| METHOD  | ROUTE |
| ------------- | ------------- |
| GET  | /api/profile/profile-information/:nanoid  |
| POST  | /api/link/create-new-link  |
| DELETE  | /api/link/delete-link  |
| POST  | /api/link/types-of-links  |
| POST  | /api/account/login  |
| POST  | /api/account/account-information  |
| POST  | /api/account/create-new-account  |
| PATCH  | /api/account/update-email  |
| PATCH  | /api/account/update-password  |
| DELETE  | /api/account/delete-account  |