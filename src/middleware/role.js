const AppError = require('../utils/error'); // ✅ ensure this path & filename are correct
const authMiddleware = require('./authuser');



const roleMiddleware = (roles) => {
  return (req, res, next) => {
     console.log(" Role check:", req.user, "Allowed roles:" , roles); 
     console.log("Role check:", req.user?.role, "Allowed roles:", roles);

    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError('Access denied: insufficient permissions', 403);
    }
    next();
  };
};


module.exports = roleMiddleware;
