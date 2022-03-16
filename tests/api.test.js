const axios = require('axios');

test('Get Events Query Validation', () => {
  axios.get('http://localhost:3000/api/get-events?limit=2&skip=0&search=test')
    .then(
      (response) => {
        expect(response.data).toEqual({
          "code": 400,
          "message": "\"search\" is not allowed",
          "data": {}
        })
      }
    )
    .catch();
});

test('Create Events Validation', () => {
  axios.post('http://localhost:3000/api/create-event',
    {
      "name": "Birthday Party",
      "duration": 60
    })
    .then(
      (response) => {
        expect(response.data).toEqual({
          "code": 400,
          "message": "\"start_time\" is required",
          "data": {}
        })
      }
    )
    .catch();
});
