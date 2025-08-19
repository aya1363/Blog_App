

export const errorHandling = ({ res, error } = {}) => {
    switch (error?.name) {
        case  "SequelizeUniqueConstraintError":
                    res.status(409).json({msg:'SequelizeUniqueConstraintError',error})
                break;
            case "SequelizeUniqueValidationError":
                    res.status(400).json({msg:'SequelizeUniqueValidationError',error})
            break; 
            case "SequelizeValidationError":
                res.status(400).json({msg: "Validation Error",error: error.errors?.[0]?.message || error.message});
            break;

            default:
                res.status(500).json({msg:'server error',error,info:error.message ,stack:error.stack})
                break;
        }
}
export const SuccessResponse = ({ res, status=201, message ='done' ,data={} } = {}) => {
    res.status(status).json(message,data)
}

