import { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./perfil-css.css";
import "./style.css";
import TelaPerfil from "./components/TelaPerfil";


function App(){
  const [abaAtiva, setAbaAtiva] = useState('perfil');

  return (
    <div className="layout-principal">
      <h1>Ola React,eu sou seu pai</h1>
      <button className="nav-link">
        <i className="bi bi-person m-2">Sei la</i>
      </button>

      <aside className="sidebar">
        {/* {Botao Perfil} */}
        <button className={`nav-item ${abaAtiva === 'perfil' ? 'ativo' : ''}`}
        onClick={() => setAbaAtiva('perfil')}
        >
          Perfil
        </button>
      </aside>

      <main className="conteudo-principal">
        {abaAtiva === 'perfil' && <TelaPerfil />}
      </main>
    </div>
  )
}

export default App;
