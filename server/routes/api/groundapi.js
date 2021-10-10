const express = require('express');
const router = express.Router();

//Ground Model
const Ground = require('../../../models/groundModel')

//Get Grounds from api/grounds
router.get('/', (req,res)=>{
    Ground.find()
            .then(Grounds=> res.json(Grounds))
});

//Get Grounds by Ground_ID

router.get('/:id',(req,res)=>{
    Ground.findById(req.params.id)
        .then(Ground=> res.json({data:Ground,success: true}))
})

//Post Grounds to api/grounds
router.post('/', (req, res)=>{
    // const{name, address, phone, email}= req.body.grounds;
    const newGround = new Ground({
        
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
    });
    newGround.save()
    .then(Grounds => res.json(Ground));
})

module.exports = router;
