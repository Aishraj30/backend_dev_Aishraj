// ...existing code...
const joi = require('joi');
const userRepo = require('../repositories/implementation/mongouserRepo');
const RedisRepo = require('../repositories/implementation/redisRepo');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/error');

const { JWT_SECRET_KEY } = process.env;

const registerschema = joi.object({
    fullname: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('admin', 'client', 'candidate')
});

const loginschema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

class userService {

    constructor(mainrepo, cacheRepo) {
        // use injected repositories (fallback to defaults)
        this.mainrepo = mainrepo || userRepo;
        this.cacheRepo = cacheRepo || new RedisRepo();
    }

    async register(userdata) {
        const { error } = registerschema.validate(userdata);
        if (error) throw new AppError(error.message, 400);

        const cacheKey = `user:email:${userdata.email}`;
        const existCache = await this.cacheRepo.get(cacheKey);
        if (existCache) throw new AppError("token not found", 404);

        const exist = await this.mainrepo.findByEmail(userdata.email);
        if (exist) throw new AppError('email already exist', 409);

        const user = await this.mainrepo.create(userdata);

        await this.cacheRepo.set(`user:id:${user._id}`, {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
        }, 3600);

        await this.cacheRepo.set(cacheKey, user, 3600);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET_KEY || process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        return {
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
            },
            token
        };
    }

    async login({ email, password }) {
        const { error } = loginschema.validate({ email, password });
        if (error) throw new AppError(error.message, 400);

        // declare user with const to avoid reference errors
        const user = await this.mainrepo.findByEmail(email);
        if (!user) throw new AppError('user not found', 401);

        const match = await user.comparepassword(password);
        if (!match) throw new AppError("invalid credential", 401);

        await this.cacheRepo.set(`user:id:${user._id}`, {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
        }, 3600);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET_KEY || process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        return {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name
            },
            token
        };
    }

    async getuser(id) {
        const cacheKey = `user:id:${id}`;
        let getuser = await this.cacheRepo.get(cacheKey);

        if (!getuser) {
            const user = await this.mainrepo.findById(id);
            if (!user) throw new AppError('user not found', 404);

            await this.cacheRepo.set(cacheKey, {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name
            }, 3600);

            getuser = {
                _id: user._id,
                fullname: user.fullname || user.name,
                role: user.role,
                email: user.email
            };
        }

        // support cached object shape (may have id instead of _id)
        const idField = getuser._id || getuser.id;

        return {
            id: idField,
            fullname: getuser.fullname || getuser.name,
            role: getuser.role,
            email: getuser.email
        };
    }

    async updateuser(id, userdata) {
        try {
            const { error } = registerschema.validate(userdata);
            if (error) throw new AppError(error.message, 400);

            const user = await this.mainrepo.updateuser(id, userdata);
            if (!user) throw new AppError('user not found', 404);

            return {
                id: user._id,
                email: user.email,
                role: user.role,
                fullname: user.fullname
            };
        } catch (err) {
            console.error("Update User Error:", err.message);
            throw new AppError('Failed to update user', 500);
        }
    }
}

module.exports = new userService(userRepo, new RedisRepo());
