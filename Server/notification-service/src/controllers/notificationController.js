import Notification from "../models/Notification.js";

export const sendNotification = async (req, res) => {
  try {
    const { userId, recruiterId, message } = req.body;
    const notif = await Notification.create({ userId, recruiterId, message });
    res.json({ message: "Notification saved", notif });
  } catch (err) {
    res.status(500).json({ error: "Error saving notification" });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifs = await Notification.find({ userId });
    res.json({ count: notifs.length, notifs });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user notifications" });
  }
};
