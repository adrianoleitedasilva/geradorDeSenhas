# 🔐 Gerador de Senhas - Informações do Projeto

## 📋 Visão Geral

O **Gerador de Senhas** é uma aplicação web responsiva desenvolvida com HTML5, CSS3, JavaScript e Bootstrap 5, projetada para criar senhas seguras e personalizadas de forma intuitiva e eficiente.

## 🎯 Objetivo

Fornecer uma ferramenta simples e segura para geração de senhas personalizadas, permitindo aos usuários configurar diferentes tipos de caracteres e comprimento conforme suas necessidades de segurança.

## 🏗️ Arquitetura do Sistema

### Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5.3.0
- **Ícones**: Font Awesome 6.0.0
- **Responsividade**: Mobile-first design

### Estrutura de Arquivos
```
GeradorDeSenhas/
├── index.html          # Estrutura principal da aplicação
├── style.css           # Estilos personalizados e animações
├── script.js           # Lógica de negócio e interações
└── README.md           # Documentação do projeto
```

## 📜 Regras de Negócio

### 1. **Geração de Senhas**

#### 1.1 Tipos de Caracteres Suportados
- **Maiúsculas (A-Z)**: 26 caracteres alfabéticos maiúsculos
- **Minúsculas (a-z)**: 26 caracteres alfabéticos minúsculos  
- **Números (0-9)**: 10 dígitos numéricos
- **Símbolos**: `!@#$%^&*()_+-=[]{}|;:,.<>?` (32 caracteres especiais)

#### 1.2 Comprimento da Senha
- **Mínimo**: 4 caracteres
- **Máximo**: 50 caracteres
- **Padrão**: 12 caracteres
- **Validação**: O comprimento deve ser um número inteiro positivo

#### 1.3 Algoritmo de Geração
1. **Validação de Entrada**: Verificar se pelo menos um tipo de caractere está selecionado
2. **Garantia de Diversidade**: Incluir pelo menos um caractere de cada tipo selecionado
3. **Preenchimento Aleatório**: Completar o restante com caracteres aleatórios do conjunto selecionado
4. **Embaralhamento**: Misturar os caracteres para evitar padrões previsíveis

### 2. **Validações e Restrições**

#### 2.1 Validação de Opções
- **Obrigatório**: Pelo menos um tipo de caractere deve estar selecionado
- **Mensagem de Erro**: "Selecione pelo menos uma opção" quando nenhuma opção está marcada
- **Prevenção**: Impedir geração de senha sem opções válidas

#### 2.2 Validação de Comprimento
- **Range**: 4 ≤ comprimento ≤ 50
- **Tipo**: Apenas números inteiros
- **Feedback Visual**: Exibição do valor atual no slider

### 3. **Funcionalidades de Interface**

#### 3.1 Geração de Senha
- **Trigger Automático**: Gerar senha ao alterar qualquer configuração
- **Trigger Manual**: Botão "Gerar Nova Senha"
- **Atalho de Teclado**: `Ctrl+Enter` (ou `Cmd+Enter` no Mac)

#### 3.2 Cópia para Área de Transferência
- **Método Primário**: Clipboard API (navegadores modernos)
- **Método Fallback**: `document.execCommand('copy')` (navegadores antigos)
- **Feedback Visual**: Toast de confirmação
- **Atalho de Teclado**: `Ctrl+C` (ou `Cmd+C` no Mac)
- **Validação**: Verificar se existe senha válida antes de copiar

#### 3.3 Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 
  - Mobile: < 576px
  - Tablet: 576px - 768px
  - Desktop: > 768px
- **Adaptação**: Layout e componentes se ajustam automaticamente

### 4. **Experiência do Usuário (UX)**

#### 4.1 Feedback Visual
- **Animações**: Transições suaves em hover e clique
- **Estados**: Diferentes cores para botões e inputs
- **Loading**: Efeito de opacidade durante geração
- **Toast**: Notificações de sucesso/erro

