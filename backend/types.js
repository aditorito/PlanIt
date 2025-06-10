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

module.exports = {
    signinBody: signinBody,
    signupBody: signupBody
}