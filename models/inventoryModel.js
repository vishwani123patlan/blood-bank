const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const inventorySchema = new mongoose.Schema({
  inventoryType: {
    type:String,
    required: [true, 'invetory is required'],
    enum: ['in', 'out']
  },
  bloodGroup: {
    type: String,
    required: [true, 'blood group is required'],
    enum: ['O+', "A+", 'O-', "AB+", "AB-", "A-", "B+", "B-"],
  },
  quantity:{
    type:Number,
    required: [true, 'blood quantity required']
  },
  organisation:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organisations',
    required: [true, 'organisation is required']
  },
  hospital:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: function(){
      return this.inventoryType === 'out'
    }
  },
  donor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: function(){
      return this.inventoryType === 'in'
    }
  }
}, {timestamps: true})

module.exports = mongoose.model('Inventory', inventorySchema)