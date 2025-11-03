// src/repositories/implementation/mongoUserRepo.js
const AppError = require('../../utils/error');
const UserRepo = require('../contracts/userRepo');
const User = require('../../models/user.model');

class MongoUserRepo extends UserRepo {
  async create(userdata) {
    try {
      const user = new User(userdata);
      return await user.save();
    } catch (error) {
        console.error(' Create User Error:', error);
      throw new AppError('Failed to create user', 500, error);
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new AppError('Failed to find user by email', 500, error);
    }
  }

  async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new AppError('Failed to find user by ID', 500, error);
    }
  }

  async updateuser(id, userdata) {
    try {
      return await User.findByIdAndUpdate(id, userdata, { new: true });
    } catch (error) {
      throw new AppError('Failed to update user', 500, error);
    }
  }
}

module.exports = MongoUserRepo;

