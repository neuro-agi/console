import { z } from "zod";

const ValidationType = z.enum(
  ["phone", "email", "string", "number", "date", "boolean", "url", "zip_code"],
  {
    errorMap: () => ({ message: "Please select a valid field type." }),
  }
);
