import { Language } from "@prisma/client";

export interface ILanguage {
  id: number;
  language: string;
  personalDataId: number;
  createdAt: string;
}

export type TypeLanguageData = Omit<ILanguage, "id" | "createdAt">;
export type PartialLanguageData = Partial<Language>;
