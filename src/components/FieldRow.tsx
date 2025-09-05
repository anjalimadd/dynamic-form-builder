
import { useFormCtx } from "../context/FormContext";
type FieldType = "text" | "email" | "number";

interface Field {
  id: string;
  type: FieldType;
  label: string;
  value: string;
  error?: string | null;
}
interface Props {
  field: Field;
}

export default function FieldRow({ field }: Props) {
  const { dispatch } = useFormCtx();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border p-3 rounded-lg bg-white shadow-sm">
  
      <input
         type="text"
        value={field.label}
        placeholder="Label"
        onChange={(e) =>
          dispatch({
            type: "update",
            payload: { id: field.id, patch: { label: e.target.value } },
          })
        }
         onBlur={() =>
    dispatch({
      type: "update",
      payload: { id: field.id, patch: { error: validateField(field) } },
    })
  }
  className={`w-full sm:flex-1 px-2 py-1 border rounded-md ${
    field.error ? "border-red-500" : "border-gray-300"
  }`}
/>
   
      <select
        value={field.type}
        onChange={(e) =>
          dispatch({
            type: "update",
            payload: { id: field.id, patch: { type: e.target.value as Field["type"] } },
          })
        }
        className="w-full sm:w-1/4 px-2 py-1 border rounded-md"
      >
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
      </select>

      {/* Value input */}
     <input
  type={field.type} 
  value={field.value}
  placeholder="Enter value"
  onChange={(e) =>
    dispatch({
      type: "update",
      payload: { id: field.id, patch: { value: e.target.value } },
    })
  }
  className={`w-full sm:flex-1 px-2 py-1 border rounded-md ${
    field.error ? "border-red-500" : "border-gray-300"
  }`}
/>


      {/* Remove button */}
      <button
        onClick={() => dispatch({ type: "remove", payload: { id: field.id } })}
        className="px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500"
      >
        ✕
      </button>

      {/* Error message */}
      {field.error && <p className="text-sm text-red-600">{field.error}</p>}
    </div>
  );
}
