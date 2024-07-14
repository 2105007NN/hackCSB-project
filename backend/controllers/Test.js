import express from "express";
import dbPromise from "../db/db_init.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import AppError from "../errors/AppError.js";
import httpStatus from "http-status";

const createTest = catchAsync(async (req, res) => {
    console.log("create test");
    const {
        questions,
        time,
        title,
        description,
        type,
        // suggestion_low,
        // suggestion_medium,
        // suggestion_high,
    } = req.body;
    console.log(questions, time, title, type, description);

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
        description,
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



const getSingleTest = catchAsync(async (req, res) => {
    const { testId } = req.params;
    const db = await dbPromise;
    // const result = await db.all
    const test = await db.all("SELECT * FROM tests WHERE id = ?", [testId]);

    const questions = await db.all("SELECT * FROM questions WHERE test_id = ?", [
        testId
    ]);

    const options = await db.all("SELECT * FROM options");

    //also bring in the options
    const result = {
        test,
        questions,
        options
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
    console.log("inside take test api");
    const db = await dbPromise;
    const {test_id, answers, user_id} = req.body;
    /*
     *    let Obj = {
            questionId : questionId,
            optionId : selectedOption
        }
     */

    await db.run("BEGIN TRANSACTION");
   
    try{
        const highestScoringOption = 4;
        const questionCount = answers.length;
        const maximumScore = questionCount*highestScoringOption;
        const calculatedScore = 0;

        for(const answer of answers) {
            const option_id = answer.option_id;
            const option = await db.run(`SELECT * FROM options WHERE id = ?`, [option_id]);
            calculatedScore += option.score;
        }
        console.log(calculatedScore);
        //count score out of 100
        const percentageScore = (calculatedScore/maximumScore)*100;
        
        //insert into user_category table here
        const category_id = await getCategoryID(db, question.category);
        const insertCategoryStmt = await db.prepare(`
            INSERT INTO user_category (user_id, category_id, score)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, category_id) DO UPDATE SET score = excluded.score
          `);
        await insertCategoryStmt.run(user_id, category_id, percentageScore)


        //insert answers into the database   
        for (const answer of answers) {
            const { question_id, option_id } = answer;
            const insertAnswerStmt = await db.prepare(`
            INSERT INTO user_answers (user_id, question_id, quiz_id, option_id)
            VALUES (?, ?, ?, ?)
            `);
            await insertAnswerStmt.run(user_id, question_id, test_id, option_id);
        }    


        await db.run("COMMIT");

    }catch(error) {
        await db.run("ROLLBACK");
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to insert answers');
    }
    

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "quiz retrieved successfully",
        data: null,
    });
});

const getTests = catchAsync(async (req, res)=> {
    const db = await dbPromise;
    const result = await db.all(`SELECT * FROM tests`);


    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tests retrieved successfully",
        data : result
    })
})

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
  getTests,
  takeTest,
  getOptions,
  getSingleTest
};
