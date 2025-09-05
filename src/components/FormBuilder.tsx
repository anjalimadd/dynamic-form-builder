import { useFormCtx } from "../context/FormContext";
import FieldRow from "./FieldRow";
import Toolbar from "./Toolbar";

export default function FormBuilder() {
  const { state } = useFormCtx();

  return (
    <div className="p-4 bg-gray-50 rounded-lg border shadow-md flex flex-col gap-3">
      <Toolbar />

      {state.fields.length === 0 ? (
        <p className="text-gray-500">No fields yet. Use the buttons above to add one.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {state.fields.map((field) => (
            <FieldRow key={field.id} field={field} />
          ))}
        </div>
      )}
    </div>
  );
}
