
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
    title: string;
}
