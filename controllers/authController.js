const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const registerController = async (req, res) => {
  try {
    console.log(`USer Request Data${req.body.password}`.bgYellow.white);
    const exestingUser = await userModel.findOne({email: req.body.email})
    //validation check
    if (exestingUser){
      res.status(200).send({
        success: true,
        message: 'User already exist!'
      })
    }
    //hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPassword;

    //rest data
    const user = new userModel(req.body)
    await user.save()
    return res.status(200).send({
      success: true,
      message: 'User Registered Successfully!',
      user: user
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Regsiter API',
      error
    })
  }
}


const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({email: req.body.email})
    if (!user){
      return res.status(400).send({
        success: false,
        message: 'User not found!'
      })
    }
    //compare password
    const comparePass = await bcrypt.compare(req.body.password, user.password)
    if(!comparePass){
      return res.status(500).send({
        success: false,
        message: 'Invalid Credentials!'
      })
    }

    //genrate token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    return res.status(200).send({
      success: true,
      message: 'login successfull!',
      token: token,
      user: user
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in login API',
      error
    })
  }
}

const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({_id: req.body.userId})
    return res.status(200).send({
      success: true,
      message: 'user found successfully!',
      user: user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'unable to find current user',
      error
  })
  }
}

module.exports = { registerController, loginController, currentUserController };