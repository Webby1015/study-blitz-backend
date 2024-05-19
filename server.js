const express = require('express')
const dotenv = require("dotenv").config()
const errorHandler = require('./middleware/errorHandler')

const app = express();
const port  = process.env.PORT || 5000 ;

const userRoutes =  require('./routes/userRoutes');
const notesRouter =  require('./routes/notesRoutes');
const connectDb = require('./config/dbconnect');

connectDb()
app.use(express.json())
app.use("/api/users",userRoutes);
app.use("/api/notes",notesRouter);
app.use(errorHandler)

app.get('/',(req,res)=>{
    res.status(200).json({message:"Study-Blitz Api Works"})
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})