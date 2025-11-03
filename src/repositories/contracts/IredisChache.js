

const ICacheRepo = class {

  async get(key) {
    throw new Error('not implemented');
  }

  async set(key, value, ttl) {
    throw new Error('not implemented');
  }


  
  async del(key) {
    throw new Error('not implemented');
  }
};

module.exports = ICacheRepo;
