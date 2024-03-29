import mongoose from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist!',
    },
  },
  grade: {
    type: Number,
    required: true,
    min: [0, 'Min grade - 0'],
    max: [5, 'Max grade - 5'],
  },
});

const CocktailSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: Array<{ name: string; quantity: string }>,
    required: true,
  },
  rating: {
    type: [ratingSchema],
    default: [],
  },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;
