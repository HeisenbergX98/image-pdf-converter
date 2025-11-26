import "../css/numberimages.css";

const NumberImages = () => {
  return (
    <div className="numberimages-container">
      <div className="numberimages-title">
        <h3>3. Número total de imagens</h3>
        <p>
          Especifique o número total de imagens que você deseja no documento
          PDF.
        </p>
      </div>
      <div className="numberimages-input">
        <label htmlFor="totalImagesCount">Quatidade de Imagens:</label>
        <input id="totalImagesCount" type="number" />
      </div>
      <div className="numberimages-result">
        <p>
          <i>RESULTADO:</i> O modelo <b>MODELO</b> cabe <b>IMAGEM</b> por
          página. Isso irá gerar <b>QUANTIDADE DE IMAGENS</b> em{" "}
          <b>QUANTIDADE DE PAGINAS</b>.
        </p>
      </div>
    </div>
  );
};

export default NumberImages;
