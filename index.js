const { fetchMyIP, fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log('omo this your stuff is nonsense ooh', error);
      return;
    }
    console.log('It worked! Returned coordinates:', coords);
  })


  const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

  fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log('It worked! Returned flyover times:', passTimes);
  });

});