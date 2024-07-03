const needle = require('needle');
const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    callback(null,body.ip);
   
  });
};

const fetchCoordsByIP = function (ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  
  needle.get(url, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }
    const body = response.body;
     if (!body.success) {      
      callback(Error('Failed to fetch coordinates'), null);
      return;
    }
    const latitude = body.latitude
    const longitude = body.longitude
    callback(null, {
      latitude, longitude
    });
  })

}

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = body.response;
    callback(null, passes);
  });
};


module.exports = {fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes};