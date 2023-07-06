const UserSchema = require("../schemas/userSchema");
const GeniusCoinSchema = require("../schemas/geniusCoinSchema");
const UserSoldCoinsSchema = require("../schemas/userSoldCoinsSchema");
const createError = require("http-errors");

const userController = {
  newRate: async (req, res, next) => {
    try {
      const price = await GeniusCoinSchema.create({ price: req.body.price });

      res.status(200).json({ price });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
  getTodaysRate: async (req, res, next) => {
    try {
      const price = await GeniusCoinSchema.find().limit(1).sort({ $natural: -1 });

      res.status(200).json(price[0]);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
  getTotalUsers: async (req, res, next) => {
    try {
      const users = await UserSchema.find();

      const totalUsers = users.length;

      res.status(200).json({ totalUsers });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  totalUserCoinSold: async (req, res, next) => {
    try {
      const coinsSold = await UserSoldCoinsSchema.find({ userId: req.user._id });

      const totalUserCoinSold = coinsSold.length;

      res.status(200).json({ totalUserCoinSold });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = userController;
