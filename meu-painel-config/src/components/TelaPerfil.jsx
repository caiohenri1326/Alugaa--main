export default function TelaPerfil(){
    return(
        <div id="container-perfil" className="tela ativa">
            <h2>Foto de Perfil</h2>

            <div className="informacoes-pessoais">
                <label>Nome Completo</label>
                <input type="text" placeholder="Digite seu Nome" />
            </div>

            <button className="btn-salvar">Salvar Alterações</button>
        </div>
    );
}