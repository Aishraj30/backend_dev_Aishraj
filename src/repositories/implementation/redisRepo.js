
const ICacheRepo = require('../contracts/IredisChache');
const { client } = require('../../config/redis'); // renamed for consistency
const AppError = require('../../utils/error');


const RedisRepo = class extends ICacheRepo {
 
  async get(key) {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw new AppError('not cache recived', 500, error);
    }
  }

  
  async set(key, value, ttl = 3600) {
    try {
      await client.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      throw new AppError('cache not set', 500, error);
    }
  }


  async del(key) {
    try {
      await client.del(key);
    } catch (error) {
      throw new AppError('delete cache', 500, error);
    }
  }
};

module.exports = RedisRepo;
