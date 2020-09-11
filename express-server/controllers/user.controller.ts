import { ObjectSchema, object, string, ref } from "joi";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model";

export async function insert(user: { hashedPassword: string; password: string }): Promise<IUser> {
  const userSchema: ObjectSchema = object({
    fullname: string().required(),
    email: string().email(),
    mobileNumber: string().regex(/^[1-9][0-9]{9}$/),
    password: string().required(),
    repeatPassword: string().required().valid(ref("password")),
  });

  let person = userSchema.validate(user, { abortEarly: false });  
  person.value.hashedPassword = bcrypt.hashSync(person.value.password, 10);
  delete person.value.password;
  return await new User(person.value).save();
}
