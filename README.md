# Back-end

Node.js (SQL database)

## Macro Calculator

**Base URL**: https://macrocalc.herokuapp.com/api

### GET

Routes below require the user to be logged in and have a token.

- For testing, log in with the following:
- **username**: test
- **password**: test

#### Routes

- **All Users**: /users
- **Current User**: /users/profile
- **Any User**: /user/profile/:username

### POST

- **Register**: /auth/register (requires all data)
- **Login**: /auth/login (only requires username and password)

The data required and the corresponding data types for registration is as followed:

- **username**: string,
- **password**: string,
- **age**: integer,
- **height**: float,
- **weight**: float,
- **exerciseFrequency**: float,
- **goal**: float,
- **male**: boolean

NOTES ON DATA:

- **height**: is expected to be in inches
- **weight**: is expected to be in pounds
- **goal**: expected to be a percent represented in decimal form. ex: -15% would be -0.15.
- **male**: boolean that indicates the user is male if true and female if false.

### PUT

- **Edit Current User**: /profile

### DELETE

- **Delete Current User**: /profile