#### 4.2 Acessibilidade
- **Navegação por Teclado**: Suporte completo a Tab e Enter
- **Screen Readers**: Labels e ARIA attributes apropriados
- **Contraste**: Cores com contraste adequado
- **Focus**: Indicadores visuais claros

#### 4.3 Usabilidade
- **Tooltips**: Dicas contextuais nos botões
- **Validação em Tempo Real**: Feedback imediato
- **Atalhos**: Teclas de atalho para ações principais
- **Intuitividade**: Interface clara e autoexplicativa

### 5. **Segurança**

#### 5.1 Geração Segura
- **Aleatoriedade**: Uso de `Math.random()` para geração
- **Diversidade**: Garantia de caracteres de diferentes tipos
- **Embaralhamento**: Algoritmo Fisher-Yates para misturar caracteres
- **Sem Padrões**: Evitar sequências previsíveis

#### 5.2 Privacidade
- **Processamento Local**: Toda geração acontece no cliente
- **Sem Armazenamento**: Senhas não são salvas ou transmitidas
- **Sem Cookies**: Não utiliza cookies ou localStorage
- **Código Aberto**: Código fonte totalmente visível

### 6. **Performance**

#### 6.1 Otimizações
- **CSS Minificado**: Uso de CDN para Bootstrap e Font Awesome
- **JavaScript Eficiente**: Algoritmos otimizados
- **Animações CSS**: Uso de `transform` e `opacity` para performance
- **Lazy Loading**: Carregamento sob demanda

#### 6.2 Compatibilidade
- **Navegadores Suportados**: Chrome, Firefox, Safari, Edge (últimas 2 versões)
- **Fallbacks**: Suporte a navegadores mais antigos
- **Mobile**: iOS Safari e Chrome Mobile

## 🚀 Como Usar

### Instalação
1. Clone ou baixe o projeto
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Não requer servidor ou instalação adicional

### Uso Básico
1. **Selecione os tipos de caracteres** desejados
2. **Ajuste o comprimento** da senha usando o slider
3. **Clique em "Gerar Nova Senha"** ou use `Ctrl+Enter`
4. **Copie a senha** clicando no botão de cópia ou use `Ctrl+C`

## 🔧 Personalização

### Modificar Conjuntos de Caracteres
Edite as constantes no arquivo `script.js`:
```javascript
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
```

### Ajustar Range de Comprimento
Modifique os atributos `min` e `max` no input range:
```html
<input type="range" min="4" max="50" value="12">
```

### Personalizar Estilos
Edite o arquivo `style.css` para modificar cores, fontes e animações.

## 📊 Métricas de Qualidade

### Cobertura de Funcionalidades
- ✅ Geração de senhas personalizadas
- ✅ Múltiplos tipos de caracteres
- ✅ Controle de comprimento
- ✅ Cópia para área de transferência
- ✅ Interface responsiva
- ✅ Validações de entrada
- ✅ Feedback visual
- ✅ Atalhos de teclado
- ✅ Acessibilidade

### Padrões de Código
- **HTML**: Semântico e acessível
- **CSS**: Organizado e modular
- **JavaScript**: ES6+ com funções puras
- **Bootstrap**: Uso consistente do framework

## 🐛 Solução de Problemas

### Problemas Comuns
1. **Senha não é gerada**: Verifique se pelo menos uma opção está selecionada
2. **Cópia não funciona**: Verifique se o navegador suporta Clipboard API
3. **Layout quebrado**: Verifique se o Bootstrap está carregando corretamente

### Debug
- Abra o console do navegador (F12) para ver erros
- Verifique se todos os arquivos estão no mesmo diretório
- Teste em diferentes navegadores

## 📝 Changelog

### Versão 1.0.0
- ✅ Implementação inicial
- ✅ Interface responsiva com Bootstrap
- ✅ Geração de senhas personalizáveis
- ✅ Funcionalidade de cópia
- ✅ Validações e feedback visual
- ✅ Atalhos de teclado
- ✅ Documentação completa

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT. Sinta-se livre para usar, modificar e distribuir conforme necessário.

## 👥 Contribuições

Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

---

**Desenvolvido com ❤️ para segurança digital**

