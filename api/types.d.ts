import mongoose, { Schema } from 'mongoose';
import Types = module;

export interface UserFields {
  displayName: string;
  email: string;
  googleID?: string;
  avatar: string;
  password: string;
  role: string;
  token: string;
}

export interface ExistingUser extends UserFields {
  _id: string;
}

export interface Rating {
  user: Types.ObjectId;
  grade: number;
}

export interface Cocktail {
  user: Types.ObjectId;
  name: string;
  image: string | null;
  recipe: string;
  isPublished?: boolean;
  ingredients: Array<{
    name: string;
    quantity: string;
  }>;
  rating: Rating[];
}
