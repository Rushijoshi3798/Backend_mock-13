const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    console.log("Sucessfully, connected to Auth Routeee");

    const token = req.headers.authorization;

    if(token !== null){
        const decoded = jwt.verify(token, "masai");
        if(decoded){
            next();
        }else {
           res.status(400).send({msg: "Kindly SignUp first"}) 
        }
    }else {
        res.status(400).send({msg: "token sended is incorrect"}) 
    }
}

module.exports = {
    auth
}