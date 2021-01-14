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
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      id: 1,
      email,
      password: hashedPassword,
    });
    if (newUser)
      res.status(201).json({ user: { id: newUser.id, email: newUser.email } });
    else res.status(500).send("Unexpected error");
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
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
          .json({ user: { id: userRecord.id, email: userRecord.email } });
      } else {
        throw new Error("Invalid Token");
      }
      res.status(200).send("get a user");
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};
