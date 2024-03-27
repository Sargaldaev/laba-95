export interface User {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  googleID: string;
  avatar: string;
  password: string;
  role: string;
  token: string;
}


export interface Cocktail {
  _id: string;
  user: {
    _id:string,
    role:string
  };
  name: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: [];
}

export interface CocktailFullInfo {
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}

export interface Ingredient {
  _id: string,
  name: string,
  amount: string
}


export interface Register {
  username: string;
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface Login {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}