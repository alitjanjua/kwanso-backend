const UserModel = require("../database/models/user");
const {
  hashPassword,
  comparePasswords,
  generateTokens,
  verifyToken,
} = require("../helpers/common");

module.exports = {
  addUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new Error("Email or Passward is missing");
      }
      const hashedPassword = await hashPassword(password);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
      });
      if (newUser)
        res
          .status(201)
          .json({ user: { id: newUser._id, email: newUser.email } });
      else throw new Error("Unexpected error");
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new Error("Email or Passward is missing");
      }
      const userRecord = await UserModel.findOne({ email }).lean().exec();
      if (!userRecord) res.status(404).send("user not found! :(");

      const isvalidPassword = await comparePasswords(
        password,
        userRecord.password
      );
      if (!isvalidPassword) {
        throw new Error("Incorrect Password");
      }
      const token = generateTokens(userRecord);
      res.status(200).json({ jwt: token });
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  getUser: async (req, res) => {
    const { authorization } = req.headers;
    try {
      const userId = await verifyToken(authorization);

      if (userId) {
        const userRecord = await UserModel.findById(userId);
        if (!userRecord) {
          throw new Error("User not found in db! :(");
        }

        return res
          .status(200)
          .json({ user: { id: userRecord._id, email: userRecord.email } });
      } else {
        throw new Error("Invalid Token");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};
