const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb+srv://AdityaPratap:qoYeY20Bkg1E45rK@cluster0.p5yi9c8.mongodb.net/PlanIt').then(() => {
        console.log("Database is connectde");

    })


} catch (error) {
    console.log(error);
}

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    expense:{
        type:Number,
        default:0
    },
    assignedDate:{
        type:Date,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    }],
    sharedPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    }]

})



const planSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    task: [taskSchema],
    createdAt:{
        type:Date,
        default: Date.now
    }
});



const User = mongoose.model('User', userSchema);
const Plan = mongoose.model('Plan', planSchema);

module.exports = {
    User,
    Plan
}