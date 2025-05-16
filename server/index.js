import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import dotenv from 'dotenv';
import connectDB from './db/db.js'


dotenv.config();
const app = express()
connectDB()


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Welcome to MindManthan EMS API')
})

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

