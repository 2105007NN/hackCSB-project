import dbPromise from "../db/db_init.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const journalController = async(req, res) => {
    console.log(req.body);
    res.status(200).json({
        msg : "success",
        receivedData : req.body
    })

}

const moodTrackerController = async(req, res) => {
    console.log(req.body);
    res.status(200).json({
        msg : "success",
        receivedData : req.body
        
    })
    
}

export {journalController, moodTrackerController};