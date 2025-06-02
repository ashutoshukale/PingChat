import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res
        .status(401)
        .json({ message: "Unauthorized Request - No Token Provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized Request - Invalid Token" });
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized Request - User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute Middleware", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { protectRoute };
