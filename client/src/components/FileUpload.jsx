// components/PlusFileUpload.jsx
import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';

export default function FileUpload({ onUpload }) {
     // File Upload Code
     const fileInputRef = useRef(null);
     const [selectedFile, setSelectedFile] = useState(null);

     const handleClick = () => {
          fileInputRef.current?.click();
     };

     const handleChange = (e) => {
          const file = e.target.files[0];
          if (file) {
               setSelectedFile(file);
               onUpload?.(file); // Optional callback
          }
     };

     return (
          <div className="flex flex-col items-center space-y-1">
               {/* Plus Button */}
               <button
                    onClick={handleClick}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                    aria-label="Upload File"
               >
                    <Plus />
               </button>

               {/* Hidden File Input */}
               <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*, .pdf, .docx"
               />

               {/* File Preview */}
               {selectedFile && (
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                         {selectedFile.name}
                    </div>
               )}
          </div>
     );
}