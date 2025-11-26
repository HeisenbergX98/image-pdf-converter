import "../css/layouttemplate.css";
import { TEMPLATES } from "../data/templates";

const LayoutTemplate = () => {
  return (
    <div className="layouttemplate-container">
      <div className="layouttemplate-title">
        <h3>2. Selecione o Modelo</h3>
      </div>
      <div className="layouttemplate-options-wrapper">
        {TEMPLATES.map((template) => {
          return (
            <label key={template.key} className="layouttemplate-options">
              <input type="radio" />
              <div>
                <h4>{template.name}</h4>
                <p>{template.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutTemplate;
