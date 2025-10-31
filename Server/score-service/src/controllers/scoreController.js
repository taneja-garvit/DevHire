import Score from "../models/Score.js";

export const saveScore = async (req, res) => {
  try {
    const { userId, recruiterId, testId, score, total } = req.body;
    const result = await Score.create({ userId, recruiterId, testId, score, total });
    res.json({ message: "Score saved successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Error saving score" });
  }
};

export const getScoresByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const scores = await Score.find({ recruiterId });
    res.json({ count: scores.length, scores });
  } catch (err) {
    res.status(500).json({ error: "Error fetching scores" });
  }
};

export const getScoresByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const scores = await Score.find({ userId });
    res.json({ count: scores.length, scores });
  } catch (err) {
    res.status(500).json({ error: "Error fetching scores" });
  }
};
