import "../css/header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#FFFFFF"
        >
          <path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
        </svg>
        <h1>Conversor de imagem para PDF</h1>
      </div>
      <div className="header-description">
        <p>
          Carregue uma imagem, selecione o modelo e baixe o arquivo PDF pronto.
        </p>
      </div>
    </div>
  );
};

export default Header;
