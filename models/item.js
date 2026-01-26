import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  imageUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },

  category: { 
    type: String, 
    enum: ['top', 'bottom', 'shoes', 'outerwear', 'accessory'],
    required: true
  },
  subtype: {
    type: String, 
    enum: [
        'tshirt', 'shirt', 'sweater', 'hoodie', 'tank', 'polo', // Tops
        'jeans', 'pants', 'shorts', 'skirt', 'leggings',        // Bottoms
        'sneakers', 'boots', 'sandals', 'heels', 'flats', 'loafers', // Shoes
        'jacket', 'coat', 'blazer', 'cardigan', 'vest',         // Outerwear
        'bag', 'hat', 'scarf', 'belt', 'jewelry', 'sunglasses'  // Accessories
    ],
    required: true
  },

  color: {
    type: String,
    enum: [
        'black', 'white', 'gray', 'blue', 'red', 'green', 
        'brown', 'beige', 'navy', 'pink', 'purple', 'yellow', 
        'orange', 'pattern', 'print', 'multi'
    ],
    required: true
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', ''],
    required: false,
    default:'',
  },
  brand: {
    type: String,
    trim: true,
    required: false
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'all'],
    required: false,
    default:'all'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500,
    required: false
  }
}, {
  timestamps: true
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;