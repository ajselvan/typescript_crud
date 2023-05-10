import express, {Request,Response} from 'express'
import mongoose from 'mongoose';
import { router } from './routes/employeeroute'
const app = express();
app.use(express.json())
    

const dbURL = 'mongodb://localhost:27017/studentdb'
mongoose.connect(dbURL),{
    useUnifiedTopology: true
}

const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('database connection Established!')
})

const port = 3000

app.use(router)
app.use(express.urlencoded({extended: true}))

app.get('/test',(req:Request,resp:Response):void=>{
    resp.json({
        data:"test page"
    })
})

app.listen(port,():void=>{
    console.log(`server is running on ${port}`)
})