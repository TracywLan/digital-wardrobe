import express from 'express';
import Item from '../models/item.js'

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('wardrobe/index.ejs')
})

// GET /wardrobe - Index

// GET /wardrobe/new - New
router.get('/new', (req, res) => {
    res.render('wardrobe/new.ejs')
})

// SHOW /wardrobe


// DELETE /wardrobe/:itemId - Delete

// GET /wardrobe/:itemId

// POST /


export default router


