const testController = (req, res) => {
  res.status(200).send({
    message: "Welcome user to the Blood Bank App. "
  })
}

module.exports = {testController};