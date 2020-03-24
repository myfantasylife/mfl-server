const User = require('../../models/user');
const passwordHash = require('password-hash');

async function signup(req, res) {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      text: 'Invalid request'
    });
  }

  const user = {
    email,
    password: passwordHash.generate(password)
  };

  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: 'User already exists'
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: 'Success',
      token: userObject.getToken()
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { password, email } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      text: 'Invalid request'
    });
  }

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(401).json({
        text: 'User does not exists'
      });
    }
    if (!findUser.authenticate(password)) {
      return res.status(401).json({
        text: 'Wrong password'
      });
    }
    return res.status(200).json({
      token: findUser.getToken(),
      text: 'Login success'
    });
  } catch (error) {

  }
} 

exports.login = login;
exports.signup = signup;