const { Plan } = require("../db");
const { taskSchema } = require("../types");

exports.addnewtask = async (req, res) => {
    try {
        const planid = req.query.id;
        const payload = req.body;
        const { success } = taskSchema.safeParse(payload);
        
        if(!success){
            return res.json({
                msg:"Wrong input"
            })
        }
        const task = await Plan.findByIdAndUpdate(planid,{
            $push : {task : payload}
        })

        res.json({
            msg:"task is added"
        })

    } catch (error) {
        console.log(error);
        res.json({
            message:"Somthing is cooking in server"
        })        
        
    }
}

exports.updatetask = async (req, res) => {
    try {
        const allowedField = ['title', 'expense', 'assignedDate',"dueDate"];
        const id = req.query.id;
        const taskid = req.query.taskid;
        const payload = req.body;        
        const plan = await Plan.findById(id);
        const task = plan.task.id(taskid);

        for (const key of allowedField) {            
            if (payload[key] !== undefined) {
                task[key] = payload[key]
            }
        }
        await plan.save();
          res.json({
            message: "Updated successfully"
        })

        
    } catch (error) {
        console.log(error);
        res.json({
            message:"Somthing is cooking in server"
        })        
        
    }
}

exports.deletetask = async (req, res) => {
    try {
        const planid = req.query.id;
        const taskid = req.query.taskid;
        const plan = await Plan.findById(planid);

        await Plan.findByIdAndUpdate(planid,{
            $pull:{ task:{_id:taskid} }
        })
        res.json({
            message:"task deleted"
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            message:"somthing in up with the server boy"
        })        
        
    }
}