const express = require("express");

const router = express.Router();
const { createHall, createConference, createKitchen, createReception, createWashroom,
getHall, getConference, getWashroom, getkitchen,getreception  } = require("../controllers/taskControllers")

router.post('/hall', createHall ).post('/conference', createConference).post('/kitchen', createKitchen).post('/reception', createReception).post('/washroom', createWashroom)

router.get('/hall', getHall).get('/conference', getConference).get('/kitchen', getkitchen).get('/washroom', getWashroom).get('/reception', getreception)

// router.get('/getoneroom/:roomId', getoneRoom)
// router.put('/updateroom/:roomId', updateRoom)
// router.delete('/deleteroom/:roomId', deleteRoom)

module.exports = router

