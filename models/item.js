import mongoose from "mongoose";

// const CategorySchema = new mongoose.Schema({
//   main: {
//     type: String,
//     required: true,
//     enum: ['top', 'bottom', 'shoes', 'outerwear', 'accessory']
//   },
//   subtype: {
//     type: String,
//     required: true,
//     enum: {
//       top: ['shirt', 'blouse', 'tshirt', 'sweater', 'tank', 'hoodie', 'polo'],
//       bottom: ['jeans', 'pants', 'shorts', 'skirt', 'leggings', 'chinos', 'jeggings', 'yoga'],
//       shoes: ['sneakers', 'boots', 'sandals', 'flats', 'heels', 'loafers', 'slippers', 'dress'],
//       outerwear: ['jacket', 'coat', 'vest', 'cardigan', 'blazer', 'raincoat', 'parka'],
//       accessory: ['hat', 'scarf', 'belt', 'bag', 'jewelry', 'watch', 'sunglasses', 'gloves', 'socks', 'tie']
//     }
//   }
// }, { _id: false });



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
  color: {
    type: String,
    enum: ['black', 'white', 'gray', 'blue', 'red', 'green', 'brown', 'beige', 'navy', 'pink'],
    required: true
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: false
  },
  brand: {
    type: String,
    trim: true,
    required: false
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter'],
    required: false
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