const express = require("express");
const router = express.Router();
const Room = require('../models/rooms')
router.get("/getallrooms", async(req, res)=>{
    
    try{
        const rooms = await Room.find({});
        res.json({rooms});
    }
    catch(error){
        return res.status(400).json({message: "Didn't loaded"})
    }
});
module.exports = router;