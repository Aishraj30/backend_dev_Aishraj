


const logger = require("../utils/logger");


const errorHandler = (err , req , res , next) =>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'internal server error'

    logger.error(`${statuscode} - ${message}` , err.error || err)

    res.status(statuscode).json({
        succes:true,
        message,
        ...(process.env.NODE_ENV !== 'development '  && { stack : err.stack    })




    })
}

module.exports = errorHandler