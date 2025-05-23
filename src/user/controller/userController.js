const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({username, password: hash});
    res.status(201).json({id: user.id, username: user.username});
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1d'});
    res.json({token});
};
