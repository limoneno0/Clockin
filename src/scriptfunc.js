// --- VARIÁVEIS GLOBAIS ---
const pastaPaginas = "paginas func";  // pasta correta
const sidebar = document.getElementById('sidebar-menu');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const conteudo = document.getElementById('conteudo');

// --- DATASETS DE FALTAS ---
const DATASETS_FALTAS = {
  "2025-11": {
    titulo: "Novembro 2025",
    kpis: {
      dias: 11,
      faltantes: 1,
      atrasos: 1,
      presenca: 91
    },
    registros: [
      { data: "23/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "22/11", status: "Falta", entrada: "", saida: "", atraso: "", justificativa: "Atestado médico" },
      { data: "21/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "20/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "19/11", status: "Atraso", entrada: "07:25", saida: "17:00", atraso: "25 min", justificativa: "Transporte público" },
      { data: "18/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "17/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "16/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "15/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "14/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "13/11", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" }
    ]
  },
  "2025-10": {
    titulo: "Outubro 2025",
    kpis: {
      dias: 20,
      faltantes: 3,
      atrasos: 5,
      presenca: 87
    },
    registros: [
      { data: "31/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "30/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "29/10", status: "Atraso", entrada: "07:30", saida: "17:00", atraso: "30 min", justificativa: "Trânsito" },
      { data: "28/10", status: "Falta", entrada: "", saida: "", atraso: "", justificativa: "Atestado médico" },
      { data: "27/10", status: "Atraso", entrada: "07:40", saida: "17:00", atraso: "40 min", justificativa: "Trânsito" },
      { data: "26/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "25/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "24/10", status: "Atraso", entrada: "07:15", saida: "17:00", atraso: "15 min", justificativa: "Transporte público" },
      { data: "23/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "22/10", status: "Falta", entrada: "", saida: "", atraso: "", justificativa: "Atestado médico" },
      { data: "21/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "20/10", status: "Atraso", entrada: "07:25", saida: "17:00", atraso: "25 min", justificativa: "Trânsito" },
      { data: "19/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "18/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "17/10", status: "Falta", entrada: "", saida: "", atraso: "", justificativa: "Falta justificada" },
      { data: "16/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "15/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "14/10", status: "Atraso", entrada: "07:20", saida: "17:00", atraso: "20 min", justificativa: "Trânsito" },
      { data: "13/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "12/10", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" }
    ]
  },
  "2025-09": {
    titulo: "Setembro 2025",
    kpis: {
      dias: 21,
      faltantes: 2,
      atrasos: 3,
      presenca: 85
    },
    registros: [
      { data: "30/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "29/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "28/9", status: "Atraso", entrada: "07:20", saida: "17:00", atraso: "20 min", justificativa: "Metrô" },
      { data: "27/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "26/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "25/9", status: "Falta", entrada: "", saida: "", atraso: "", justificativa: "Atestado médico" },
      { data: "24/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "23/9", status: "Atraso", entrada: "07:10", saida: "17:00", atraso: "10 min", justificativa: "Trânsito" },
      { data: "22/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "21/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "20/9", status: "Falta", entrada: "", saida: "", atraso: "", justificativa: "Falta justificada" },
      { data: "19/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "18/9", status: "Atraso", entrada: "07:35", saida: "17:00", atraso: "35 min", justificativa: "Transporte público" },
      { data: "17/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "16/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "15/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "14/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "13/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "12/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "11/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" },
      { data: "10/9", status: "Presente", entrada: "07:00", saida: "17:00", atraso: "", justificativa: "" }
    ]
  }
};

// --- DADOS SIMULADOS DE FOTOS ---
const photoHistory = [
    { date: '26/11', time: '08:05', image: 'assets/selfie.png' },
    { date: '25/11', time: '08:02', image: 'assets/selfie2.jpg' },
    { date: '24/11', time: '08:09', image: 'assets/selfie3.jpg' },
    { date: '23/11', time: '08:17', image: 'assets/selfie4.jpg' },
    { date: '22/11', time: '08:07', image: 'assets/selfie2.jpg' },
    { date: '21/11', time: '09:04', image: 'assets/selfie.png' },
    { date: '20/11', time: '08:46', image: 'assets/selfie4.jpg' },
    { date: '19/11', time: '08:12', image: 'assets/selfie2.jpg' },
];

// --- FUNÇÕES DE MENU RESPONSIVO ---
function inicializarMenuResponsivo() {
    const menuToggle = document.getElementById('menu-toggle');
    if (!menuToggle || !sidebar || !sidebarOverlay) return;

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.style.display = 'none';
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 991.98) {
            sidebar.classList.remove('open');
            sidebarOverlay.style.display = 'none';
        }
    });
}

// --- FUNÇÃO PARA FECHAR MENU MOBILE ---
function fecharMenuMobile() {
    if (window.innerWidth <= 991.98 && sidebar) {
        sidebar.classList.remove('open');
        sidebarOverlay.style.display = 'none';
    }
}

// --- CARREGAMENTO DE PÁGINAS VIA FETCH ---
function carregarPagina(pagina) {
    if (pagina === "sair") {
        sair();
        return;
    }

    fetch(`${pastaPaginas}/${pagina}.html`)
        .then(r => r.text())
        .then(html => {
            conteudo.innerHTML = html;
            fecharMenuMobile();

            // Lógica específica para páginas
            if (pagina === "dashboardfunc") inicializarDashboard?.();
            if (pagina === "configuracoes1func") inicializarConfiguracoes1?.();
            if (pagina === "configuracoes2func") inicializarConfiguracoes2?.();
            if (pagina === "controledepontofunc") inicializarControleDePonto();
            if (pagina === "faltas") inicializarFaltas();
        })
        .catch(err => console.error("Erro ao carregar página:", err));
}

// --- EVENTO DE CLIQUE NOS LINKS DA SIDEBAR ---
document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-page]");
    if (link) {
        e.preventDefault();
        carregarPagina(link.getAttribute("data-page"));
    }
});

