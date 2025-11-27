import "../css/numberimages.css";

interface NumberImagesProps {
  totalImagesCount: number;
  setTotalImagesCount: (count: number) => void;
  imagesPerPageCapacity: number;
  requiredPages: number;
}

const NumberImages: React.FC<NumberImagesProps> = ({
  totalImagesCount,
  setTotalImagesCount,
  imagesPerPageCapacity,
  requiredPages,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setTotalImagesCount(Math.max(1, isNaN(val) ? 1 : val));
  };
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
        <input
          id="totalImagesCount"
          type="number"
          value={totalImagesCount}
          min={1}
          max={1000}
          onChange={handleChange}
        />
      </div>
      <div className="numberimages-result">
        <p>
          <b>RESULTADO:</b> No modelo selecionado caberá{" "}
          <b>{imagesPerPageCapacity}</b>{" "}
          {imagesPerPageCapacity > 1 ? "imagens" : "imagem"} por página. Isso
          irá gerar um arquivo PDF com <b>{totalImagesCount}</b>{" "}
          {totalImagesCount > 1 ? "imagens" : "imagem"} em{" "}
          <b>{requiredPages}</b> {requiredPages > 1 ? "páginas" : "página"}.
        </p>
      </div>
    </div>
  );
};

export default NumberImages;
