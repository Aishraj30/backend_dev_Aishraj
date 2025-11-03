const express = require('express')
const {
    logincontroller,
    registercontroller
} = require('../controller/user.controller')

const controller = require('../controller/user.controller')
const authMiddleware = require('../middleware/authuser')
const roleMiddleware = require('../middleware/role')
const userController = require('../controller/user.controller')

const router = express.Router()

router.post('/register' , controller.register )
router.post('/login' ,  controller.login )


router.get('/:id', authMiddleware ,   controller.getuser );
router.put('/:id',  roleMiddleware(['admin' , 'client' , 'candidate'])  ,  userController.updateUser );


module.exports = router 