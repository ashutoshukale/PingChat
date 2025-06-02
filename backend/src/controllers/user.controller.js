import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current user friends
        { isOnboarded: true },
      ],
    });
    res.status(200).json({
      message: "Recommended Users Fetched Successfully",
      recommendedUsers,
    });
  } catch (error) {
    console.error("Error in getting Recommended Users: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMyFriends = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const user = await User.findById(currentUserId)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json({
      message: "User Friends Fetched Successfully",
      friends: user.friends,
    });
  } catch (error) {
    console.error("Error in getting friends of User: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: recipientId } = req.params;
    if (userId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient Not Found" });
    }
    if (recipient.friends.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Friend Request already exists between you and this user",
      });
    }
    const friendRequest = await FriendRequest.create({
      sender: userId,
      recipient: recipientId,
    });
    res
      .status(201)
      .json({ message: "Friend Request Sent Successfully", friendRequest });
  } catch (error) {
    console.error("Error sending a friend request", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend Request Not Found" });
    }
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to send this request" });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to other's friends array;

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend Request Accepted" });
  } catch (error) {
    console.error("Error accepting the friend request: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomingRequests = await FriendRequest.find({
      recipient: userId,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic learningLanguage nativeLanguage"
    );

    const acceptedRequests = await FriendRequest.find({
      sender: userId,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({
      message: "Friend Request Fetched Successfully",
      incomingRequests,
      acceptedRequests,
    });
  } catch (error) {
    console.error("Error getting User Friend Requests: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOutgoingFriendRequests = async (req, res) => {
  try {
    const outgoingFriendRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic learningLanguage nativeLanguage"
    );
    res.status(200).json({
      message: "Outgoing Friend Requests fetched successfully",
      outgoingFriendRequests,
    });
  } catch (error) {
    console.error(
      "Error getting Outgoing User Friend Requests: ",
      error.message
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequests,
};
