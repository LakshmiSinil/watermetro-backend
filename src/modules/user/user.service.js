const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const { name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message:'User registered successfully',user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log("🚀 ~ exports.loginUser= ~ password:", password,await bcrypt.hash(password, 10))
        console.log("🚀 ~ exports.loginUser= ~ email:", email)
        console.log("🚀 ~ exports.loginUser= ~ user:", user.password)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateUserById = async (id, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });

    if (!updatedUser) {
        throw new Error("User not found or update failed");
    }
    
    return updatedUser;
};