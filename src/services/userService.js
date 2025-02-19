const User = require('../models/userModel');

exports.getUserById = async (id) => {
    return await User.findById(id).select('-password');
};
