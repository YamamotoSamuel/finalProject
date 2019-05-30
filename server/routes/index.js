const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Task = require('../models/Task')

router.post('/saveTask', isLoggedIn, (req,res,next)=>{
  console.log('adfsad')
  let {activity, type, participants}  = req.body
  Task.create({
    activity,
    type,
    participants,
    userId: req.user._id,
    myTask:false
  }).then(tasksFromDB=>{
    res.json({
      // task:'saved'
    })
  }).catch(err=>console.log(err))
})


router.post('/saveMyTask', isLoggedIn, (req,res,next)=>{
  let {activity, type, participants}  = req.body
  Task.create({
    activity,
    type,
    participants,
    userId: req.user._id,
    myTask:true
  }).then(tasksFromDB=>{
    res.json({
      // task:'saved'
    })
  }).catch(err=>console.log(err))
})


router.get('/myTasks', isLoggedIn, (req,res,next)=>{
  Task.find({userId:req.user._id, myTask:true}).then(tasksFromDB=>{
    res.json(tasksFromDB)
  })
})

//userId: {$ne: req.user._id }
router.get('/task', (req,res,next)=>{
  Task.find({myTask: false}).then(tasksFromDB=>{
    res.json(tasksFromDB)
  })
})

router.post('/task/deleteTaskPlease', (req,res,next)=>{
  console.log(req.body, req.params, req.query, req.file)
  Task.findByIdAndDelete(req.body.id).then(responseFromDB=>{
    res.json({deleted:responseFromDB})
  })
  
  //id is not defined this is my error 
})


module.exports = router;
