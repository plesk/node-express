var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true});

mongoose.connection.on('connected',(db)=>{
    console.log('DB connected');
})

mongoose.connection.on('error',(error)=>{
    console.log('error in db connected',error);
})

mongoose.connection.on('disconnect',()=>{
    console.log('DB disconnected');
})