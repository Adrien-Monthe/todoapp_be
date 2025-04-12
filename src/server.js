const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./user/routes/userRoutes');
const taskRoutes = require('./task/routes/taskRoutes');
const authenticate = require('./middleware/auth');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/tasks', authenticate, taskRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync();

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
