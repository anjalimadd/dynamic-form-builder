
import { DynamicFormProvider } from "./context/FormContext";
import FormBuilder from "./components/FormBuilder";
import Preview from "./components/Preview";

export default function App() {
  return (
    <DynamicFormProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-6">
          <header>
            <h1 className="text-2xl font-bold">Dynamic Form Builder</h1>
            <p className="text-sm text-gray-600">Build fields, validate in real-time, and persist state.</p>
          </header>
          <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormBuilder />
            <Preview />
          </main>
        </div>
      </div>
    </DynamicFormProvider>
  );
}