// --- VERIFICAÇÃO DE TOKEN ---
function checkAuth() {
    const token = localStorage.getItem('clockin:token');
    if (!token) return false;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            localStorage.removeItem('clockin:token');
            localStorage.removeItem('clockin:user');
            return false;
        }
        return true;
    } catch (e) {
        localStorage.removeItem('clockin:token');
        localStorage.removeItem('clockin:user');
        return false;
    }
}

// --- LOGOUT ---
function sair() {
    localStorage.removeItem('clockin:token');
    localStorage.removeItem('clockin:user');
    window.location.href = "../login/login.html";
}

// --- INICIALIZAÇÃO ---
window.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) {
        window.location.href = "../login/login.html";
        return;
    }

    inicializarMenuResponsivo();
    carregarPagina("dashboardfunc"); // primeira página carregada ao logar
});

// --- CONFIGURAÇÕES 1 ---
function inicializarConfiguracoes1() {
    const btnAlterar = document.getElementById("btn-alterar-dados");
    if (btnAlterar) {
        // Quando o botão for clicado, ele carrega a página "configuracoes2func"
        btnAlterar.addEventListener("click", () => {
            carregarPagina("configuracoes2func");
        });
    }
}

// --- CONFIGURAÇÕES 2 ---
function inicializarConfiguracoes2() {
    const saveButton = document.getElementById("saveButton");
    if (!saveButton) return;

    saveButton.addEventListener("click", () => {
        saveButton.innerHTML = 'As alterações foram salvas &check;';
        saveButton.classList.add('btn-success-feedback');
        saveButton.disabled = true;

        setTimeout(() => {
            saveButton.innerHTML = 'Salvar Alterações';
            saveButton.classList.remove('btn-success-feedback');
            saveButton.disabled = false;
        }, 3000);
    });
}

