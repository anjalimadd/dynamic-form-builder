import React, { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import { validateField, validateAll } from "../utils/validation";
import { loadState, saveState } from "../utils/storage";


export type FieldType = "text" | "email" | "number";

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  value: string;
  error: string | null;
}

export interface FormState {
  fields: Field[];
  submittedSnapshot: Field[] | null;
}
// ------------------------------------------------------------

type Action =
  | { type: "add"; payload: { type: FieldType; label?: string } }
  | { type: "remove"; payload: { id: string } }
  | { type: "update"; payload: { id: string; patch: Partial<Pick<Field, "label" | "value" | "type">> } }
  | { type: "setAll"; payload: { fields: Field[] } }
  | { type: "submit" }
  | { type: "reset" };

const FormContext = createContext<{ state: FormState; dispatch: React.Dispatch<Action> } | null>(null);

function id(): string {
  return Math.random().toString(36).slice(2, 10);
}

function defaultLabel(type: FieldType, index: number) {
  return `${type.charAt(0).toUpperCase() + type.slice(1)} ${index}`;
}

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "add": {
      const f: Field = {
        id: id(),
        type: action.payload.type,
        label: action.payload.label ?? defaultLabel(action.payload.type, state.fields.length + 1),
        value: "",
        error: null,
      };
      return { ...state, fields: [...state.fields, f] };
    }
    case "remove": {
      return { ...state, fields: state.fields.filter((f) => f.id !== action.payload.id) };
    }
  case "update": {
  const fields = state.fields.map((f) => {
    if (f.id !== action.payload.id) return f;
    const updated = { ...f, ...action.payload.patch };

    return updated;
  });
  return { ...state, fields };
}


    case "setAll": {
      return { ...state, fields: action.payload.fields };
    }
  
    case "submit": {
  const { withErrors, valid } = validateAll(state.fields);
  return { fields: withErrors, submittedSnapshot: valid ? withErrors : null };
}
    case "reset": {
      return { fields: [], submittedSnapshot: null };
    }
    default:
      return state;
  }
}

export function DynamicFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined as unknown as FormState, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormCtx() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormCtx must be used within DynamicFormProvider");
  return ctx;
}
