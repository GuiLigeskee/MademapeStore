import "./EditPage.css";

const EditPage = () => {
  // handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="edit-page">
      <h2 id="titulo">Editar Página</h2>
      <form /*onSubmit={handleSubmit}*/>
        <label htmlFor="text-color" id="text-color">
          <span>Escolher cor do nome da página</span>
          <input type="color" name="text-color" id="text-color" />
        </label>
        <br />
        <label htmlFor="background-image" id="button-background">
          <span>Carregue um plano de fundo para seu card</span>
          <input type="file" name="background-image" id="background-image" />
        </label>
        <input type="submit" value="Salvar" />
      </form>
      <h2 id="titulo">Adicionar botões</h2>
      <form /*onSubmit={handleButton}*/>
        <label>
          <span>Botão 1:</span>
          <input
            type="text"
            name="name-button"
            id="name-button"
            placeholder="Nome do botão"
          />
          <input
            type="url"
            name="url-button"
            id="url-button"
            placeholder="URL"
          />
          <button>Editar estilo</button>
        </label>
      </form>
    </div>
  );
};

export default EditPage;
