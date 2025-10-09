// Elementos do DOM
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const generateBtn = document.getElementById('generateBtn');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const copyToast = document.getElementById('copyToast');

// Checkboxes para tipos de caracteres
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');

// Conjuntos de caracteres
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Gerar senha inicial
    generatePassword();
    
    // Atualizar valor do comprimento quando o slider muda
    passwordLength.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });
    
    // Gerar nova senha quando o botão é clicado
    generateBtn.addEventListener('click', generatePassword);
    
    // Copiar senha quando o botão de copiar é clicado
    copyBtn.addEventListener('click', copyPassword);
    
    // Gerar nova senha quando as opções mudam
    [includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (isAtLeastOneOptionSelected()) {
                generatePassword();
            }
        });
    });
    
    // Gerar nova senha quando o comprimento muda
    passwordLength.addEventListener('input', generatePassword);
});

// Função para gerar senha
function generatePassword() {
    if (!isAtLeastOneOptionSelected()) {
        passwordOutput.value = 'Selecione pelo menos uma opção';
        passwordOutput.style.color = '#dc3545';
        return;
    }
    
    let availableChars = '';
    
    if (includeUppercase.checked) {
        availableChars += uppercaseChars;
    }
    if (includeLowercase.checked) {
        availableChars += lowercaseChars;
    }
    if (includeNumbers.checked) {
        availableChars += numberChars;
    }
    if (includeSymbols.checked) {
        availableChars += symbolChars;
    }
    
    const length = parseInt(passwordLength.value);
    let password = '';
    
    // Garantir que pelo menos um caractere de cada tipo selecionado seja incluído
    if (includeUppercase.checked) {
        password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (includeLowercase.checked) {
        password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    if (includeNumbers.checked) {
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (includeSymbols.checked) {
        password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }
    
    // Preencher o resto da senha com caracteres aleatórios
    for (let i = password.length; i < length; i++) {
        password += availableChars[Math.floor(Math.random() * availableChars.length)];
    }
    
    // Embaralhar a senha para que os caracteres obrigatórios não fiquem sempre no início
    password = shuffleString(password);
    
    passwordOutput.value = password;
    passwordOutput.style.color = '#000';
    
    // Adicionar efeito visual de geração
    passwordOutput.style.opacity = '0.5';
    setTimeout(() => {
        passwordOutput.style.opacity = '1';
    }, 100);
}

// Função para embaralhar string
function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

// Função para verificar se pelo menos uma opção está selecionada
function isAtLeastOneOptionSelected() {
    return includeUppercase.checked || 
           includeLowercase.checked || 
           includeNumbers.checked || 
           includeSymbols.checked;
}

// Função para copiar senha para a área de transferência
async function copyPassword() {
    const password = passwordOutput.value;
    
    if (!password || password === 'Selecione pelo menos uma opção') {
        showToast('Nenhuma senha para copiar!', 'warning');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(password);
        showToast('Senha copiada para a área de transferência!', 'success');
        
        // Efeito visual no botão
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.classList.add('btn-success');
        copyBtn.classList.remove('btn-outline-primary');
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.classList.remove('btn-success');
            copyBtn.classList.add('btn-outline-primary');
        }, 2000);
        
    } catch (err) {
        // Fallback para navegadores que não suportam clipboard API
        fallbackCopyTextToClipboard(password);
    }
}

// Função de fallback para copiar texto
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('Senha copiada para a área de transferência!', 'success');
        } else {
            showToast('Erro ao copiar senha!', 'error');
        }
    } catch (err) {
        showToast('Erro ao copiar senha!', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar toast
function showToast(message, type = 'success') {
    const toastElement = new bootstrap.Toast(copyToast);
    const toastBody = copyToast.querySelector('.toast-body');
    const toastHeader = copyToast.querySelector('.toast-header');
    
    toastBody.textContent = message;
    
    // Alterar cor baseada no tipo
    toastHeader.className = 'toast-header text-white';
    if (type === 'success') {
        toastHeader.classList.add('bg-success');
    } else if (type === 'warning') {
        toastHeader.classList.add('bg-warning');
    } else if (type === 'error') {
        toastHeader.classList.add('bg-danger');
    }
    
    toastElement.show();
}

// Função para calcular força da senha (opcional - para futuras implementações)
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Comprimento
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Tipos de caracteres
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return score;
}

// Adicionar efeito de digitação na senha (opcional)
function typePassword(password) {
    passwordOutput.value = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i < password.length) {
            passwordOutput.value += password[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter para gerar nova senha
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generatePassword();
    }
    
    // Ctrl/Cmd + C para copiar senha
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === passwordOutput) {
        e.preventDefault();
        copyPassword();
    }
});

// Adicionar tooltip para o botão de copiar
copyBtn.setAttribute('data-bs-toggle', 'tooltip');
copyBtn.setAttribute('data-bs-placement', 'top');
copyBtn.setAttribute('title', 'Copiar senha (Ctrl+C)');

// Inicializar tooltips do Bootstrap
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
