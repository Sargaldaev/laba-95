export interface User {
  _id: string;
  displayName: string;
  email: string;
  googleID: string | null;
  avatar: string;
  password: string;
  role: string;
  token: string;
}

export interface PostCocktail {
  name: string;
  user: string;
  image: File | null;
  recipe: string;
  ingredients: Ingredient[];
}


export interface Rating {
  user: string
  grade: number;
}

export interface Cocktail {
  _id: string;
  user: User;
  name: string;
  image: string | null;
  recipe: string;
  isPublished: boolean;
  ingredients: Array<{
    name: string;
    quantity: string;
  }>;
  rating: Rating[];
}


export interface Ingredient {
  _id: string,
  name: string,
  amount: string
}


export interface Register {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface Login {
  email: string;
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