const registerSchema = {
  type: "object",
  required: [
    "name",
    "userName",
    "email",
    "phoneNumber",
    "location",
    "password",
  ],
  properties: {
    name: {
        type: 'string',
        description: 'Your name',
        example: 'Leo Messi'
    },
    userName: {
        type: 'string',
        description: 'Your user name',
        example: 'leomessi'
    },
    email: {
        type: "string",
        description: "Your email address",
        example: "leo@gmail.com"
    },
    phoneNumber: {
        type: "string",
        description: "Your phone number",
        example: "1234567890"
    },
    location: {
        type: "string",
        description: "Your city",
        example: "Noida"
    },
    password: {
        type: "string",
        description: "Your password",
        example: "123456789"
    }
}
};

export default registerSchema