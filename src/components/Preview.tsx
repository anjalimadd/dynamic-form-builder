import { useFormCtx } from "../context/FormContext";

export default function Preview() {
  const { state } = useFormCtx();

  if (!state.submittedSnapshot) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 text-gray-500">
        Submit the form to see preview.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-3">Form Preview</h2>
      <div className="space-y-3">
        {state.submittedSnapshot.map((f) => (
          <div key={f.id} className="border-b pb-2">
            <p className="font-medium">{f.label}</p>
            <p className="text-sm text-gray-700">Type: {f.type}</p>
            <p className="text-sm">Value: {f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

