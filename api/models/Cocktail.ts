import mongoose from 'mongoose';
import User from './User';
import { Ingredient } from '../types';


const Schema = mongoose.Schema;


const CocktailSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist',
    },
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  isPublished: {
    type: Boolean,
    default: false
  },

  recipe: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [],
    validate: {
      validator: (arr: Ingredient[]) => arr.length,
      message: "Ingredients array can't be empty",
    }
  },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;
