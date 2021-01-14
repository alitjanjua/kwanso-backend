const UserModel = require("../database/models/user");
const { verifyToken } = require("../helpers/common");

module.exports = {
  verifyToken: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).send("Invalid token");
    const userId = await verifyToken(authorization);

    if (userId) {
      res.locals.userId = userId;
      return next();
    } else res.status(500).send("invalid token");
  },

  attachUser: async (req, res, next) => {
    try {
      const { userId } = res.locals;
      if (userId) {
        const userRecord = await UserModel.findById(userId);
        if (!userRecord) {
          throw new Error("User not found in db! :(");
        }

        res.locals.user = userRecord;
        return next();
      } else {
        res.status(400).send("Invalid Token");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};
