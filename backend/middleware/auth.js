import jwt from "jsonwebtoken";
import "dotenv/config";
// console.log(process.env.JWT_SECRET);
const authMiddleware = async (req, res, next) => {
  let token;
  const reqtoken = req.headers.authorization;
  if (reqtoken && reqtoken.startsWith("Bearer")) {
    token = reqtoken.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default authMiddleware;
