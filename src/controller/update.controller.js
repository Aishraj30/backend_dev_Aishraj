const  User = require('../models/user.model')

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const updated = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log(data)
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updated
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
}


module.exports =  updateUser