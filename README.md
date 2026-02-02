# 🚀 AgiliKey

**AgiliKey** é uma aplicação web desenvolvida em **Angular** focada em treinar e aperfeiçoar habilidades de digitação. O projeto oferece uma experiência progressiva, guiando o usuário desde o conhecimento básico das teclas até a digitação de textos complexos com pontuação e acentuação.

## ✨ Funcionalidades

O AgiliKey foi projetado para não ser apenas um "digitador", mas uma ferramenta de treino completa:

- **⌨️ Teclado Virtual Interativo:** Visualização em tempo real das teclas pressionadas e feedback visual de erro/acerto.
- **📈 Estatísticas em Tempo Real:**
  - **WPM (Words Per Minute):** Cálculo dinâmico da velocidade de digitação.
  - **Acurácia:** Porcentagem de precisão baseada nos erros cometidos.
  - **Timer:** Cronômetro preciso para medir a duração de cada exercício.
- **🔄 Sistema de Exercícios Dinâmico:**
  - **Níveis Progressivos:** Desde teclas base (ASDF) até textos literários completos.
  - **Randomização:** Lógica inteligente que sorteia variações de texto dentro do mesmo nível para evitar a memorização mecânica e focar no reflexo.
  - **Suporte Completo:** Exercícios com acentuação, pontuação e caracteres especiais.
- **🏆 Scoreboard:** Modal de resultados ao final de cada exercício com resumo do desempenho.

## 🛠️ Tecnologias Utilizadas

- **[Angular 17+](https://angular.io/):** Framework principal, utilizando recursos modernos como **Signals**, **Standalone Components** e **Control Flow (@if, @for)**.
- **SCSS:** Estilização modular e responsiva.
- **RxJS:** Gerenciamento reativo do estado dos exercícios e assinaturas de eventos.
- **TypeScript:** Lógica tipada e segura.

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura limpa e organizada:

- `src/app/components`:
  - `keyboard-full`: Componente principal que gerencia a lógica de input, comparação de caracteres e orquestra o ciclo do exercício.
  - `simple-keyboard`: Representação visual do teclado.
  - `scoreboard`: Exibição dos resultados finais.
- `src/app/services`:
  - `ExerciseService`: Gerencia a lista de exercícios e o estado do exercício atual.
  - `TimerService`: Responsável pela contagem de tempo e formatação.
- `src/app/shared`: Tipos, interfaces e funções utilitárias (cálculo de WPM).

## 🚀 Como Rodar o Projeto

Pré-requisitos: Você precisa ter o [Node.js](https://nodejs.org/) e o [Angular CLI](https://angular.io/cli) instalados.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/gabrielcarvalhogc/agilikey.git](https://github.com/gabrielcarvalhogc/agilikey.git)
