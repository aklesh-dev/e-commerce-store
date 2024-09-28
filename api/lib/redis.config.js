import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
// key-value store: redis.set("key", "value");
// await redis.set('foo', 'bar');

// what is redis?
// Redis is an in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets, and more. It is often used as a distributed cache for high-traffic applications.
// key-value store: Redis is a key-value store, which means it stores data in the form of key-value pairs. Each key is associated with a value, and both the key and value can be of different data types. Redis provides various commands for working with keys and values, such as SET, GET, DELETE, and others.
// In-memory data structure store: Redis is an in-memory data structure store, which means that the data is stored in the memory of the server, rather than on disk. This makes Redis very fast and efficient, especially for large datasets. Redis supports various data structures such as strings, hashes, lists, sets, and sorted sets.