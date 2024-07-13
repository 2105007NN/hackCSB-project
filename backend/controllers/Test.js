import express from "express";
import dbPromise from "../db/db_init.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import AppError from "../errors/AppError.js";

const createTest = catchAsync(async (req, res) => {
    console.log('create test');
  const {
    questions,
    time,
    title,
    type,
    // suggestion_low,
    // suggestion_medium,
    // suggestion_high,
  } = req.body;
  console.log(questions, time, title, type);

  try {
    const db = await dbPromise;

    // Begin transaction
    await db.run("BEGIN TRANSACTION");

    // Insert into tests table
    const insertTestStmt = await db.prepare(`
            INSERT INTO tests (name, description, time, type)
            VALUES (?, ?, ?, ?)
        `);

    const testResult = await insertTestStmt.run(
      title,
      "Description",
      time,
      type
    );

    const testId = testResult.lastID;
    console.log(testId);
    for (const question of questions) {
      // Insert question into questions table
      const insertQuestionStmt = await db.prepare(`
        INSERT INTO questions (test_id, category_id, question)
        VALUES (?, ?, ?)
    `);
      const categoryId = await getCategoryID(db, question.category); // Assuming you have a function to get category ID
      const questionResult = await insertQuestionStmt.run(
        testId,
        categoryId,
        question.question
      );

      // Commit transaction
      await db.run("COMMIT");
    }
  } catch (error) {
    // Rollback transaction on error
    await db.run("ROLLBACK");
    AppError(500, 'Error creating quiz');
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "test created successfully",
    data: questionResult,
  });
});

const getTest = catchAsync(async (req, res) => {
  const db = await dbPromise;
  // const result = await db.all
  const result = await db.all('SELECT * FROM tests');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "quiz retrieved successfully",
    data: result,
  });
});

const takeTest = catchAsync(async (req, res) => {
  const db = await dbPromise;
  // const result = await db.all

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "quiz retrieved successfully",
    data: result,
  });
});

export const TestController = {
  createTest,
  getTest,
  takeTest,
};
