// libraries to get from cache
const cache = require('memory-cache');

const axios = require('axios');
const redisClient = require('../services/redisClient');

const controller = {};

// METHOD 1 - Memory-fetch: fetch user by id
controller.getUser = async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the request parameters
        let json; // dynamic json to store the response

        // Check if data is in cache
        if (cache.get(id)) {
            console.log('Getting info from cache');
            json = cache.get(id);
        } else {
            console.log('Fetching from https://jsonplaceholder.typicode.com/users/ since its the first time');
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            json = await response.json();

            // Save data to cache
            cache.put(id, json);
        }

        res.status(200).send(json);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

// METHOD 2 - REDIS: fetch user by id (uncomment this method to use it)
// controller.getUser = async (req, res) => {
//     try {
//         const id = req.params.id; // Get the id from the request parameters
//         let json; // Dynamic json to store the response

//         try {
//             // Check if data is in cache
//             const cachedUser = await redisClient.get(id);

//             if (cachedUser) {
//                 console.log('Getting info from Redis cache...');
//                 json = JSON.parse(cachedUser);
//             } else {
//                 console.log('Fetching from https://jsonplaceholder.typicode.com/users/ since is the first time....');
//                 const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
//                 json = response.data;

//                 // Save data to cache
//                 await redisClient.set(id, JSON.stringify(json), {
//                     EX: 3600, // Cache for 1 hour
//                 });
//             }

//             res.status(200).send(json);
//         } catch (error) {
//             console.log(error);
//             res.status(500).send('Internal Server Error');
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error');
//     }
// };

module.exports = controller;