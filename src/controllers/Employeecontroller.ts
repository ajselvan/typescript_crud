import { Request, Response } from 'express'
import EmployeeModel from '../models/employee'
import * as bcrypt from 'bcrypt'
import { any } from 'joi'

const homedetails =(req:Request, resp:Response)=>{
    resp.json({
        Message:"Welcome to home page"
    })
}
//show the list of employees

const index = (req: Request, resp:Response) => {
    EmployeeModel.find()
        .then(response => {
            resp.json({
                response
            })
        })
        .catch(error => {
            resp.json({
                message: 'An error Occured'
            })
        })
}

// show single employee

const singleid = async (req:Request, resp:Response) => {

    console.log(req.params.id)
    let data = await EmployeeModel.findById(req.params.id)
    console.log("data", data)
    if (!data) {
        resp.json({
            status: 'fail',
            message: '404 not found'
        })
    }
    resp.json({
        data
    })

}

// create an employees

const store = (req: Request, resp: Response) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedpass) {
        if (err) {
            resp.json({
                error: err
            })
        }

    let employee = new EmployeeModel({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: hashedpass
    })

    console.log("create")
     
    employee.save()
        .then(response => {
            resp.json({
                message: 'Employee Added Successfully',
                response
            })  
        })
        .catch(error => {
            resp.json({
                message: 'An error Occured'
            })
        })
    })
}

//Update an employees

const update = async (req:Request, resp:Response) => {
    try {
       
        let employee = await EmployeeModel.findOne({ _id: req.params.id })
        console.log("employee",employee)

        if (!employee) {
          return resp.status(404).json("user Not Found.");
        }
    
        if (req.body.name) {
          employee.name = req.body.name;
          console.log(employee.name)
        }
    
        if (req.body.email) {
          employee.email = req.body.email;
          console.log(employee.email)

        }
    
        if (req.body.phonenumber) {
          employee.phonenumber = req.body.phonenumber;
          console.log(employee.phonenumber)
        }

    
        if (req.body.oldPassword && req.body.newPassword) {
            console.log("body old and new")

          if (req.body.oldPassword != req.body.newPassword) {
            console.log("not equal old and new")

            // Then validate the OldPassword with DB data
            const validPassword = await bcrypt.compare(
              req.body.oldPassword,
              employee.password
            );
            console.log("validapassword",validPassword)

            if (!validPassword) {
                console.log("not a valid")
              return resp.status(400).json("Incorrect  password.");
            } else {
              //Generate Salt for Password
              console.log("valid pass")
              const salt = await bcrypt.genSalt(10);
              employee.password = await bcrypt.hash(req.body.newPassword, salt);
            }
          } else {
            console.log("old and new are equal")
            return resp.status(400).json("Old Password can't be New password.");
          }
        }
    
        //Save user with Updated Password
        console.log("save employee")
        await employee.save()
        .then(response => {
            console.log("saved")
            resp.json({
                message: 'Employee Added Successfully',
                response
            })
        })
         
          } catch (err) {
            if (err instanceof Error) {
                resp.json(err.message);
            }
            else {
                    console.log('Unexpected error', err);
                  }
      }
}

// delete an employees

const destroy = (req:Request, res:Response) => {
    let employeeID = req.body.employeeID
    console.log("delete")
    EmployeeModel.findByIdAndRemove(employeeID)
        .then(() => {
            res.json({
                message: 'Employee deleted successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })
}

export {
    homedetails, index, store, destroy,singleid,update
}