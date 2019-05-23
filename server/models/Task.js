const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  activity:{
    type: String,
    minlength:1
  },
  type:{
    type:["social", "music", "education", "busywork", "charity", "relaxation", "recreational", "cooking", "diy"]
    
  },
  participants:{
    type:Number
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;