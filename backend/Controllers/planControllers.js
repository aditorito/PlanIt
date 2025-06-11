const { planBody } = require("../types");
const { Plan } = require('../db');

exports.getCreatedplans = async (req, res)=>{
    try {
        const userId = req.userId;
        const plans = await Plan.find({
            createdBy:userId
        });
        res.json(plans)
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message:"kuch prioblam hai bhai"
        })
        
        
    }
}
exports.getSpecificPlan = async (req, res)=>{
    try {
        const id = req.query.id;
        const plan = await Plan.findById(id);
        res.json(plan)
        
    } catch (error) {
        console.log(error);
           return res.status(403).json({
            message:"kuch prioblam hai bhai"
        })       
        
    }
}
exports.getPlanasparticipants = async (req, res) => {
    try {
        const userId = req.userId;
        const plans = await Plan.find({
            participants:userId
        })

        res.json(plans)
        
    } catch (error) {
                console.log(error);
           return res.status(403).json({
            message:"kuch prioblam hai bhai"
        }) 
        
    }
}
exports.createplan = async (req,res) => {
    try {
        const payload = req.body;
        const { success } = planBody.safeParse(payload);
        if (!success) {
            return res.json({
                message:"Wrong format"
            })            
        }   
        await Plan.create({
            title:payload.title,
            description:payload.description,
            createdBy:req.userId,
            participants:payload.participants,
            task:payload.task
        });

        res.json({
            message:"Plan is created"
        })

    } catch (error) {
        console.log(error);
        res.json({
            msg:"Somthing didn't go well with server"
        })      
        
    }
}