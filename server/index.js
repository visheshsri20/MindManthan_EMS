import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import dotenv from 'dotenv';
import connectDB from './db/db.js'
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import path from 'path';
import { fileURLToPath } from 'url';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';

dotenv.config();
const app = express()
connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Welcome to MindManthan EMS API')
})
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)

app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

