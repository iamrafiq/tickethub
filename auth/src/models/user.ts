import mongoose from 'mongoose';

// an interface that describe the properties
// that are requried t ocreate a new User
interface UserAttrs {
  email: string;
  password: string;
}
// an interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): any;
}

// An interface that describes the properties
//that a User document has
interface UserDoc extends mongoose.Document {
  email: string;
  passwrod: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
