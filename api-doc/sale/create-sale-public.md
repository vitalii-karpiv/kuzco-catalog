# Create Sale (Public)

Creates a new sale request from the public catalog. This is intended for end customers submitting purchase requests from the website.

## Endpoint

```
POST /sale/create/public
```

## Authentication

Not required – this is a public endpoint.

## Request Body

All fields are required.

```json
{
  "laptopId": "string",
  "phone": "string",
  "pib": "string"
}
```

- **laptopId**: MongoDB ObjectId of the laptop being purchased.
- **phone**: Customer phone number (validated as a phone number).
- **pib**: Customer full name / personal info block (free-form string).

## Behavior

When the request is accepted:

- A customer record is created or updated using the provided `phone` and `pib`.
- The referenced laptop is loaded to determine its current selling price.
- An internal alert email is sent to notify managers about the new sale request.
- A new sale is created with:
  - `code` in the form `sale-N` (sequential counter),
  - `price` taken from the laptop `sellPrice`,
  - `state` set to `toApprove`,
  - links to the customer and laptop.

The endpoint currently responds with **`201 Created`** and an empty body.


