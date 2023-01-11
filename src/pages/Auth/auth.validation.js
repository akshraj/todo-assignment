import * as yup from "yup";

export const loginSchema = yup.object().shape({
  userId: yup.string().required("Id is required"),
  name: yup.string().required("Name is required"),
});
