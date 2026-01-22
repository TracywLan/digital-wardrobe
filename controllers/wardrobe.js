import express from 'express';
import Item from '../models/item.js'

const router = express.Router();

// Index GET /wardrobe
router.get('/', (req, res)=>{
    res.render('wardrobe/index.ejs')
})


// New GET /wardrobe/new
router.get('/new', (req, res) => {
    res.render('wardrobe/new.ejs')
})

// Create POST /wardrobe
router.post('/', async(req, res)=>{
    try{
    req.body.user = req.session.user._id;
    await Item.create(req.body);
    res.redirect('/wardrobe')
    } catch (error) {
        console.log(error);
        res.send('Error creating item: ' + error.message);
    }
})

// Delete DELETE /wardrobe/:itemId 

// Edit GET /wardrobe/:itemId

// Update POST /wardrobe/:itemId


export default router


