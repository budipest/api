# budipest-api

This is an Express API with Node.js for the Budipest app.

## What will this service do?

This Express API serves the Flutter application (that can be found in [this repository](https://github.com/danielgrgly/budipest)) with the nearby toilets and related services (e.g. upvoting, downvoting).

Our API has the following endpoints:

- **GET /toilets?lat={lat}&lon={lon}**
  - Get nearby toilets. Provide the user latitude and longitude in the URL params.
- **POST /toilets**
  - Upload a new toilet
- **GET /toilets/{toiletID}**
  - Get a particular toilet's data.
- **POST /toilets/{toiletID}/upvote/{userID}**
  - Upvote a toilet with the user ID. If the user already upvoted this toilet, calling this endpoint will remove the upvote. If the user has a downvote, calling this endpoint will also remove that.
- **POST /toilets/{toiletID}/downvote/{userID}**
  - Upvote a toilet with the user ID. If the user already downvoted this toilet, calling this endpoint will remove the downvote. If the user already upvoted, calling this endpoint will also remove that.
- **POST /toilets/{toiletID}/ratings/{userID}**
  - Add new rating or edit existing one.

## How do you start development?

```sh
npm i
npm run dev
```
