const { Hall, Kitchen, Reception, Conference, Washroom } = require('../models/taskModels');

const getRoomByUserId = async (req, res) => {
  const { user_id } = req.params;
  
  try {
    // You can query each room type here
    const hall = await Hall.findOne({ user_id }).exec();
    const kitchen = await Kitchen.findOne({ user_id }).exec();
    const reception = await Reception.findOne({ user_id }).exec();
    const conference = await Conference.findOne({ user_id }).exec();
    const washroom = await Washroom.findOne({ user_id }).exec();

    // You can customize the response structure as needed
    const rooms = {
      hall,
      kitchen,
      reception,
      conference,
      washroom,
    };

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getRoomByUserId,
};
