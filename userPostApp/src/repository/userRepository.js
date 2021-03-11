const User = require('../model/user');

let UserRepository = {
    addUser: async (user) => {
        await user.save()
    },
    getUserById: async (id) => {
      let user = await User.findById(id);
      return user;
    },

    updateUser: async (userId, updateBody) => {
        let updatedUser = await User.findByIdAndUpdate(userId, updateBody, {new: true});
        if (!updatedUser) {
            throw new Error("No user");
        }
        return updatedUser;
    },

    getAllUsers: async () => {
        await User.find();
    },

    getUserByEmail:  async (email) => {
          let result = await User.findOne({email});
          return result;
    },

    delete: async (id) => {
        await User.deleteOne({_id:id});
    }
};

module.exports = UserRepository;

