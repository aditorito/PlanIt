const { planBody } = require("../types");
const { Plan, User } = require('../db');

exports.getCreatedplans = async (req, res) => {
    try {
        const userId = req.userId;
        const plans = await Plan.find({
            createdBy: userId
        });
        res.json(plans)
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message: "kuch prioblam hai bhai"
        })


    }
}
exports.getSpecificPlan = async (req, res) => {
    try {
        const id = req.query.id;
        const plan = await Plan.findById(id);
        res.json(plan)

    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message: "kuch prioblam hai bhai"
        })

    }
}
exports.getPlanasparticipants = async (req, res) => {
    try {
        const userId = req.userId;
        const plans = await Plan.find({
            participants: userId
        })

        res.json(plans)

    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message: "kuch prioblam hai bhai"
        })

    }
}
exports.createplan = async (req, res) => {
    try {
        const payload = req.body;
        const userid = req.userId;
        const { success } = planBody.safeParse(payload);
        if (!success) {
            return res.json({
                message: "Wrong format"
            })
        }
        const plan = await Plan.create({
            title: payload.title,
            description: payload.description,
            createdBy: req.userId,
            participants: payload.participants,
            task: payload.task
        });

        await User.findByIdAndUpdate(userid,{
            $push:{ createdPlans : plan._id}
        });

        for(const participant of payload.participants){
            await User.findByIdAndUpdate(participant,{
                $push:{sharedPlans:plan._id}
            })
        }

        res.json({
            message: "Plan is created"
        })

    } catch (error) {
        console.log(error);
        res.json({
            msg: "Somthing didn't go well with server"
        })

    }
}

exports.updateplan = async (req, res) => {
    try {
        const allowedField = ['title', 'description', 'participants'];
        const id = req.query.id;
        const payload = req.body;        
        const plan = await Plan.findById(id);

        for (const key of allowedField) {            
            if (payload[key] !== undefined) {
                plan[key] = payload[key]
            }
        }
        await plan.save();
        res.json({
            message: "Updated successfully"
        })


    } catch (error) {
        console.log(error);
        return res.json({
            message: "somthing is odd"
        })


    }
}

exports.deletePlan = async (req, res) => {
    try {
        const planid = req.query.id;
        const userid = req.userId;
        await Plan.findByIdAndDelete(planid);
        await User.findByIdAndUpdate(userid, {
            $pull:{ createdPlans: planid}
        })
        await User.updateMany(
            { sharedPlans: userid},
            { $pull: { sharedPlans: userid}}
        )
        res.json({
            msg:"Plan is deleted"
        })

    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message: "kuch prioblam hai bhai"
        })

    }
}