var jwt = require('jsonwebtoken');
const UserService = require("../service/user");

const signUp = async (req, res) => {
  const paylod = req.body
  const walletAddress = paylod.waletAddress
  if (walletAddress) {
    const oldPost = await UserService.getUserByWallet(walletAddress)
    if (!oldPost) {
      const post = await UserService.addUser(req.body)
      return res.status(200).json({message: "user signed up successfully"})
    }
    else {
      return res.status(201).json({error: "user already signed up"})
    }
  }
}

const logIn = async (req, res) => {
  try {
    const payload = req.body;
    const post = await UserService.getUserBy(payload);

    if (post == null) {
      return res.status(404).json({ error: 'No user' });
    }

    const jwtSecret = process.env.jwtSecret || '';

    jwt.sign({
        user: post,
      },
      jwtSecret,
      { expiresIn: 6000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        return res.json({ token });
      }
    );
  } 
  catch (err) {
    return res.status(500).json({ error: 'Server Error' });
  }  
}

const updateProfile = async (req, res) => {
  return res.status(200)
}


module.exports = {
  signUp,
  logIn,
  updateProfile
}