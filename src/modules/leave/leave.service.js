const Leave = require("./leave.model");

exports.getAllLeaves = async () => {
    const leaves = await Leave.find().populate('user');
    return leaves;
};

exports.getLeaveById = async (id) => {
    const leave = await Leave.findById(id).populate('user');
    return leave;
};

exports.createLeave = async (leaveData) => {
    const { userId, startDate, endDate, reason } = leaveData
    const newLeave = await Leave.create({ user: userId, startDate, endDate, reason });
    return newLeave;
};

exports.updateLeaveById = async (id, updateData) => {
    const updatedLeave = await Leave.findByIdAndUpdate(id, updateData, { new: true }).populate('user');
    return updatedLeave;
};

exports.deleteLeaveById = async (id) => {
    const deletedLeave = await Leave.findByIdAndDelete(id).populate('user');
    return deletedLeave;
};
