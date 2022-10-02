import { IPersonalData } from "./../types/PersonalDataTypes";
import joi from "joi";

export const registerSchema = joi.object<IPersonalData>({
  email: joi.string().email().required().label("Digite um email válido"),
  title: joi.string().required().label("Digite um titulo"),
  firstName: joi.string().required().label("Digite um nome"),
  lastName: joi.string().required().label("digite um sobrenome"),
  imageUser: joi.string().required().label("Formato da imagem incorreto"),
  numberPhone: joi.string().required().label("Número incorreto"),
  postalCode: joi.string().required().label("Código Postal incorreto"),
  city: joi.string().required(),
  birthday: joi.string().required().label("formato da data incorreto"),
  typeDriverLicense: joi
    .string()
    .valid("A", "B", "AB", "C", "D", "E")
    .required(),
  linkedin: joi.string().required(),
  userId: joi.number().required(),
});
