class CustomAPIError extends Error {

    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError =(msg,statusCode)=>{
    CustomAPIError(msg,statusCode)
}

module.exports ={
    CustomAPIError,
    createCustomError
}