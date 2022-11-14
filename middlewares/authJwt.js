const createHttpError = require("http-errors");
const { decodeToken, verifyToken } = require("../helpers/jwtHelper");
const { User, Role } = require("../database/models");

const isAuthenticated = (req, res, next) => {
  const headerAuthorization =
    req.headers.authorization || req.headers.Authorization;

  if (!headerAuthorization || !headerAuthorization.startsWith("Bearer ")) {
    next(createHttpError(403, "the token does not exist"));
  }

  const isExpired = verifyToken(headerAuthorization, res);
  if (isExpired.res) {
    const httpError = createHttpError(403, "the token has expired");
    next(httpError);
  }

  let decoded = decodeToken(headerAuthorization);
  if (!decoded.decodeDataToken.data) {
    const httpError = createHttpError(403, "access denied");
    next(httpError);
  }
  req.user = decoded.decodeDataToken.data;
  next();
};

 const hasOwnershipRol= async (req, res, next) => {
  const headerAuthorization =
    req.headers.authorization || req.headers.Authorization;

  const decoded = decodeToken(headerAuthorization);
  const userIdToken = JSON.stringify(decoded.decodeDataToken.data.userId);
  const userCurrent=req.params.id
   
   const user = await User.findOne({
     where: { id: userIdToken },
     attributes: ["id"],
     include: {
       model: Role,
       attributes: ["name"]
     },
   }); 
   
   if (userCurrent != userIdToken) {      
      if (user.Role.name === "ADMIN") {       
        return next();
     }
      else {
         const httpError = createHttpError(403, "you do not have admin permissions");
        next(httpError);
     }    
   }
   next(); 
};



module.exports = {isAuthenticated ,hasOwnershipRol};
