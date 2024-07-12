import express from "express"
import dbPromise from '../db/db_init.js'

const router = express.Router()

router.get('/database', async(req, res)=>{
    try {
        const db = await dbPromise
        const users = await db.all("SELECT * FROM users")
        res.json(users)
    } catch (error) {
        console.log("error ashche\n", error)
    }
})

export default router;