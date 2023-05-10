import joi from 'joi'
import { Request, Response } from 'express'
const schema = joi.object({
    name: joi.string().max(100).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(10).required(),
    phonenumber: joi.number().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number").required()
})

export const addUserValidation = (req:Request,res:Response,next:any)=>{
    console.log("1", req)
    const result = schema.validate(req.body)
    console.log(result) 
    if (result.error) {
        res.json({
            success: 0,
            message: result.error.details[0].message
        })
    }
    else {
        next()
    }
    console.log(result)
} 


export {
    schema
    /*addUserValidation: (req: Request, res: Response) => {
        console.log("1", req)
        const value = schema.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        }
        else {
            next()
        }
        console.log(value)
    }*/
}