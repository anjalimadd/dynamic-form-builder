import { z } from "zod";

export type FieldType = "text" | "email" | "number";

export interface Field {
  id: string;
  type: FieldType;
  value: string;
}

const FIELD_SCHEMAS: Record<FieldType, z.ZodType<string>> = {
  text: z.string().trim().min(1, "Text is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  number: z
    .string()
    .trim()
    .min(1, "Number is required")
    .refine((s) => !Number.isNaN(Number(s)), "Enter a valid number")
    .refine((s) => Number(s) > 0, "Number must be greater than 0"),
};

export function validateField(field: Field): string | null {
  const schema = FIELD_SCHEMAS[field.type];
  const res = schema.safeParse(field.value);
  return res.success ? null : res.error.issues[0]?.message || "Invalid value";
}

export function validateAll(fields: Field[]): { valid: boolean; withErrors: Field[] } {
  const withErrors = fields.map((f) => ({ ...f, error: validateField(f) }));
  const valid = withErrors.every((f) => !f.error);
  return { valid, withErrors };
}
