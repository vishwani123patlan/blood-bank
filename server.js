const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')

//dot env config
dotenv.config();


// mongodb connection
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
// routes
// 1test route

app.use('/api/v1', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
//end point will be http://localhost:8080

// port

const PORT = process.env.PORT || 8080

//listen use to start app

app.listen(PORT, () => {
  console.log(`Node Server Running in ${process.env.DEV_MODE} on Port ${process.env.PORT}`.bgBlue.white);
})