const repo = require('../repository/userRepository');
const User = require('../model/user');
const validate = require('../validation/validate').validateRegisterInput;


let UserService = {
    register: async (user) => {
        const {errors, isValid} = await validate(user);
        if (!isValid) {
            throw new Error(errors);
        } else {
            let newUser = new User(user);
            await repo.addUser(newUser);
        }
    },

    update: async (id, userData) => {
        const {errors, isValid} = await validate(userData);
        if (!isValid) {
            throw new Error(JSON.stringify(errors));
        } else {
           return  await repo.updateUser(id, userData);
        }

    },

    getById: async (id) => {
       return  await repo.getUserById(id);
    },

    getByEmail: async (email) => {
        return await repo.getUserByEmail(email);
    },

    getAllUsers: async () => {
        await repo.getAllUsers();
    },

    findByCredentials: async (user) => {
        const {errors, isValid} = await validate(user);
        if (!isValid) {
            throw new Error(JSON.stringify(errors));
        } else {
            let email = user.email
            const userData = await User.findOne({email})
            if (!userData) {
                throw new Error("Unable to login");
            }
            const isMatch = await userData.isPasswordMatch(user.password);
            if (!isMatch) {
                throw new Error("Unable to login");
            }
            return userData;
        }
    },

    delete: async (id) => {
        await repo.delete(id);
    },

    mapToObj: (data) => {
        let user = {};
        user.email = data.email;
        user.password = data.password;
        return user;
    }
};

module.exports = UserService;
