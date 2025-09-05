import { z } from "zod";
export type FieldType = "text" | "email" | "number";

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  value: string;
  error?: string | null;
}

export interface FormState {
  fields: Field[];
  submittedSnapshot: Field[] | null;
}


const LS_KEY = "dynamic-form-state-v1";

const StateSchema = z.object({
  fields: z.array(
    z.object({
      id: z.string(),
      type: z.union([z.literal("text"), z.literal("email"), z.literal("number")]),
      label: z.string(),
      value: z.string(),
      error: z.string().nullable().optional(),
    })
  ),
  submittedSnapshot: z
    .array(
      z.object({
        id: z.string(),
        type: z.union([z.literal("text"), z.literal("email"), z.literal("number")]),
        label: z.string(),
        value: z.string(),
        error: z.string().nullable().optional(),
      })
    )
    .nullable(),
});

export function loadState(): FormState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { fields: [], submittedSnapshot: null };
    const parsed = JSON.parse(raw);
    return StateSchema.parse(parsed);
  } catch {
    return { fields: [], submittedSnapshot: null };
  }
}

export function saveState(state: FormState) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
