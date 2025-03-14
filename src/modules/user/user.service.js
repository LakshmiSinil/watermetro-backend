const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateRandomPassword } = require('../../utils/generateRandomPassword');

// ✅ Get User by ID
exports.getUserById = async (id) => {
    const user = await User.findById(id);
    console.log(user);
    return user;
};

// ✅ Get All Users
exports.getAllUsers = async () => {
    const users = await User.find();  // Fetch all users from MongoDB
    return users;
};

// ✅ Register New User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update User by ID
exports.updateUserById = async (id, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    console.log("🚀 ~ updateUserById= ~ updatedUser:", updatedUser)

    if (!updatedUser) {
        throw new Error("User not found or update failed");
    }

    return updatedUser;
};

// ✅ Bulk User Creation
exports.createBulkUsers = async (bulkData) => {
    console.log("in create bulk service")
    const users = await Promise.all(bulkData.map(async (entry) => {
        const password = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        return {
            email: entry.email,
            password: hashedPassword,
            plainPassword: password,
            name: entry.name,
            role: entry.role || "employee"
        };
    }));

    const insertManyRes = await User.insertMany(users.map(({ email, password, name, role }) => ({ email, role, password, name })));

    console.log("🚀 ~ exports.createBulkUsers= ~ insertManyRes:", insertManyRes)
    
    return insertManyRes.map(({ email, name,role }) => ({ name, email,role }));
};
