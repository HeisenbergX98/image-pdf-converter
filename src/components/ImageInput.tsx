import { useState, type ChangeEvent } from "react";
import "../css/imageinput.css";

interface ImageInputProps {
  onFileSelect: (file: File | null) => void;
  fileName: string | null;
}

const ImageInput: React.FC<ImageInputProps> = ({ onFileSelect, fileName }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File | undefined) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      onFileSelect(file);
    } else {
      console.warn("Invalid file type. Please upload JPG or PNG.");
      onFileSelect(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  return (
    <div
      className={`imageinput-container ${isDragging ? "is-dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="imageinput-title">
        <h3>1.</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
        </svg>
        <h3>Carregue a imagem (JPG/PNG)</h3>
      </div>
      <div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
      </div>
      {fileName && (
        <div>
          <p>
            {" "}
            <b> Arquivo selecionado: </b>
            {fileName}
          </p>
        </div>
      )}
      {isDragging ? (
        <div className="dragging-text">
          <h1>PODE SOLTAR</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageInput;
