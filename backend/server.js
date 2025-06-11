const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const planRouter = require('./routes/planRoutes');
app.use(bodyParser.json());
app.use(cors());

app.use('/planit/auth', authRouter);
app.use('/planit/users',userRouter);
app.use('/planit/plan',planRouter)


app.listen(PORT, ()=>{
    console.log("Server is running on PORT: ", PORT);
    
})

