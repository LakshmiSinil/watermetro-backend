const Leave = require("./leave.model");

exports.getAllLeaves = async () => {
    const leaves = await Leave.find().populate('userId');
    return leaves;
};

exports.getLeaveById = async (id) => {
    const leave = await Leave.findById(id).populate('userId');
    return leave;
};

exports.createLeave = async (leaveData) => {
    const newLeave = await Leave.create(leaveData);
    return newLeave;
};

exports.updateLeaveById = async (id, updateData) => {
    const updatedLeave = await Leave.findByIdAndUpdate(id, updateData, { new: true }).populate('userId');
    return updatedLeave;
};

exports.deleteLeaveById = async (id) => {
    const deletedLeave = await Leave.findByIdAndDelete(id).populate('userId');
    return deletedLeave;
};
