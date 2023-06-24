# The Quizzable Backend Framework

Quizzable is made using [PocketBase](https://pocketbase.io/) as its database. PocketBase acts as a database and an API together.

Email verification must be done using an App Password in Google settings, if using Google for email verification.

## Dependencies

The pocketbase go framework is required to run the program. It can be installed with the following command:

```bash
go get github.com/pocketbase/pocketbase
```

## Developing

The program can be tested with the following command:

```bash
go run quizzable.go serve --http 127.0.0.1:8091
```

## Building

To build the executable PocketBase file:

```bash
go build -o quizzable
```

## Running

To run the executable PocketBase file:

```bash
./quizzable serve
```
