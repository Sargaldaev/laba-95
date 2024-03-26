import user from './models/User';

export interface UserFields {
  username: string;
  displayName: string;
  email:string;
  googleID: string;
  avatar: string;
  password: string;
  role: string;
  token: string;
}


export interface Cocktail {
  user: user;
  name: string;
  image:string;
  recipe: string;
  isPublished?: boolean;
  ingredients: [];
}

export interface Ingredient {
  name: string;
  amount: string;
}
