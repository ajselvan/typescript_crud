import {Schema,model} from "mongoose"

interface Employee {
        name:String,
        email:String,
        phonenumber:String,
        password:string,
        newPassword:String,
        oldPassword:String
}
const employeeSchema = new Schema<Employee>({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true

    },
    phonenumber:{
        type: String,
        required:true

    },
    password:{
        type: String,
        required:true
    },
    newPassword:{
        type: String
    },
    oldPassword:{
        type: String
    }
}, {timestamps: true})

const EmployeeModel = model<Employee>('Employee', employeeSchema)
export default EmployeeModel