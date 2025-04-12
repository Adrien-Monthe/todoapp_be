const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../../user/model/user');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;