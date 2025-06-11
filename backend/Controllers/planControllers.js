const { planBody } = require("../types");
const { Plan } = require('../db');

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