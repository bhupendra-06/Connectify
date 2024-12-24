// const express = require('express');
// const mongoose = require('congoose');
// const userRoute = require('./routes/userroute');

// // const express = require('express');
// // const mongoose = require('mongoose');
// // // const bodyParser = require('body-parser');
// // const userRoutes = require('./routes/userRoutes');

// const app= express();
// const port = 4000;

// mongoose
//     .connect("url")
//     .then( () => console.log("success"))
//     .catch(err => console.log("error"));

// app.use('api/user',userRoute);

// app.listen(Port, ()=> {
//     console.log("port is running");
// })

// const userSchema = new monggoose.Schema({
//     name : {type : String,required :true},
//     email : {type:String,required:true},
//     password : {type :String,required:true}
// },{timestamps:true})

// module.export = mongoose.model(userRoute,userSchema);

// // const userSchema = new mongoose.Schema({
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     age: { type: Number, required: true },
// //   }, { timestamps: true });
  
// //   module.exports = mongoose.model('User', userSchema);

// const User = require("../model/usershema");
// const route = express.route();

// route.post('/',async (req,res) =>{
//     try{
//         const user = new User(req.body);
//         const saveduser = await user.save();
//         res.status(200).json(savedsuser);

//     }catch{
//         res.status(400).json({ error: error.message });
//     }
// } )

// route.get('/',async(req,res) => {
//     try {
//         const user = await User.find();
//         res.status(200).json(user);
        
//     } catch (error) {
//         res.status(400).json({"error"});
        
//     }
// })

// route.get('/:id',async (req,res) => {
//     try {
//         const user = await User.findbyId(req.params.id);
//         res.status(200).json(user);
        
//     } catch (error) {
        
//     }
// })

// // -------------CRUD OPERATION-----------

// const router = express.route();
// const User = require("../model/userschema");


// router.post('/',async (req,res) =>{
//     try {
//         const user = new User(req.body);
//         const saveduser = await user.save();
//         res.status(200).json({success});
//     } catch (error) {
//         res.status(500).json({"internal error"});
//     }
// })

// router.get('/',async (req,res) =>{
//     try {
//         const user = await find();
//         // const saveduser = await user.save();
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({"internal error"});
//     }
// })

// router.get('/:id',async (req,res) =>{
//     try {
//         const user = await User.findbyId(req.params.id);
//         // const saveduser = await user.save();
//         if(!user) res.status(404).json({"not found"});
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({"internal error"});
//     }
// })

// router.put('/:id',async (req,res) =>{
//     try {
//         const user = await User.findbyIdAndUpdate(req.params.id);
//         // const saveduser = await user.save();
//         if(!user) res.status(404).json({"not found"});
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({"internal error"});
//     }
// })

// router.delete('/:id',async (req,res) =>{
//     try {
//         const user = await User.findbyIdAndDelete(req.params.id);
//         // const saveduser = await user.save();
//         if(!user) res.status(404).json({"not found"});
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({"internal error"});
//     }
// })