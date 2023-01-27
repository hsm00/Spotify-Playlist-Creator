const axios = require('axios');
const apiController = {};

apiController.getData = async (req, res) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search?q=TRACK_NAME&type=track&market=US&limit=1', {
            headers: {
                Authorization: `Bearer BQBqrT8zPuzpBhgY3OYPLYQM02FbKAQiVTyRDcULXyMO3Q7g6liPHtZG19rKCMLM5t4EewUqr_xch8aMbgriXTVoGD101oPPKlqD0o1Sh79v8H56BXTJxbiBYrVfI8RujVuqfFSRGzyMhI8CLfIRv4dKxT3RTivpthMmdgIMBHRkP4F0hMyXSXrDl4TA0BNn1k5Q1srM9s_IKy9SIG4k75I21Qq3miq07IpgRolBX_Yd1RIxI6XsSAiNBk0Aywz5bGqbWlR1J-2hx5M`
            }
        });
        res.status(200).json({
            success: true,
            data: response.data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
module.exports = apiController;
