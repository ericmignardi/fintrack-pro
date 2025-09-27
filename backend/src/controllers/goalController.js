import * as goalService from "../services/goalService.js";

const getUserId = (req) => {
  const user = req.user;
  if (!user || !("id" in user)) return null;
  return user.id;
};

export const findAllGoals = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  try {
    const goals = await goalService.findAllGoals(userId);
    res.status(200).json({
      message: "Goals retrieved successfully.",
      goals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve goals." });
  }
};

export const findById = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: "Goal ID is required." });

  try {
    const goal = await goalService.findById(userId, id);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found." });
    }
    res.status(200).json({
      message: "Goal retrieved successfully.",
      goal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve goal." });
  }
};

export const createGoal = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const {
    title,
    description,
    targetAmount,
    currentAmount = 0,
    targetDate,
    status = "ACTIVE",
  } = req.body;

  try {
    const newGoal = await goalService.createGoal(userId, {
      title,
      description,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      targetDate: new Date(targetDate),
      status,
    });
    res
      .status(201)
      .json({ message: "Goal created successfully.", goal: newGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create goal." });
  }
};

export const updateGoal = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const goalId = parseInt(req.params.id);
  if (!goalId) return res.status(400).json({ error: "Goal ID is required." });

  const {
    title,
    description,
    targetAmount,
    currentAmount,
    targetDate,
    status,
  } = req.body;

  try {
    const updatedGoal = await goalService.updateGoal(userId, goalId, {
      title,
      description,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      targetDate: new Date(targetDate),
      status,
    });
    if (!updatedGoal) {
      return res.status(404).json({ error: "Goal not found." });
    }
    res
      .status(200)
      .json({ message: "Goal updated successfully.", goal: updatedGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update goal." });
  }
};

export const deleteGoal = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const goalId = parseInt(req.params.id);
  if (!goalId) return res.status(400).json({ error: "Goal ID is required." });

  try {
    const deletedGoal = await goalService.deleteGoal(userId, goalId);
    if (!deletedGoal) {
      return res.status(404).json({ error: "Goal not found." });
    }
    res.status(200).json({ message: "Goal deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete goal." });
  }
};
