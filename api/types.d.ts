export interface UserFields {
  displayName: string;
  email:string;
  googleID?: string;
  avatar: string;
  password: string;
  role: string;
  token: string;
}


export interface ExistingUser extends UserFields {
  _id: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}
