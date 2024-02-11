const axios = require('axios');

const url = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');
data.append('client_id', process.env.client_id);
data.append('client_secret', process.env.client_secret);

axios.post(url, data, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
