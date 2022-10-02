const axios = require('axios');

const getLatest = async (req, res) => {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    console.log(start_date);
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod` , {
            params: {
                api_key: process.env.NASA_API_KEY,
                start_date: start_date,
                end_date: end_date,
            }});
        // console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = getLatest
