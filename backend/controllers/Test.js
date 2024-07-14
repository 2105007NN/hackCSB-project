import express from "express";
import dbPromise from "../db/db_init.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import AppError from "../errors/AppError.js";

const createTest = catchAsync(async (req, res) => {
  console.log("create test");
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

  let db;
  try {
    db = await dbPromise;

    // Begin transaction
    await db.run("BEGIN TRANSACTION");

    // Insert into tests table
    const insertTestStmt = await db.prepare(`
            INSERT INTO tests (title, description, time, type)
            VALUES (?, ?, ?, ?)
        `);

    const testResult = await insertTestStmt.run(
      title,
      "Description",
      time,
      type
    );
    console.log(testResult);
    const testId = testResult.lastID;
    console.log(testId);

    for (const question of questions) {
      // Insert question into questions table
      const insertQuestionStmt = await db.prepare(`
                INSERT INTO questions (test_id, category_id, question)
                VALUES (?, ?, ?)
            `);
      const categoryId = await getCategoryID(db, question.category); // Assuming you have a function to get category ID
      console.log(categoryId);
      const questionResult = await insertQuestionStmt.run(
        testId,
        categoryId,
        question.question
      );
    }

    // Commit transaction
    await db.run("COMMIT");

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Test created successfully",
      data: null, // Modify as per your response requirements
    });
  } catch (error) {
    console.log(error);
    if (db) {
      await db.run("ROLLBACK");
    }
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error creating test",
      data: null,
    });
  }
});

const getTest = catchAsync(async (req, res) => {
  const { testId } = req.params;
  const db = await dbPromise;
  // const result = await db.all
  const test = await db.all("SELECT * FROM tests WHERE id = ?", [testId]);

  const questions = await db.all("SELECT * FROM questions WHERE test_id = ?", [
    testId
  ]);

  //check if test.id matches test_id and bring in the questions
  //also bring in the options
   const result = {
    test,
    questions,
  };
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "test retrieved successfully",
    data: result,
  });
});

const getOptions = catchAsync(async (req, res) => {
  const db = await dbPromise;
  const result = await db.all("SELECT * from options");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "options retrieved successfully",
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

// Function to get category ID based on category name
const getCategoryID = async (db, categoryName) => {
  const stmt = await db.prepare(
    `SELECT id FROM categories WHERE category_name = ?`
  );
  const result = await stmt.get(categoryName);
  return result.id;
};

export const TestController = {
  createTest,
  getTest,
  takeTest,
  getOptions,
};
