

import { useFormCtx } from "../context/FormContext";
export default function Toolbar() {
  const { dispatch } = useFormCtx();

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => dispatch({ type: "add", payload: { type: "text" } })}
        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Text
      </button>
      <button
        onClick={() => dispatch({ type: "add", payload: { type: "email" } })}
        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Add Email
      </button>
      <button
        onClick={() => dispatch({ type: "add", payload: { type: "number" } })}
        className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        Add Number
      </button>

      <button
        onClick={() => dispatch({ type: "submit" })}
        className="ml-auto px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Submit
      </button>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
}
