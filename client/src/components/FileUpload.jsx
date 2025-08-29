import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function FileUpload({ onUpload }) {
  // 📁 Ref for hidden file input
  const fileInputRef = useRef(null);

  // 📦 State to hold selected file
  const [selectedFile, setSelectedFile] = useState(null);

  // 🔘 Trigger file input click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 📤 Handle file selection
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onUpload?.(file); // Optional callback to parent
    }
  };

  return (
    <div
      className="flex flex-col items-center space-y-1"
      role="group"
      aria-label="File upload section"
    >
      {/* ➕ Upload Trigger Button */}
      <button
        onClick={handleClick}
        className="ml-2 text-indigo-600 hover:text-indigo-800"
        aria-label="Upload a file"
        type="button"
      >
        <Plus />
      </button>

      {/* 🔒 Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        accept="image/*,.pdf,.docx"
        aria-hidden="true"
      />

      {/* 📄 File Preview */}
      {selectedFile && (
        <div
          className="text-sm text-gray-700 dark:text-gray-200"
          aria-label={`Selected file: ${selectedFile.name}`}
        >
          {selectedFile.name}
        </div>
      )}
    </div>
  );
}
