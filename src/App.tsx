import { useCallback, useState } from "react";
import "./css/App.css";
import Header from "./components/Header";
import ImageInput from "./components/ImageInput";
import LayoutTemplate from "./components/LayoutTemplate";
import NumberImages from "./components/NumberImages";
import Download from "./components/Download";
import {
  PRINTABLE_HEIGHT,
  PRINTABLE_WIDTH,
  TEMPLATES,
  type Template,
  type TemplateId,
} from "./data/templates";

function App() {
  // ImageInput ----->
  const [imageFile, setImageFile] = useState<File | null>(null);

  // LayoutTemplate ----->
  const [templateId, setTemplateId] = useState<TemplateId>("full");
  const [totalImagesCount, setTotalImagesCount] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<
    "idle" | "processing" | "ready" | "error"
  >("idle");

  const selectedTemplate = TEMPLATES.find(
    (t) => t.id === templateId
  ) as Template;

  const getImagesPerPage = useCallback((id: TemplateId): number => {
    const template = TEMPLATES.find((t) => t.id === id);

    if (!template) return 0;

    const { rows, cols } = template.getDimensions(
      PRINTABLE_WIDTH,
      PRINTABLE_HEIGHT
    );
    return rows * cols;
  }, []);

  const imagesPerPageCapacity = getImagesPerPage(templateId);
  const requiredPages = Math.ceil(totalImagesCount / imagesPerPageCapacity);

  return (
    <div className="app-container">
      <Header />
      <ImageInput
        onFileSelect={(file) => {
          setImageFile(file);
          setMessage(
            file ? `Image loaded: ${file.name}` : "Invalid file selected."
          );
          setStatusType(file ? "idle" : "error");
        }}
        fileName={imageFile ? imageFile.name : null}
      />
      <div className="step-two-three-wrapper">
        <LayoutTemplate
          templates={TEMPLATES}
          selectedTemplateId={templateId}
          onSelectTemplate={setTemplateId}
          getImagesPerPage={getImagesPerPage}
        />
        <NumberImages
          totalImagesCount={totalImagesCount}
          setTotalImagesCount={setTotalImagesCount}
          imagesPerPageCapacity={imagesPerPageCapacity}
          requiredPages={requiredPages}
        />
        <Download
          imageFile={imageFile}
          selectedTemplate={selectedTemplate}
          totalImagesCount={totalImagesCount}
          status={{
            statusType,
            setStatusType,
            message,
            setMessage,
          }}
        />
      </div>
    </div>
  );
}

export default App;
