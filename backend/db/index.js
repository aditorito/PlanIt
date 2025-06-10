const mongoose = require('mongoose');

try {
         mongoose.connect('mongodb+srv://AdityaPratap:qoYeY20Bkg1E45rK@cluster0.p5yi9c8.mongodb.net/PlanIt').then(()=>{
            console.log("Database is connectde");
            
         })

    
} catch (error) {
    console.log(error);    
}
