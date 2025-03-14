const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateRandomPassword } = require('../../utils/generateRandomPassword');
const { transporter } = require("../../utils/mailer")

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

exports.createUser = async (userData) => {
    try {
        const { name, email } = userData;

        if (!name || !email) {
            throw new Error("Name and email are required");
        }

        const password = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "employee",
        });

        console.log("Sending mail to", newUser.email);

        await transporter.sendMail({
            from: '"Admin" <admin@example.com>',
            to: newUser.email,
            subject: "Your Employee Account Credentials",
            text: `Hello ${newUser.name},\n\nYour account has been created. Here are your login details:\n\nEmail: ${newUser.email}\nPassword: ${password}\n\nPlease change your password after logging in.`,
        });

        return newUser;
    } catch (error) {
        console.error("Failed to create user:", error);
        throw new Error("User creation failed");
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
    const users = await Promise.all(bulkData.map(async (entry) => {
        try {
            const password = generateRandomPassword();
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name: entry.name,
                email: entry.email,
                password: hashedPassword,
                role: "employee",
            });
            console.log("sending mail to ", user.email)
            await transporter.sendMail({
                from: '"Admin" <admin@example.com>',
                to: user.email,
                subject: "Your Employee Account Credentials",
                text: `Hello ${user.name},\n\nYour account has been created. Here are your login details:\n\nEmail: ${user.email}\nPassword: ${password}\n\nPlease change your password after logging in.`,
            });
            return user
        } catch (error) {
            console.error("Failed to create user in bulk ~ email:", entry.email)
            return { ...entry, status: "failed" }
        }


    }));

    return users
};
