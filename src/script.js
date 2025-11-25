// --- VARIÁVEIS GLOBAIS ---
const pastaPaginas = "paginas";
const sidebar = document.getElementById('sidebar-menu');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const conteudo = document.getElementById('conteudo');

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
        if (sidebarOverlay) sidebarOverlay.style.display = 'none';
    }
}

// --- CARREGAMENTO DE PÁGINAS VIA FETCH ---
function carregarPagina(pagina) {
    // Se a página for "sair", chama logout
    if (pagina === "sair") {
        sair();
        return;
    }

    fetch(`${pastaPaginas}/${pagina}.html`)
        .then(r => r.text())
        .then(html => {
            conteudo.innerHTML = html;
            fecharMenuMobile();

            // --- LÓGICA ESPECÍFICA DE PÁGINAS ---
            if (pagina === "funcionarios") inicializarFuncionariosPage();
            if (pagina === "configuracoes1") inicializarConfiguracoes1();
            if (pagina === "configuracoes2") inicializarConfiguracoes2();
        })
        .catch(err => console.error("Erro ao carregar página:", err));
}

// --- INICIALIZAÇÃO DE FUNCIONÁRIOS ---
function inicializarFuncionariosPage() {
    const funcionarios = [
        { id: 1, nome: "Ana Souza", cargo: "Analista Comercial", setor: "Comercial", status: "Ativo", foto: "personas/Ana souza.jpeg" },
        { id: 2, nome: "Carlos Lima", cargo: "Suporte Técnico", setor: "TI", status: "Férias", foto: "personas/Carlos lima.jpeg" },
        { id: 3, nome: "Júlia Dantas", cargo: "Desenvolvedora", setor: "TI", status: "Ativo", foto: "personas/Julia Dantas.jpeg" },
        { id: 4, nome: "Pedro Gomes", cargo: "Designer Gráfico", setor: "Marketing", status: "Ativo", foto: "personas/Pedro Gomes.jpeg" },
        { id: 5, nome: "Érica Oliveira", cargo: "Designer Gráfica", setor: "Marketing", status: "Ativo", foto: "personas/Erika Oliveira.jpeg" }
    ];

    const tbody = document.querySelector("#table tbody");
    const search = document.getElementById("search");
    const details = document.getElementById("details");
    const dFoto = document.getElementById("d-foto");
    const dNome = document.getElementById("d-nome");
    const dCargo = document.getElementById("d-cargo");
    let termo = "";

    if (!tbody || !search || !details) return;

    function badge(s) {
        if (s === "Ativo") return '<span class="badge green">Ativo</span>';
        if (s === "Férias") return '<span class="badge amber">Férias</span>';
        return `<span class="badge">${s}</span>`;
    }

    function linhaHTML(p) {
        return `<tr role="button" tabindex="0" aria-label="Abrir detalhes de ${p.nome}">
            <td class="col-foto"><img src="${p.foto}" alt="${p.nome}" /></td>
            <td class="name" data-label="Nome">${p.nome}</td>
            <td data-label="Cargo">${p.cargo}</td>
            <td data-label="Setor">${p.setor}</td>
            <td data-label="Status">${badge(p.status)}</td>
        </tr>`;
    }

    function render(lista) {
        tbody.innerHTML = lista.map(linhaHTML).join("");
        [...tbody.querySelectorAll("tr")].forEach((tr, i) => {
            tr.addEventListener("click", () => abrir(lista[i]));
            tr.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    abrir(lista[i]);
                }
            });
        });
    }

    function abrir(p) {
        dFoto.src = p.foto;
        dFoto.alt = p.nome;
        dNome.textContent = p.nome;
        dCargo.textContent = p.cargo;
        details.hidden = false;
    }

    function filtrar() {
        const t = termo.toLowerCase();
        render(funcionarios.filter(
            p => p.nome.toLowerCase().includes(t) ||
                 p.cargo.toLowerCase().includes(t) ||
                 p.setor.toLowerCase().includes(t)
        ));
    }

    search.addEventListener("input", (e) => {
        termo = e.target.value;
        filtrar();
    });

    render(funcionarios);
}

// --- CONFIGURAÇÕES 1 ---
function inicializarConfiguracoes1() {
    const btnAlterar = document.getElementById("btn-alterar-dados");
    if (btnAlterar) {
        btnAlterar.addEventListener("click", () => {
            carregarPagina("configuracoes2");
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
    window.location.href = "login/login.html";
}

// --- INICIALIZAÇÃO ---
window.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) {
        window.location.href = "login/login.html";
        return;
    }

    inicializarMenuResponsivo();
    carregarPagina("dashboard");
});
