const {User}=require('../models/user');
const express=require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get(`/`, async (req,res)=> {
    const userList = await User.find();

    if(!userList)
    {
        res.status(500).json({success:false})
    }
    res.send(userList);
})

router.get('/:id', async (req, res)=> {
    const user=await User.findById(req.params.id);
    
    if(!user)
    return res.status(500).json({message:'The user with the given ID was not found'})
})

router.post(`/`, async (req,res)=> {
    let user = new User({
        ho : req.body.ho,
        ten:  req.body.ten,
        gender:  req.body.gender,
        birthday: req.body.birthday,
        email:  req.body.email,
        password:  bcrypt.hashSync(req.body.password,10),
        isAdmin: req.body.isAdmin,
        
    })
    //user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be found')

    res.send({message: 'Đã gửi email xác nhận cho bạn'})
    //res.send(user);
});

module.exports = router;