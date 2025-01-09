const validateUser = (req)=>{
    const validator = require('validator');
    if(!req.body.FirstName && !req.body.email && !req.body.password){
        throw new Error("Please provide required fields");
    }
    if(!validator.isEmail(req.body.email)){
        throw new Error("Invalid email");
    }
    if(!validator.isStrongPassword(req.body.password)){
        throw new Error("Password is not strong. It must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.");
    }
}
module.exports = validateUser;