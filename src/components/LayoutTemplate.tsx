import "../css/layouttemplate.css";
import { type Template, type TemplateId } from "../data/templates";

interface LayoutTemplateProps {
  templates: Template[];
  selectedTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  getImagesPerPage: (templateId: TemplateId) => number;
}

const LayoutTemplate: React.FC<LayoutTemplateProps> = ({
  templates,
  selectedTemplateId,
  onSelectTemplate,
  getImagesPerPage,
}) => {
  return (
    <div className="layouttemplate-container">
      <div className="layouttemplate-title">
        <h3>2. Selecione o Modelo</h3>
      </div>
      <div className="layouttemplate-options-wrapper">
        {templates.map((t) => {
          const actualImagesPerPage = getImagesPerPage(t.id);
          return (
            <label key={t.key} className="layouttemplate-options">
              <input
                type="radio"
                name="template"
                value={t.id}
                checked={selectedTemplateId === t.id}
                onChange={() => onSelectTemplate(t.id)}
              />
              <div>
                <h4>{t.name}</h4>
                <p>
                  Cabe até {actualImagesPerPage}{" "}
                  {actualImagesPerPage > 1 ? "imagens" : "imagem"} por página.{" "}
                  {t.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutTemplate;