// --- CONTROLE DE PONTO (GALERIA DE FOTOS) ---
function inicializarControleDePonto() {
    const showHistoryBtn = document.getElementById('showHistoryBtn');
    const closeGalleryBtn = document.getElementById('closeGalleryBtn');
    const photoGallery = document.getElementById('photoGallery');
    const photoGrid = document.getElementById('photoGrid');

    // Verificar se os elementos existem
    if (!showHistoryBtn || !closeGalleryBtn || !photoGallery || !photoGrid) {
        console.error("Elementos da galeria de fotos não encontrados");
        return;
    }

    // Função para mostrar a galeria
    showHistoryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Limpa o grid antes de adicionar novas fotos
        photoGrid.innerHTML = '';
        
        // Adiciona as fotos ao grid
        photoHistory.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-grid-item';
            
            photoItem.innerHTML = `
                <img src="${photo.image}" alt="Foto de ponto ${photo.date} ${photo.time}">
                <div class="photo-grid-item-time">${photo.date} - ${photo.time}</div>
            `;
            
            photoGrid.appendChild(photoItem);
        });
        
        // Mostra a galeria com animação
        photoGallery.style.display = 'block';
        
        // Scroll suave até a galeria
        setTimeout(() => {
            photoGallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    // Função para fechar a galeria
    closeGalleryBtn.addEventListener('click', function() {
        photoGallery.style.display = 'none';
    });
}

// --- PÁGINA DE FALTAS ---
function inicializarFaltas() {
    // Seletor simplificado
    const $ = (s) => document.querySelector(s);

    // Referências aos elementos DOM
    const tbody = $("#tbody");
    const kpiDias = $("#kpiDias");
    const kpiFalt = $("#kpiFalt");
    const kpiAtr = $("#kpiAtr");
    const pctEl = $("#pct");
    const arc = $("#arc");
    const mesSel = $("#mes");
    const sectionTitle = document.querySelector(".stats-section .section-title");

    // Verificar se os elementos existem
    if (!tbody || !kpiDias || !kpiFalt || !kpiAtr || !pctEl || !arc || !mesSel) {
        console.error("Elementos da página de faltas não encontrados");
        return;
    }

    // Função para formatar valores vazios
    function fmt(v) {
        return v && v.trim() !== "" ? v : "—";
    }

    // Função para criar badge de status
    function badge(s) {
        const map = {
            "Presente": "presente",
            "Atraso": "atraso",
            "Falta": "falta"
        };
        const cls = map[s] || "presente";
        return `<span class="status ${cls}">${s}</span>`;
    }

    // Função para renderizar os dados
    function render(ds) {
        // Atualizar KPIs
        kpiDias.textContent = ds.kpis.dias;
        kpiFalt.textContent = ds.kpis.faltantes;
        kpiAtr.textContent = ds.kpis.atrasos;
        pctEl.textContent = ds.kpis.presenca + "%";
        
        // Atualizar título da seção
        if (sectionTitle) {
            sectionTitle.textContent = `Resumo de ${ds.titulo}`;
        }

        // Atualizar gráfico de pizza
        const p = Math.max(0, Math.min(100, ds.kpis.presenca));
        arc.setAttribute("stroke-dasharray", `${p} ${100 - p}`);

        // Limpar e renderizar tabela
        tbody.innerHTML = "";

        // Ordenar registros por data (mais recente primeiro)
        const registrosOrdenados = [...ds.registros].sort((a, b) => {
            const parseData = (d) => {
                const [dia, mes] = d.split('/').map(Number);
                return new Date(2025, mes - 1, dia);
            };
            return parseData(b.data) - parseData(a.data);
        });

        registrosOrdenados.forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td data-label="Data">${r.data || "—"}</td>
                <td data-label="Status">${badge(r.status)}</td>
                <td data-label="Entrada">${fmt(r.entrada)}</td>
                <td data-label="Saída">${fmt(r.saida)}</td>
                <td data-label="Atraso">${fmt(r.atraso)}</td>
                <td data-label="Justificativa">${fmt(r.justificativa)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Função para escapar valores CSV
    function escapeCSV(v = "") {
        return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    }

    // Event listener para o botão aplicar
    const btnAplicar = $("#aplicar");
    if (btnAplicar) {
        btnAplicar.addEventListener("click", () => {
            const key = mesSel.value;
            render(DATASETS_FALTAS[key] || DATASETS_FALTAS["2025-11"]);
        });
    }

    // Event listener para o botão exportar
    const btnExportar = $("#exportar");
    if (btnExportar) {
        btnExportar.addEventListener("click", () => {
            const key = mesSel.value;
            const ds = DATASETS_FALTAS[key] || DATASETS_FALTAS["2025-11"];

            const rows = [
                ["Data", "Status", "Entrada", "Saída", "Atraso", "Justificativa"],
                ...ds.registros.map(r => [
                    r.data,
                    r.status,
                    r.entrada || "",
                    r.saida || "",
                    r.atraso || "",
                    r.justificativa || ""
                ])
            ];

            const csv = rows.map(r => r.map(escapeCSV).join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `registros-${key}.csv`;
            a.click();
            URL.revokeObjectURL(a.href);
        });
    }

    // Inicialização: renderizar o dataset do mês selecionado
    const mesInicial = mesSel.value;
    render(DATASETS_FALTAS[mesInicial] || DATASETS_FALTAS["2025-11"]);
}
