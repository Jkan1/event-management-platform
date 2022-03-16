# event-management-platform

* REST APIs for an Event Management Platform written in Node.Js.

* Includes two REST APIs :
  - `/api/create-event`
      - To create Events.

  - `/api/get-events`
      - To fetch both Live and Upcoming Events.

* Request Query Parameters (For **GET** `/api/get-events`) :
  - limit
      - To limit the number of records in both Live and Upcoming Events.
  - skip
      - To skip some number of records for pagination.

* Response Type (JSON) :
  - code    : Response Status Code.
  - message : Response Message.
  - data    : Data as JSON.

* Commands to execute :
  - `npm start`
      - To start the Server.
  - `npm test`
      - To run Tests.
