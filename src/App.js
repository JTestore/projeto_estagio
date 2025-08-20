import React, { useMemo, useState } from "react";
import "./styles.css";
import { perfis, equipe } from "./data";

export default function App() {
  const [page, setPage] = useState("home");

  // Parâmetros (editáveis no painel lateral)
  const [qtdEstagiarios, setQtdEstagiarios] = useState(8);
  const [qtdMentores, setQtdMentores] = useState(4);
  const [hEstagiario, setHEstagiario] = useState(30);
  const [hMentor, setHMentor] = useState(12);
  const [bolsa, setBolsa] = useState(1500);
  const [rateMentor, setRateMentor] = useState(80);
  const [overhead, setOverhead] = useState(12);
  const [produtividade, setProdutividade] = useState(1200);

  const m = useMemo(() => {
    const demanda = qtdEstagiarios * hEstagiario;
    const oferta = qtdMentores * hMentor;
    const cobertura = demanda ? oferta / demanda : 0;

    const custoBolsas = qtdEstagiarios * bolsa;
    const custoMentores = qtdMentores * hMentor * 4.33 * rateMentor;
    const custoOver = (custoBolsas + custoMentores) * (overhead / 100);
    const custoMensal = custoBolsas + custoMentores + custoOver;
    const custoAnual = custoMensal * 12;

    const valorGerado = qtdEstagiarios * produtividade;
    const roi = custoMensal ? (valorGerado - custoMensal) / custoMensal : 0;

    return {
      demanda,
      oferta,
      cobertura,
      custoBolsas,
      custoMentores,
      custoOver,
      custoMensal,
      custoAnual,
      valorGerado,
      roi
    };
  }, [
    qtdEstagiarios,
    hEstagiario,
    qtdMentores,
    hMentor,
    bolsa,
    rateMentor,
    overhead,
    produtividade
  ]);

  const NavBtn = ({ id, children }) => (
    <button
      className={"navBtn " + (page === id ? "active" : "")}
      onClick={() => setPage(id)}
    >
      {children}
    </button>
  );

  return (
    <div className="app">
      {/* MENU LATERAL */}
      <aside className="aside">
        <div className="brand">
          Compliance Soluções <span className="badge">Parceria de Estágio</span>
        </div>

        <div className="nav">
          <NavBtn id="home">Início</NavBtn>
          <NavBtn id="objetivos">Objetivos</NavBtn>
          <NavBtn id="modelos">Modelos</NavBtn>
          <NavBtn id="perfis">Perfis</NavBtn>
          <NavBtn id="equipe">Equipe & Áreas</NavBtn>
          <NavBtn id="processo">Processo</NavBtn>
          <NavBtn id="legal">Compliance Legal</NavBtn>
          <NavBtn id="kpis">KPIs & Dashboard</NavBtn>
          <NavBtn id="custos">Custos & ROI</NavBtn>
          <NavBtn id="riscos">Riscos</NavBtn>
          <NavBtn id="faq">FAQ</NavBtn>
          <NavBtn id="proximos">Próximos Passos</NavBtn>
        </div>

        {/* CONTROLES RÁPIDOS */}
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Parâmetros</h3>
          <div className="controls">
            <input
              className="input"
              type="number"
              value={qtdEstagiarios}
              onChange={(e) => setQtdEstagiarios(+e.target.value)}
              placeholder="Estagiários"
            />
            <input
              className="input"
              type="number"
              value={qtdMentores}
              onChange={(e) => setQtdMentores(+e.target.value)}
              placeholder="Mentores"
            />
            <input
              className="input"
              type="number"
              value={hEstagiario}
              onChange={(e) => setHEstagiario(+e.target.value)}
              placeholder="h/sem Estagiário"
            />
            <input
              className="input"
              type="number"
              value={hMentor}
              onChange={(e) => setHMentor(+e.target.value)}
              placeholder="h/sem Mentor"
            />
            <input
              className="input"
              type="number"
              value={bolsa}
              onChange={(e) => setBolsa(+e.target.value)}
              placeholder="Bolsa (R$/mês)"
            />
            <input
              className="input"
              type="number"
              value={rateMentor}
              onChange={(e) => setRateMentor(+e.target.value)}
              placeholder="Rate Mentor (R$/h)"
            />
            <input
              className="input"
              type="number"
              value={overhead}
              onChange={(e) => setOverhead(+e.target.value)}
              placeholder="Overhead (%)"
            />
            <input
              className="input"
              type="number"
              value={produtividade}
              onChange={(e) => setProdutividade(+e.target.value)}
              placeholder="Produtividade (R$/mês)"
            />
          </div>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="main">
        <h1 className="h1">Parceria de Estágio — Compliance</h1>

        {/* KPIs */}
        <div className="grid kpis">
          <div className="card">
            <h3>Cobertura de horas</h3>
            <div className="kpi">{Math.round(m.cobertura * 100)}%</div>
            <div className="small">Oferta vs. Demanda semanal</div>
          </div>
          <div className="card">
            <h3>Custo mensal</h3>
            <div className="kpi">
              R$ {Math.round(m.custoMensal).toLocaleString()}
            </div>
          </div>
          <div className="card">
            <h3>Valor gerado (mês)</h3>
            <div className="kpi">
              R$ {Math.round(m.valorGerado).toLocaleString()}
            </div>
          </div>
          <div className="card">
            <h3>ROI estimado</h3>
            <div className="kpi">{(m.roi * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* "Gráfico" simples */}
        <div className="grid" style={{ marginTop: 12 }}>
          <div className="card">
            <h3>Capacidade x Demanda (h/sem)</h3>
            <div className="row">
              <div style={{ width: 140 }}>Oferta</div>
              <div className="bar" style={{ width: "100%" }}>
                <span
                  style={{
                    width: `${Math.min(
                      100,
                      (m.oferta / (m.demanda || 1)) * 100
                    )}%`
                  }}
                />
              </div>
              <div style={{ marginLeft: 8 }}>{m.oferta}h</div>
            </div>

            <div className="row" style={{ marginTop: 8 }}>
              <div style={{ width: 140 }}>Demanda</div>
              <div className="bar" style={{ width: "100%" }}>
                <span
                  style={{ width: "100%", background: "#94a3b8" }}
                />
              </div>
              <div style={{ marginLeft: 8 }}>{m.demanda}h</div>
            </div>
          </div>

          <div className="card">
            <h3>Composição de custos (mês)</h3>
            <div className="small">Bolsas, Mentores, Overhead</div>
            <ul className="small" style={{ marginTop: 8, lineHeight: "1.8" }}>
              <li>
                Bolsas: <b>R$ {Math.round(m.custoBolsas).toLocaleString()}</b>
              </li>
              <li>
                Mentores:{" "}
                <b>R$ {Math.round(m.custoMentores).toLocaleString()}</b>
              </li>
              <li>
                Overhead: <b>R$ {Math.round(m.custoOver).toLocaleString()}</b>
              </li>
            </ul>
          </div>
        </div>

        {/* Seções por página */}
        {page === "home" && (
          <div className="grid" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>Contexto</h3>
              <div className="small">
                Programa voltado à integração ERP, operações fiscais e
                suporte/implantação.
              </div>
            </div>
            <div className="card">
              <h3>Destaques</h3>
              <ul className="small">
                <li>
                  Mentoria por consultores/analistas experientes + mentoria em
                  cascata.
                </li>
                <li>Trilhas técnicas e acompanhamento legal garantido.</li>
                <li>KPIs claros de capacidade, custos e ROI.</li>
              </ul>
            </div>
          </div>
        )}

        {page === "objetivos" && (
          <div className="grid" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>Negócio</h3>
              <ul className="small">
                <li>Pipeline de talentos com aderência fiscal e integrações.</li>
                <li>Redução de ramp‑up e retrabalho.</li>
                <li>Crescimento com custo previsível.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Pessoas</h3>
              <ul className="small">
                <li>Mentoria estruturada e feedbacks regulares.</li>
                <li>Trilhas claras de desenvolvimento.</li>
                <li>Aprendizagem contínua e colaboração.</li>
              </ul>
            </div>
          </div>
        )}

        {page === "modelos" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Modelos de acompanhamento</h3>
            <ol className="small">
              <li>
                <b>Mentoria direta</b> – 1 pleno/sênior para 2–3 estagiários.
              </li>
              <li>
                <b>Mentoria em cascata</b> – ex‑estagiários apoiam turmas novas
                com supervisão.
              </li>
              <li>
                <b>Trilha técnica</b> – NF-e/NFS-e/CT-e, Reinf/Sped, integrações
                e suporte.
              </li>
              <li>
                <b>Check legal</b> – relatórios, plano de atividades e registros
                com People/Legal.
              </li>
            </ol>
          </div>
        )}

        {page === "perfis" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Perfis recomendados</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Profissional</th>
                  <th>Função</th>
                  <th>Benefício</th>
                </tr>
              </thead>
              <tbody>
                {perfis.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <b>{p.nome}</b>
                    </td>
                    <td className="small">{p.funcao}</td>
                    <td className="small">{p.beneficio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {page === "equipe" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Equipe & Áreas</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>Área</th>
                </tr>
              </thead>
              <tbody>
                {equipe.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <b>{p.nome}</b>
                    </td>
                    <td>{p.cargo}</td>
                    <td>{p.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {page === "processo" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Processo & Cronograma</h3>
            <ul className="small">
              <li>Semanas 1–2: Onboarding + trilha básica + mentores.</li>
              <li>Semanas 3–6: Atividades assistidas.</li>
              <li>Semanas 7–12: Atividades guiadas com ownerships.</li>
              <li>Meses 4–6: Avaliação e potencial efetivação.</li>
            </ul>
          </div>
        )}

        {page === "legal" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Compliance Legal</h3>
            <ul className="small">
              <li>Termo de compromisso (empresa, instituição e estagiário).</li>
              <li>Plano de atividades e supervisão formal.</li>
              <li>Relatórios periódicos e feedbacks.</li>
              <li>Seguro e benefícios conforme legislação.</li>
            </ul>
          </div>
        )}

        {page === "kpis" && (
          <div className="grid" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>Resumo financeiro</h3>
              <ul className="small">
                <li>
                  Bolsas (mês):{" "}
                  <b>R$ {Math.round(m.custoBolsas).toLocaleString()}</b>
                </li>
                <li>
                  Mentores (mês):{" "}
                  <b>R$ {Math.round(m.custoMentores).toLocaleString()}</b>
                </li>
                <li>
                  Overhead (mês):{" "}
                  <b>R$ {Math.round(m.custoOver).toLocaleString()}</b>
                </li>
                <li>
                  Total (mês):{" "}
                  <b>R$ {Math.round(m.custoMensal).toLocaleString()}</b>
                </li>
                <li>
                  Total (ano):{" "}
                  <b>R$ {Math.round(m.custoAnual).toLocaleString()}</b>
                </li>
                <li>
                  Valor gerado (mês):{" "}
                  <b>R$ {Math.round(m.valorGerado).toLocaleString()}</b>
                </li>
                <li>
                  ROI: <b>{(m.roi * 100).toFixed(1)}%</b>
                </li>
              </ul>
            </div>
          </div>
        )}

        {page === "custos" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Custos & ROI</h3>
            <p className="small">
              Ajuste os parâmetros no painel lateral e acompanhe o impacto no
              custo total e no ROI.
            </p>
          </div>
        )}

        {page === "riscos" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Riscos & Mitigações</h3>
            <ul className="small">
              <li>
                Falta de mentores — <b>mitigação</b>: planejar capacidade e
                priorizar squads.
              </li>
              <li>
                Divergência doc/prática — <b>mitigação</b>: trilha + revisão
                trimestral.
              </li>
              <li>
                Exigências legais — <b>mitigação</b>: checklist People/Legal.
              </li>
              <li>
                Rotatividade — <b>mitigação</b>: mentoria e plano de carreira.
              </li>
            </ul>
          </div>
        )}

        {page === "faq" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>FAQ</h3>
            <ul className="small">
              <li>Quantos estagiários por mentor? 2–3.</li>
              <li>Ex‑estagiários podem mentorar? Sim, com supervisão.</li>
              <li>Como comprovar acompanhamento? Relatórios formais.</li>
            </ul>
          </div>
        )}

        {page === "proximos" && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Próximos passos</h3>
            <ol className="small">
              <li>Definir squad de mentores por área.</li>
              <li>Fechar trilha de capacitação (conteúdo e prazos).</li>
              <li>Validar checklist legal.</li>
              <li>Piloto 4–6 estagiários e avaliar em 60 dias.</li>
            </ol>
          </div>
        )}

        <div className="footer">
          © {new Date().getFullYear()} Compliance — Demo de apresentação
        </div>
      </main>
    </div>
  );
}
