const User = require('../models/user');
const authService = require('../services/authService');
const bcrypt = require('bcrypt-nodejs');


const UserController = {
  message: "Hello WOrld "
};
UserController.register = async (req, res) => {
  // res.status(200).json({message:"Working"})
  const body = req.body;
  console.log("++++++++++++++++++");
  console.log(body, "BODY")
  if (body.password) {
    try {

      const hashPassword = passwordHash(body.password)
      console.log("HASH PASSWORD", hashPassword)
      const user = {
        name: body.name,
        email: body.email,
        password: hashPassword,
      };

      const saveUser = new User(user);
      saveUser.save((err, value) => {
        if (err) {
          console.log(err);
        } else {
          console.log(value, "Response")
        }
      })
      const token = authService().issue({ id: user.id });
      return res.status(200).json({ token, user });
    } catch (err) {
      console.log(err, "server error");
      return res.status(500).json({ message: 'Internal Server Error' });

    }
  } else {
    res.status(400).json({ message: "No user found" })
  }
}

UserController.login = async (req, res) => {
  // res.status(200).json({message:"Working"})
  const body = req.body;
  console.log("++++++++++++++++++");
  console.log(body, "Login Api")

  User.findOne({ email: body.email }, (err, user) => {
    if (err) {
      console.log(err, "ERROR in Login");
      return res.status(404).json({ message: 'No user found' });
    } else {
      if (user !== null) {
        console.log(user, "++++++++++USER password fromDB")
        const isMatch = comparePassword(body.password, user.password);
        const token = authService().issue({ id: user.id });
        // delete user.password;
        // NOTE : password should be deleted from user object
        if (isMatch) {
          return res.status(200).json({ message: 'successfully Login', user });
        } else {
          res.status(400).json({ message: 'Incorrect Password' });
        }
      } else {
        res.status(404).json({ message: 'No such User found' });
      }
    }
  })
}

UserController.getAllUser = async (req, res) => {
  User.find((err, data) => {
    if (err) {
      console.log(err, "ERROOr");
      res.status(400).json({ message: "no user" })
    } else {
      console.log(data, "REsponse");
      res.status(200).json({ message: data })

    }
  })
}
// Hashing password
const passwordHash = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt)

  return hash;
}

// compare password
const comparePassword = (password, hash) => (
  bcrypt.compareSync(password, hash)
)


module.exports = UserController;