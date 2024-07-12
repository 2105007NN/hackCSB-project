import express from 'express'
import dbPromise from '../db/db_init';
const router = express.Router();

router.get('/', async (req,res)=> {
    try {
        const db = await dbPromise;
        console.log(dbPromise);
        const users = await db.all("SELECT * FROM users")
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
})

// app.get('/users', async(req, res)=>{
    // try {
    //     const db = await dbPromise
    //     const users = await db.all("SELECT * FROM users")
    //     res.json(users)
    // } catch (error) {
    //     console.log(error)
    // }
// })



export const UserRouter = router;