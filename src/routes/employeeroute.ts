import express, {Request,Response} from 'express'
import { index,store,homedetails,destroy,singleid, update} from '../controllers/Employeecontroller'
import { addUserValidation } from '../validationschema'

const router = express.Router()

router.get('/get',index)
router.post('/store',addUserValidation,store)
router.get('/home',homedetails)
router.delete('/destroy',destroy)
router.get('/get/:id',singleid)
router.post('/update/:id',update)

router.get('*',(req,res)=>{
    res.status(404);
    res.send({
        status: 'fail',
        error: 404,
        message: 'page not found'
    })
})

router.get('/about',(req:Request,resp:Response):void=>{
    resp.json({
        Message:"Welcome to about page"
    })
})

export {
    router
}