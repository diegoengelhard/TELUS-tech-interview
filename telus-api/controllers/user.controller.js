// libraries to get from cache
const cache = require('memory-cache');
const redis = require('redis');

// Setup redis client
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

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

// METHOD 2 - Redis-fetch: fetch user by id (uncomment to use)
// controller.getUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let json;

//         // Check if data is in Redis cache
//         client.get(id, async (err, result) => {
//             if (err) throw err;

//             if (result) {
//                 console.log('Getting info from Redis cache...');
//                 json = JSON.parse(result);
//             } else {
//                 console.log('Fetching from https://jsonplaceholder.typicode.com/users/ since its the first time...');
//                 const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//                 json = await response.json();

//                 // Save data to Redis cache
//                 client.setex(id, 3600, JSON.stringify(json));
//             }

//             console.log(json);
//             res.status(200).send(json);
//         });
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error');
//     }
// }

module.exports = controller;