let currentRole = 'employee';

document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeForm();
});

function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const roleInput = document.getElementById('role');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            if (this.id === 'tab-func') {
                currentRole = 'employee';
                roleInput.value = 'employee';
            } else if (this.id === 'tab-adm') {
                currentRole = 'admin';
                roleInput.value = 'admin';
            }
        });
    });
}

function initializeForm() {
    const form = document.getElementById('form-login');
    const errorElement = document.getElementById('error');
    const submitButton = document.querySelector('.btn');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        errorElement.hidden = true;
        errorElement.textContent = '';

        const userId = document.getElementById('userId').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!userId || !password) {
            showError('Por favor, preencha todos os campos.');
            return;
        }

        submitButton.disabled = true;
        submitButton.classList.add('loading');
        submitButton.textContent = 'Entrando...';

        setTimeout(async () => {
            const validCredentials = {
                employee: { id: 'func001', password: '123456' },
                admin: { id: 'admin001', password: 'admin123' }
            };

            const validCreds = validCredentials[currentRole];

            if (userId === validCreds.id && password === validCreds.password) {
                try {
                    const token = await generateJwtToken(userId, currentRole);
                    const userData = {
                        id: userId,
                        name: currentRole === 'admin' ? 'Administrador' : 'Funcionário',
                        role: currentRole
                    };

                    localStorage.setItem('clockin:token', token);
                    localStorage.setItem('clockin:user', JSON.stringify(userData));

                    submitButton.classList.remove('loading');
                    submitButton.textContent = '✓ Login realizado!';
                    submitButton.style.background = '#059669';

                    // Redireciona para a página correta
                    setTimeout(() => {
                        alert(`Login realizado com sucesso!\nUsuário: ${userData.name}\nPapel: ${currentRole}`);

                        if (currentRole === 'employee') {
                            window.location.href = "../indexfunc.html";
                        } else {
                            window.location.href = "../index.html";
                        }
                    }, 700);

                } catch (err) {
                    showError('Erro ao gerar token JWT.');
                    resetButton();
                }
            } else {
                showError('Credenciais inválidas. Tente novamente.');
                resetButton();
            }
        }, 1000);
    });
}


/**
 * Gera um token JWT compatível com jwt.io
 */
async function generateJwtToken(userId, role) {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };

    const payload = {
        sub: userId,
        role: role,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        iat: Math.floor(Date.now() / 1000)
    };

    const secret = "meuSegredoSuperSecreto123";

    function base64UrlEncode(obj) {
        return btoa(JSON.stringify(obj))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    const headerBase64 = base64UrlEncode(header);
    const payloadBase64 = base64UrlEncode(payload);

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const data = encoder.encode(`${headerBase64}.${payloadBase64}`);

    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, data);
    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    return `${headerBase64}.${payloadBase64}.${signatureBase64}`;
}


/**
 * Verifica se há um JWT válido salvo no localStorage
 */
function checkAuth() {
    const token = localStorage.getItem('clockin:token');
    if (!token) return false;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now) {
            localStorage.removeItem('clockin:token');
            localStorage.removeItem('clockin:user');
            return false;
        }

        return true;
    } catch (e) {
        console.error("Erro ao verificar token:", e);
        localStorage.removeItem('clockin:token');
        localStorage.removeItem('clockin:user');
        return false;
    }
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.hidden = false;
}

function resetButton() {
    const submitButton = document.querySelector('.btn');
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
    submitButton.textContent = 'Login';
    submitButton.style.background = 'var(--primary)';
}


