const axios = require('axios');

const getRandom = async (req, res) => {
    // axios.get(`https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=16`)
    // .then(function (response) {
    //   // handle success
    //   console.log(response.data);
    // })
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=16`);
        // console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = getRandom
