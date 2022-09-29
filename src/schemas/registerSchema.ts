import { IUser } from "../types/UserTypes";
import joi from "joi";

export const registerSchema = joi.object<IUser>({
  email: joi.string().email().required().label("Digite um email válido"),
  password: joi.string().min(1).required().label("Digite uma senha válida"),
  passwordConfirm: joi
    .string()
    .min(1)
    .required()
    .label("Digite uma senha válida"),
});
