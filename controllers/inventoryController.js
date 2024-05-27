const inventoryModel = require("../models/inventoryModel")
const userModel = require("../models/userModel")

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body
    //validation
    const user = await userModel.findOne({email})

    if(!user){
      return  new Error('User Not found!')
    }
    if(inventoryType=== 'in' && user.role !== 'donor'){
      return  new Error('You are not able to do it!')
    }
    if(inventoryType === 'out' && user.role !== 'hospitak'){
      return  new Error('You are not able to do it!')
    }
    //save inventory record
    const inventory = new inventoryModel(req.body)
    await inventory.save()
    return res.status(201).send({
      success: true,
      message: 'New Blood Record Added',
      inventory
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Create Inventory API',
      error
    })
  }
}

const allInventoriesController = async (req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findOne({email})
    console.log(`User is here ${user}`)
    if (!user)
      throw new Error('User not found!')
    const inventories = await inventoryModel.find()
    return res.status(200).send({
      success: true,
      inventories
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Inventories API',
      error: error.message
    })
  }
}

module.exports = { createInventoryController, allInventoriesController }