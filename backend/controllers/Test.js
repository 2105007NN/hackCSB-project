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

        const testResult = await insertTestStmt.run(title, description, time, type);
        const testId = testResult.lastID;

        for (const question of questions) {
            const categoryId = await getCategoryID(db, question.category); 
            
            // Insert question into questions table
            const insertQuestionStmt = await db.prepare(`
                        INSERT INTO questions (test_id, category_id, question)
                        VALUES (?, ?, ?)
                    `);

            await insertQuestionStmt.run(
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
            data: null,
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

    const result = {
        test,
        questions,
        options
    };
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Test retrieved successfully",
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
    const { test_id, answers, user_id } = req.body;
    /*
        let Obj = {
            questionId : questionId,
            optionId : selectedOption
        }
    */
    const highestScoringOption = 4;
    const questionCount = answers.length;
    const maximumScore = questionCount * highestScoringOption;
    let calculatedScore = 0;

    try {
        // Calculate the total score
        for (const answer of answers) {
            const { option_id } = answer;
            const option = await db.get(`SELECT * FROM options WHERE id = ?`, [option_id]);
            calculatedScore += option.score;
        }
        console.log('test_Id', test_id, 'user+id',  user_id );

        // Count score out of 100
        const percentageScore = Math.floor((calculatedScore / maximumScore) * 100);
        const question_id = answers[0].question_id;
        // console.log('question_id', answers[0].question_id);

        // Get category Id
        const question = await db.get(`SELECT * FROM questions WHERE id = ?`, [question_id]);
        const category_id = question.category_id;
        // console.log(user_id, category_id, percentageScore);

        // Assuming all questions belong to the same category
        const insertCategoryStmt = await db.prepare(`
            INSERT INTO user_category (user_id, category_id, score)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, category_id) DO UPDATE SET score = excluded.score
        `);
        await insertCategoryStmt.run(user_id, category_id, percentageScore);

        // Insert answers into the database
        for (const answer of answers) {
            const { question_id, option_id } = answer;
            const insertAnswerStmt = await db.prepare(`
                INSERT OR REPLACE INTO user_answers (user_id, question_id, test_id, option_id)
                VALUES (?, ?, ?, ?)
            `);
            await insertAnswerStmt.run(user_id, question_id, test_id, option_id);
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Answerts submitted successfully",
            data: null,
        });

    } catch (error) {
        console.error(error);
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to submit answers');
    }
});

const takeCompulsoryTest = catchAsync(async (req, res) => {
    console.log('inside compulsory test api');
    const db = await dbPromise;
    const { test_id, answers, user_id } = req.body;
    const highestScoringOption = 4;
    const categories = {}; // To store scores for each category

    try {
        // Calculate scores per category
        for (const answer of answers) {
            const { question_id, option_id } = answer;
            const option = await db.get(`SELECT * FROM options WHERE id = ?`, [option_id]);
            const question = await db.get(`SELECT * FROM questions WHERE id = ?`, [question_id]);
            const category_id = question.category_id;

            if (!categories[category_id]) {
                categories[category_id] = {
                    totalScore: 0,
                    questionCount: 0,
                };
            }

            categories[category_id].totalScore += option.score;
            categories[category_id].questionCount++;
        }
        console.log(categories);
        // Calculate percentage score and insert/update user_category table
        for (const category_id in categories) {
            if (categories.hasOwnProperty(category_id)) {
                const { totalScore, questionCount } = categories[category_id];
                const maximumScore = questionCount * highestScoringOption;
                const percentageScore = Math.floor((totalScore / maximumScore) * 100);

                // Insert or update user_category
                const insertCategoryStmt = await db.prepare(`
                    INSERT INTO user_category (user_id, category_id, score)
                    VALUES (?, ?, ?)
                    ON CONFLICT(user_id, category_id) DO UPDATE SET score = excluded.score
                `);
                await insertCategoryStmt.run(user_id, category_id, percentageScore);
            }
        }

        // Insert answers into the database
        for (const answer of answers) {
            const { question_id, option_id } = answer;
            const insertAnswerStmt = await db.prepare(`
                INSERT OR REPLACE INTO user_answers (user_id, question_id, test_id, option_id)
                VALUES (?, ?, ?, ?)
            `);
            await insertAnswerStmt.run(user_id, question_id, test_id, option_id);
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Answers submitted successfully",
            data: null,
        });

    } catch (error) {
        console.error(error);
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to submit answers');
    }
});


const getTests = catchAsync(async (req, res)=> {
    const db = await dbPromise;
    const result = await db.all(`SELECT * FROM tests WHERE type != 'compulsory'`);

    console.log(result);
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

const getResult = catchAsync(async(req,res)=> {
    const db = await dbPromise;
    const {userId, testId} = req.params;
    const test = await db.get('SELECT * FROM tests WHERE id = ?', [testId]);
    console.log(test);
    const categoryId = await getCategoryID(db, test.type);

    console.log('userId ', userId, 'categoryId :' , categoryId, 'testId' , testId);
    const result = await db.all(`
        SELECT t.*, q.*, o.name AS user_answer
        FROM tests t 
        LEFT JOIN questions q ON q.test_id = t.id
        LEFT JOIN user_answers ua ON ua.question_id = q.id 
        LEFT JOIN options o ON o.id = ua.option_id
        WHERE t.id = ? AND ua.user_id = ?`, [testId, userId]);

    const scoreResult = await db.get(`
        SELECT uc.score 
        FROM user_category uc
        WHERE uc.user_id = ? and uc.category_id = ?    
    `, [userId, categoryId]);

    console.log('score', scoreResult);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Results for this test are retrieved successfully",
        data: {
            result,
            score: scoreResult ? scoreResult.score : null
        }
    });
});



const getAnswers = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM user_answers");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "user_answers retrieved successfully",
        data: result,
    });
})


export const TestController = {
  createTest,
  getTests,
  takeTest,
  getOptions,
  getSingleTest,
  getResult,
  getAnswers,
  takeCompulsoryTest
};
