const bcrypt = require('bcrypt-nodejs');

const bcryptService = () => {

  const password = (password) => {
    console.log(password, "bcrypt+++++++++++++++")
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt)

    return hash;
  }

  const comparePassword = (password, hash) => (
    bcrypt.compareSync(password, hash)
  )

return {
  password,
  comparePassword
}
}
module.exports = bcryptService;