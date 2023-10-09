const {constants} = require ("../errorType");
const errorHandler = (err, req, res, next) => {
    
    const statuscode = res.statuscode ? res.statuscode :500;
    switch(statuscode) {
        case (constants.VALIDATION_ERROR):
            res.json({title:"Validation Failed" ,message: err.message, stackTrace: err.stack});
            break;

        case (constants.NOT_FOUND):
            res.json({title: "Not Found" ,message: err.message, stackTrace: err.stack});
            break;

         case (constants.FORBIDDEN):
            res.json({title: "Forbidden" ,message: err.message, stackTrace: err.stack});
            break;

        case (constants.UNAUTHORIZED):
            res.json({title: "Unauthorised" ,message: err.message, stackTrace: err.stack});
            break;

        case (constants.SERVER_ERROR):
            res.json({title: "Server Error" ,message: err.message, stackTrace: err.stack});
            
            default:
            console.log("No Error All Good !");
            break;                                 
        }  
};
module.exports = errorHandler;