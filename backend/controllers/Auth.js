import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';
import { createToken } from '../utils/createToken.js';

const jwt_access_secret = 'e7275323e5c49c75b6a12ebe80da5d6b53f5807a8fdd9537e64bc3a1480d8c072f4d5870109b81f7a26943bcc4b0c6ec0a0825f52b83ac1281f6ebca17a2e1fe';

const jwt_access_expires_in = '1d';

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body; // Assuming these are sent in the request body
    const db = await dbPromise;

    // Check if the user exists with the given username and password
    const user = await db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (!user) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: 'Invalid username or password',
            data: null,
        });
    }

    // Create tokens and send to the client
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = createToken(
        jwtPayload,
        jwt_access_secret,
        jwt_access_expires_in,
    );

    // User authenticated successfully
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: {accessToken, user}
    });
});


const clientRegistration = catchAsync(async (req, res) => {
    const { username, email, password } = req.body; // Assuming these are sent in the request body
    const db = await dbPromise;

    // Check if the user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', username);
    if (existingUser) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: 'Username already exists',
            data: null,
        });
    }

    const role = 'client';
    // Insert the new user into the database
    const insertUserQuery = `
        INSERT INTO users (role, username, email, password, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `;
    const insertParams = [role, username, email, password];
    await db.run(insertUserQuery, insertParams);

    // Optionally, retrieve the newly inserted user data
    const newUser = await db.get('SELECT * FROM users WHERE username = ?', username);

    // Create tokens and send to the client
    const jwtPayload = {
        userId: newUser.id,
        role: newUser.role,
    };
    const accessToken = createToken(
        jwtPayload,
        jwt_access_secret,
        jwt_access_expires_in,
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Client registered successfully',
        data: {accessToken,newUser},
    });
});

const therapistRegistration = catchAsync(async (req, res) => {
    const { username, email, password } = req.body; // Assuming these are sent in the request body
    const db = await dbPromise;

    // Check if the user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', username);
    if (existingUser) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: 'Username already exists',
            data: null,
        });
    }
    const role = 'therapist';
    // Insert the new user into the database
    const insertUserQuery = `
    INSERT INTO users (role, username, email, password, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
`;
    const insertParams = [role, username, email, password];
    await db.run(insertUserQuery, insertParams);

    // Optionally, retrieve the newly inserted user data
    const newUser = await db.get('SELECT * FROM users WHERE username = ?', username);

     // Create tokens and send to the client
     const jwtPayload = {
        userId: newUser.id,
        role: newUser.role,
    };
    const accessToken = createToken(
        jwtPayload,
        jwt_access_secret,
        jwt_access_expires_in,
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Therapist registered successfully',
        data: {accessToken, newUser},
    });
});


export const AuthController = {
    login,
    clientRegistration,
    therapistRegistration
}