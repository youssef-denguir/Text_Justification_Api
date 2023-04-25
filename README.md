# Text Justification API

This API provides endpoints for text justification, authentication, and Swagger documentation. It is built using Node.js, Express.js, and JWT for authentication.

## Endpoints
### `/api/auth/token`

**Method:** POST

**Description:** This endpoint justifies the input text to a given width and returns the formatted text.

**Request Body:**

```json
{
  "mail": "youssef@gmail.com",
}
NB: you can only authenticate with this user right now as it is the only one added in the data base.

### `/api/justify`

**Method:** POST

**Description:** This endpoint justifies the input text to a given width and returns the formatted text.

**Request Body:**

```Text/plain

"Sample text to justify"


### `/api-docs`

**Method:** GET

**Description:** This endpoint returns the Swagger documentation for this API.

