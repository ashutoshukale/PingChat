import { generateStreamToken } from "../lib/Stream.js";

const getStreamToken = async (req, res) => {
  try {
    const token = await generateStreamToken(req.user.id);
    res
      .status(200)
      .json({ message: "Stream Token Generated Successfully", token });
  } catch (error) {
    console.error("Error Getting Stream Token", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getStreamToken };
