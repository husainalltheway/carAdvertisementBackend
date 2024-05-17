const loginSchema = {
    type: 'object',
    required: [
        "email",
        "password"
    ],
    properties: {
        email: {
            type: 'string',
            description: 'Your registered email address',
            example: 'Your email'
        },
        password: {
            type: 'string',
            descripton: "Your password",
            example: '123455****23'
        }
    }
}

export default loginSchema