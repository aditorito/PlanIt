const z = require('zod');

const signupBody = z.object({
    username: z.string(),
    email:z.string().email(),
    password:z.string()
})

const signinBody = z.object({
    email:z.string().email(),
    password:z.string()
})

const taskSchema = z.object({
    title:z.string(),
    expense:z.number().optional().default(0),
    assignedDate:z.coerce.date(),
    dueDate: z.coerce.date()
})

const planBody = z.object({
    title: z.string(),
    description:z.string(),
    participants: z.array(z.string()),
    task:z.array(taskSchema),
    createdAt: z.coerce.date().optional()

})

module.exports = {
    signinBody: signinBody,
    signupBody: signupBody,
    planBody: planBody,
}