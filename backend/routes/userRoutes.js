const express = require('express');
const { deleteUser, getAllUsers, getUserById, updateUser, userLogin, userRegister } = require('../controllers/userController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/login',userLogin);
router.post('/register', userRegister);
router.get('/getusers',authMiddleware, getAllUsers);
router.get('/getuser/:id',authMiddleware, getUserById);
router.put('/useredit/:id',authMiddleware, updateUser);
router.delete('/userdelete/:id',authMiddleware, deleteUser);

module.exports = router;
