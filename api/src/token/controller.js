const checkToken = (req, res) => {
  res.status(200).json(true);
};

export default {
  checkToken,
};
