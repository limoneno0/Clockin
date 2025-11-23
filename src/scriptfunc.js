// --- VARIÁVEIS GLOBAIS ---
const pastaPaginas = "paginas func";  // pasta correta
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
            if (pagina === "controledepontofunc") inicializarControleDePonto?.();
            if (pagina === "faltas") inicializarFaltas?.();
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
