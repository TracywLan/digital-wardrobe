import express from 'express';
import Item from '../models/item.js'

const router = express.Router();

// Index GET /wardrobe
router.get('/', async (req, res) => {
    try {
        const filter = { user: req.session.user._id }

        if(req.query.category && req.query.category !== 'all') {
            filter.category = req.query.category
        }

        const wardrobe = await Item.find(filter).sort({ category: 1, name: 1});

        const allItems = await Item.find({ user: req.session.user._id });
        const categories = [...new Set(allItems.map(item => item.category))].sort();
        res.render('wardrobe/index.ejs', { wardrobe, categories, selectedCategory: req.query.category || 'all' });
    } catch (error) {
        console.log(error);
        res.send('Error fetching wardrobe: ' + error.message);
    }
});

// New GET /wardrobe/new
router.get('/new', (req, res) => {
    res.render('wardrobe/new.ejs')
})

// Create POST /wardrobe
router.post('/', async(req, res) => {
    try {
        req.body.user = req.session.user._id;
        await Item.create(req.body);
        res.redirect('/wardrobe')
    } catch (error) {
        console.log(error);
        res.send('Error creating item: ' + error.message);
    }
})

// Show GET /wardrobe/:itemId
router.get('/:itemId', async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        if (!item) {
            return res.send('Item not found');
        }
        res.render('wardrobe/show.ejs', { item });
    } catch (error) {
        console.log(error);
        res.send('Error fetching item: ' + error.message);
    }
});

// Edit GET /wardrobe/:itemId/edit
router.get('/:itemId/edit', async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.render('wardrobe/edit.ejs', { item });
    } catch (error) {
        console.log(error);
        res.send('Error fetching item: ' + error.message);
    }
});

// Update PUT /wardrobe/:itemId
router.put('/:itemId', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.itemId, req.body);
        res.redirect(`/wardrobe/${req.params.itemId}`);
    } catch (error) {
        console.log(error);
        res.send('Error updating item: ' + error.message);
    }
});

// Delete DELETE /wardrobe/:itemId 
router.delete('/:itemId', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.itemId);
        res.redirect('/wardrobe');
    } catch (error) {
        console.log(error);
        res.send('Error deleting item: ' + error.message);
    }
});

export default router;