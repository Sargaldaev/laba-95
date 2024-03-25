import mongoose, { HydratedDocument, Model } from 'mongoose';
import { UserFields } from '../types';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export interface UserMethods extends UserFields {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (
        this: HydratedDocument<UserFields>,
        email: string,
      ): Promise<boolean> {
        if (!this.isModified('email')) return true;
        const user: HydratedDocument<UserFields> | null = await User.findOne({email});
        return !Boolean(user);
      },
      message: 'This user is already registered',
    },
  },

  password: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  googleID: String,
  displayName: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  avatar: {
    type:String,
    required:true
  },
});

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
export default User;
