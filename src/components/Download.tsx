import jsPDF from "jspdf";
import "../css/download.css";
import {
  type Template,
  PRINTABLE_WIDTH,
  PRINTABLE_HEIGHT,
  PAGE_MARGIN,
  GUTTER,
} from "../data/templates";

interface DownloadProps {
  imageFile: File | null;
  selectedTemplate: Template;
  totalImagesCount: number;
  status: {
    statusType: "idle" | "processing" | "ready" | "error";
    setStatusType: (type: "idle" | "processing" | "ready" | "error") => void;
    message: string;
    setMessage: (msg: string) => void;
  };
}

const Download: React.FC<DownloadProps> = ({
  imageFile,
  selectedTemplate,
  totalImagesCount,
  status,
}) => {
  const { statusType, setStatusType, setMessage } = status;

  const handleGenerate = async () => {
    if (!imageFile) return;

    setStatusType("processing");
    setMessage("Processando imagem e gerando PDF...");

    try {
      const imgElement = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        imgElement.src = e.target?.result as string;

        imgElement.onload = () => {
          const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          });

          const {
            w: imgW,
            h: imgH,
            rows: maxRows,
            cols: maxCols,
          } = selectedTemplate.getDimensions(PRINTABLE_WIDTH, PRINTABLE_HEIGHT);
          const currentTemplateCols = maxCols;
          const currentTemplateRows = maxRows;
          const imagesPerPage = currentTemplateCols * currentTemplateRows;

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            setStatusType("error");
            setMessage("Falha ao criar canvas");
            return;
          }

          canvas.width = imgElement.naturalWidth;
          canvas.height = imgElement.naturalHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

          const imgData = canvas.toDataURL("image/jpeg", 0.9);

          let imagesPlaced = 0;

          while (imagesPlaced < totalImagesCount) {
            if (imagesPlaced > 0 && imagesPlaced % imagesPerPage === 0) {
              doc.addPage();
            }

            const indexOnPage = imagesPlaced % imagesPerPage;
            const row = Math.floor(indexOnPage / currentTemplateCols);
            const col = indexOnPage % currentTemplateCols;

            let xOffset = 0;
            let yOffset = 0;

            if (
              selectedTemplate.id === "full" ||
              selectedTemplate.id === "half"
            ) {
              const spacing = selectedTemplate.id === "half" ? GUTTER : 0;

              xOffset = PAGE_MARGIN + (PRINTABLE_WIDTH - imgW) / 2;

              if (selectedTemplate.id === "full") {
                yOffset = PAGE_MARGIN + (PRINTABLE_HEIGHT - imgH) / 2;
              } else {
                yOffset = PAGE_MARGIN + row * imgH + row * spacing;
              }
            } else {
              xOffset = PAGE_MARGIN + col * (imgW + GUTTER);
              yOffset = PAGE_MARGIN + row * (imgH + GUTTER);
            }

            doc.addImage(imgData, "JPEG", xOffset, yOffset, imgW, imgH);
            imagesPlaced++;
          }

          doc.save(`ImageDoc_${selectedTemplate.id}_${Date.now()}.pdf`);

          setStatusType("ready");
          setMessage("Sucesso! Seu PDF foi baixado");
        };
      };
      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error(error);
      setStatusType("error");
      setMessage("Ocorreu um error enquanto gerava o PDF.");
    }
  };
  return (
    <div className="download-container">
      <div className="download-button">
        <button
          disabled={!imageFile || statusType === "processing"}
          onClick={handleGenerate}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
          DOWNLOAD
        </button>
      </div>
      <div className="download-message">
        <p>RESULTADO</p>
      </div>
    </div>
  );
};

export default Download;
