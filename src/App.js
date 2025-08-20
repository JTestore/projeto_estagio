import React, { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const menu = [
    "Início",
    "Objetivos",
    "Modelos",
    "Perfis",
    "Equipe & Áreas",
    "Processo",
    "Compliance Legal",
    "KPIs & Dashboard",
    "Custos & ROI",
    "Riscos",
    "FAQ",
    "Próximos Passos",
  ];

  // dados exemplo
  const m = {
    custoMensal: 47182,
    valorGerado: 20400,
    roi: 20400 / 47182 - 1,
    oferta: 48,
    demanda: 238,
    custoBolsas: 25500,
    custoMentores: 16627,
    custoOver: 5055,
  };

  // imagens genéricas para cada aba
  const imagens = {
    Objetivos: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    Modelos: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    Perfis: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "Equipe & Áreas": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    Processo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    "Compliance Legal": "https://images.unsplash.com/photo-1581092919535-9c2a1f9a24d3",
    "Custos & ROI": "https://images.unsplash.com/photo-1561414927-6d86591d0c4f",
    Riscos: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    FAQ: "https://images.unsplash.com/photo-1581091012184-5c814dd08d4c",
    "Próximos Passos": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Compliance<br />Soluções</h2>
        {menu.map((item) => (
          <button
            key={item}
            className={page === item ? "active" : ""}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      {/* Conteúdo principal */}
      <main className="content">
        {page === "KPIs & Dashboard" ? (
          <>
            <h1>Parceria de Estágio — Compliance</h1>
            <div className="grid">
              <div className="card">
                <h3>Cobertura de horas</h3>
                <div className="kpi">
                  {(m.oferta / m.demanda * 100).toFixed(0)}%
                </div>
                <small>Oferta vs. Demanda semanal</small>
              </div>
              <div className="card">
                <h3>Custo mensal</h3>
                <div className="kpi">
                  R$ {m.custoMensal.toLocaleString()}
                </div>
              </div>
              <div className="card">
                <h3>Valor gerado (mês)</h3>
                <div className="kpi">
                  R$ {m.valorGerado.toLocaleString()}
                </div>
              </div>
              <div className="card">
                <h3>ROI estimado</h3>
                <div className="kpi">
                  {(m.roi * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Capacidade x Demanda (h/sem)</h3>
              <div className="row">
                <span style={{ width: "80px" }}>Oferta</span>
                <div className="bar">
                  <span style={{ width: (m.oferta / m.demanda) * 100 + "%" }} className="yellow"></span>
                </div>
                {m.oferta}h
              </div>
              <div className="row">
                <span style={{ width: "80px" }}>Demanda</span>
                <div className="bar">
                  <span style={{ width: "100%" }} className="gray"></span>
                </div>
                {m.demanda}h
              </div>
            </div>

            <div className="card">
              <h3>Composição de custos (mês)</h3>
              <ul>
                <li>Bolsas: <b>R$ {m.custoBolsas.toLocaleString()}</b></li>
                <li>Mentores: <b>R$ {m.custoMentores.toLocaleString()}</b></li>
                <li>Overhead: <b>R$ {m.custoOver.toLocaleString()}</b></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <h1>{page}</h1>
            <div className="card">
              <img 
                src={imagens[page]} 
                alt={page} 
                style={{ width: "100%", borderRadius: "12px" }} 
              />
              <p style={{ marginTop: "8px" }}>
                Conteúdo ilustrativo sobre <b>{page}</b>.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
