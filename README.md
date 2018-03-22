# Dang! That's Delicious

NodeJS application built in the awesome [Learn Node][learn-node] course.

## Installation

In order to run this application you'll need to install [MongoDB][mongo]. 
You'll also need a [Mailtrap][mailtrap] account.
And a [Google Maps API token][maps] with the static maps service enabled

You'll also need to create an `.env` file. 
Create yours with the following command

```
$ cp .sample.env .env
```

In your new `.env` file add your database settings (database name, username, password, etc).
Add your Mailtrap username and password.
Add your Google maps API key too.

Install the project dependencies with `npm`

```
$ npm install
```

## Usage

You can add sample data with the following command

```
$ npm run sample
```

Start the application with the following command and open a browser in [http://localhost:7777](http://localhost:7777)

```
$npm start
```

See `package.json` for more commands.

[learn-node]: https://learnnode.com/
[mongo]: https://docs.mongodb.com/manual/installation/
[mailtrap]: https://mailtrap.io/register/signup
[maps]: https://developers.google.com/maps/documentation/static-maps/get-api-key
