const mongoose = require('mongoose');




const taskSchema = new mongoose.Schema({
  activity:{
    type: String,
    minlength:1
  },

  participants:{
    type:Number
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref:"User"} ,
  myTask: { type:Boolean, default: false}
});
// const taskSchema = new mongoose.Schema({
//   activity:{
//     type: String,
//     minlength:1
//   },
//   type:{
//     type:["social", "music", "education", "busywork", "charity", "relaxation", "recreational", "cooking", "diy"]
    
//   },
//   participants:{
//     type:Number
//   },
//   privacy:{
//     private:false
//   },
//   userId: { type: Schema.Types.ObjectId, ref:"User"} ,
//   myTask: { type:Boolean, default: false}
// });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;