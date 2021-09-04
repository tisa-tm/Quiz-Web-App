const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
// const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token){
    console.log("no token");
    return res.status(401).json({message: "You must login first"});
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    req.loggedInUser = await decoded?.username;
    // console.log(req.loggedInUser);
    next();
  } catch (err) {
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    console.log("error");
    return res.status(400).send(err.message);
  }
};

// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new Error(
//         `Roles(${req.user.role}) is not allowed to access this resource,`
//       );
//     }
//     next();
//   };
// };

// const authorizeRoles = (...roles)

// module.exports = { auth, authorizeRoles };