import jwt from "jsonwebtoken";

const authUser = async (req, res) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized to access cart. Login",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
