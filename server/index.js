const express = require("express");
const foodTrucks = require("./foodtrucks.js");

const PORT = process.env.PORT || 3001;

const app = express();

/*
    List endpoint for returning foodtrucks with filtering capabilities
    Required params: latitude, longitude
*/
app.get("/foodtrucks", (req, res) => {
    if(!req.query)
        return res.send({"error": "Missing required query params"}) 
    if (!req.query.latitude || req.query.latitude == "") 
        return res.send({"error": "Missing latitude query param"})
    if (!req.query.longitude || req.query.longitude == "")
        return res.send({"error": "Missing longitude query param"})

    const closeFoodTrucks = foodTrucks.listFoodTrucks(req.query.latitude, req.query.longitude) 
    res.json({"foodTrucks": closeFoodTrucks})
})


app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});