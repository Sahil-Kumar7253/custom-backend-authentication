// for Statefull authentication

// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

//for stateless authentication

const jwt = require("jsonwebtoken");
const secret = "ajgfugfyegjkfjkasfuiyaucbu";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email : user.email,
        role: user.role
    }, secret);
}

function getUser(token){
    if(!token) return null;

    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser
}