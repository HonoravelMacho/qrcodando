# 🎨 Qrcodando (v1.0.0)

> Um estúdio moderno, interativo e de alto desempenho para criação de **QR Codes Artísticos e Customizáveis**.

---

## 🚀 Sobre o Projeto

**Qrcodando** é uma ferramenta web desenvolvida para transformar códigos QR tradicionais em designs únicos e atraentes, mantendo a integridade de leitura rápida e robusta. Você pode escolher diferentes estilos de pontos/módulos, gerenciar cores em tempo real e até incluir logotipos personalizados com desvio automático de colisão.

### ✨ Recursos Principais:
- **Imagens de Fundo Artísticas (Novo!):** Faça upload de qualquer imagem para servir de pano de fundo ao QR Code, com controles deslizantes de opacidade da imagem e placa de contraste inteligente integrada.
- **Estilos de Módulos (Pontos):** 
  - **Quadrados:** O visual clássico e ultra-scannable.
  - **Círculos:** Suave e moderno.
  - **Corações:** Proporções de curvas perfeitas e fáceis de ler.
  - **Estrelas:** Formato sofisticado de 4 pontas.
  - **Conexões:** Conecta dinamicamente pontos adjacentes para um visual fluido.
  - **Líquido (Novo):** Pontos com efeito de respingos orgânicos e respingos de satélite!
- **Paleta de Cores Avançada:** Escolha entre preenchimento sólido clássico ou gradientes radiais suaves.
- **Logotipos Personalizados:** Faça upload de imagens de logo com controle refinado de margem e detecção automática de colisão para que os códigos QR permaneçam perfeitamente legíveis.
- **Visualização de Código em Tempo Real:** Explore e estude a implementação de baixo nível do motor de desenho de QR Code diretamente na interface.

---

## 📢 Notas Importantes desta Edição (Leitura Recomendada)

- **Suporte a Imagens de Fundo:**
  - Nesta versão, as imagens de fundo estão **totalmente funcionais na Silhueta Quadrada** utilizando todos os tipos de pontos/módulos.
  - As silhuetas de **Círculo** e **Coração** ainda não oferecem suporte completo para imagens de fundo (isso será corrigido nas próximas atualizações!).
  - Se você **não utilizar** uma imagem de fundo, todos os recursos (incluindo todas as silhuetas e estilos de pontos) funcionam perfeitamente com precisão de 100%.
- **Disponibilidade na Web:** Em breve, o Qrcodando estará disponível para acesso direto via qualquer navegador web tradicional, além do formato de extensão!

---

## 🛠️ Como Executar Localmente

Siga o passo a passo abaixo para rodar o projeto no seu computador:

### 1. Pré-requisitos
Certifique-se de ter instalado em seu sistema:
- [Node.js](https://nodejs.org/) (Versão 18 ou superior)
- Um gerenciador de pacotes como **npm** (já incluso com o Node.js) ou **yarn**

### 2. Baixar o Código
Você pode clonar este repositório diretamente do seu terminal:
```bash
git clone https://github.com/HonoravelMacho/qrcodando.git
cd qrcodando
```

### 3. Instalar as Dependências
Execute o comando abaixo na pasta raiz do projeto para baixar as bibliotecas necessárias:
```bash
npm install
```

### 4. Iniciar o Servidor de Desenvolvimento
Rode o comando a seguir para iniciar a aplicação localmente:
```bash
npm run dev
```

O terminal exibirá um link local (geralmente `http://localhost:3000` ou `http://localhost:5173`). Abra esse link no seu navegador para usar o estúdio!

### 5. Construir para Produção (Build)
Para compilar e otimizar a aplicação para publicação:
```bash
npm run build
```

---

## 📦 Sobre a seção "Packages" do GitHub

É perfeitamente normal que a seção **"Packages"** do GitHub na barra lateral direita esteja vazia (`No packages published`). 

- **Por que está vazia?** Essa seção é reservada para bibliotecas de código ou pacotes reutilizáveis publicados no registro NPM (como se você estivesse criando uma ferramenta de desenvolvimento para outros programadores usarem via `npm install qrcodando`).
- **Preciso disso?** Não! Este projeto é uma **aplicação web completa (SPA)** e não uma biblioteca de pacotes. O projeto funciona de forma 100% autônoma rodando localmente ou publicado em serviços de hospedagem estática (como GitHub Pages, Vercel ou Netlify).

---

## 💻 Tecnologias Utilizadas

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Motion (Framer Motion)](https://motion.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

Desenvolvido com carinho para simplificar e revolucionar o design de códigos QR! ⭐ 
Se você gostou deste projeto, não se esqueça de dar uma **Estrela (Star)** no repositório!
