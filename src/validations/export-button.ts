import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const exportButtonSchema = Yup.object().shape({
  email: EmailSchema
});