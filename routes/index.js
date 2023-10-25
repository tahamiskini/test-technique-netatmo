var express = require("express");
var router = express.Router();
const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config();

//credentials
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_ID;
const redirectUri = "http://localhost:4000/api/auth/callback";
const deviceID = "70:ee:50:3f:13:36";
const moduleID = "02:00:00:3f:0a:54";
const dateBegin = 1697621440; //october 18th
const dateEnd = 1698226240; // todays date
// const scale = "max";
// const type = "temperature";
const limit = 1024;

/*  For public weather stations we don't need to go through the OAuth2 process mentionned in the documentation to obtain the access token , instead i will be
    using my developer account and the MAC addresses of the public station .
*/

const access_token = process.env.ACCESS_TOKEN;

const dataUrl = `https://api.netatmo.com/api/getmeasure?device_id=${deviceID}&module_id=${moduleID}&scale=max&type=temperature&date_begin=${dateBegin}&date_end=${dateEnd}&optimize=true&real_time=false`;

router.get("/public-station-temperature", async (req, res) => {
  try {
    const response = await axios.get(dataUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    });
    //res.json(response.data);
    const data = response.data.body;
    const allTemperatures = data.flatMap((entry) => entry.value.flat()); // .flat() is needed because entry.value may contain nested arrays.
    const minTemperature = Math.min(...allTemperatures);
    const maxTemperature = Math.max(...allTemperatures);
    const averageTemperature =
      allTemperatures.reduce((sum, temp) => sum + temp, 0) /
      allTemperatures.length;

    res.json({
      minTemperature,
      maxTemperature,
      averageTemperature,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
// this enpoint returns min,max and average temperature for this weather station / module pair: 70:ee:50:3f:13:36/02:00:00:3f:0a:54

module.exports = router;
