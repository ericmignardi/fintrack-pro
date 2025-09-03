import * as budgetService from "../services/budgetService.js";

const getUserId = (req) => {
  const user = req.user;
  if (!user || !("id" in user)) return null;
  return user.id;
};

export const findAllBudgets = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  try {
    const budgets = await budgetService.findAllBudgets(userId);
    res.status(200).json({ message: "Budgets received successfully", budgets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve budgets." });
  }
};

export const findBudgetById = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const budgetId = parseInt(req.params.id);
  if (!budgetId)
    return res.status(400).json({ error: "Budget ID is required." });

  try {
    const budget = await budgetService.findBudgetById(userId, budgetId);
    if (!budget) return res.status(404).json({ error: "Budget not found." });
    res.status(200).json({ message: "Budget retrieved successfully", budget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve budget." });
  }
};

export const createBudget = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const { categoryId, name, budgetAmount, period, startDate, endDate } =
    req.body;
  if (
    !categoryId ||
    !name ||
    !budgetAmount ||
    !period ||
    !startDate ||
    !endDate
  )
    return res.status(400).json({ error: "All fields are required." });

  try {
    const newBudget = await budgetService.createBudget(userId, {
      categoryId: parseInt(categoryId),
      name,
      budgetAmount: parseFloat(budgetAmount),
      period,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    res
      .status(201)
      .json({ message: "Budget created successfully", budget: newBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create budget." });
  }
};

export const updateBudget = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const budgetId = parseInt(req.params.id);
  if (!budgetId)
    return res.status(400).json({ error: "Budget ID is required." });

  const { categoryId, name, budgetAmount, period, startDate, endDate } =
    req.body;
  if (
    !categoryId ||
    !name ||
    !budgetAmount ||
    !period ||
    !startDate ||
    !endDate
  )
    return res.status(400).json({ error: "All fields are required." });

  try {
    const updatedBudget = await budgetService.updateBudget(userId, budgetId, {
      categoryId: parseInt(categoryId),
      name,
      budgetAmount: parseFloat(budgetAmount),
      period,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    if (!updatedBudget)
      return res.status(404).json({ error: "Budget not found." });
    res
      .status(200)
      .json({ message: "Budget updated successfully", budget: updatedBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update budget." });
  }
};

export const deleteBudget = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const budgetId = parseInt(req.params.id);
  if (!budgetId)
    return res.status(400).json({ error: "Budget ID is required." });

  try {
    const deletedBudget = await budgetService.deleteBudget(userId, budgetId);
    if (!deletedBudget)
      return res.status(404).json({ error: "Budget not found." });
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete budget." });
  }
};

// enum BudgetPeriod {
//   WEEKLY
//   MONTHLY
//   YEARLY
// }

// model Budget {
//   id           Int          @id @default(autoincrement())
//   userId       Int          @map("user_id")
//   categoryId   Int          @map("category_id")
//   name         String
//   budgetAmount Decimal      @map("budget_amount") @db.Decimal(10, 2)
//   period       BudgetPeriod @default(MONTHLY)
//   startDate    DateTime     @map("start_date") @db.Date
//   endDate      DateTime     @map("end_date") @db.Date
//   createdAt    DateTime     @default(now()) @map("created_at")

//   // Relations
//   user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

//   @@map("budgets")
// }
