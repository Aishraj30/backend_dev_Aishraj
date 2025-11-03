

class AppError extends Error{

    constructor (message , statuscode , error = null){
        super(message);
        this.statuscode = statuscode;
        this.error = error;
    } 

}

module.exports = AppError