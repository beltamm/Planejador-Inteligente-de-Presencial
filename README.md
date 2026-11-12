<div align="center">

# 📅 PIP — Planejador Inteligente Presencial

**Organize sua escala de trabalho híbrido sem fazer conta de padaria.**  
Cálculo real sobre dias úteis, descontando automaticamente feriados nacionais, móveis, estaduais, municipais e férias.

[![Status](https://img.shields.io/badge/status-online-10b981?style=for-the-badge)](https://beltamm.github.io/Planejador-Inteligente-de-Presencial/)
[![Stack](https://img.shields.io/badge/stack-HTML5_%7C_CSS3_%7C_JS_ES6+-6366f1?style=for-the-badge)](#arquitetura-e-tecnologias)
[![Licença](https://img.shields.io/badge/license-MIT-slate?style=for-the-badge)](#licença)

👉 **[Acessar o PIP Online Agora](https://beltamm.github.io/Planejador-Inteligente-de-Presencial/)** 👈

</div>

---

## 💡 O Problema que o PIP Resolve

Em modelos de trabalho híbrido (seja cobrando **40% / 60% do mês** ou **2 a 3 dias por semana**), descobrir quantos dias você realmente precisa ir ao escritório vira uma dor de cabeça quando o mês tem feriados no meio da semana ou quando você tira férias/folga.

O **PIP** resolve essa conta em um **Wizard de 3 etapas rápidas**:
1. Calcula os **dias úteis reais** do mês na sua cidade (abatendo feriados locais e férias).
2. Desconta os dias em que você **já foi** (`✓ Já Fui`) e distribui o restante priorizando os **seus dias da semana favoritos**.
3. Separa claramente o **Cumprimento da sua Meta (0% a 100%+)** da proporção sobre o mês útil, contabiliza **Saldo Extra (Banco de Horas)** e sincroniza todos os dias de uma vez na sua agenda.

---

## ✨ Funcionalidades Principais

| Recurso | Como funciona |
| :--- | :--- |
| 🇧🇷 **Cobertura Nacional (IBGE)** | Carregamento síncrono instantâneo com *fallback* local + enriquecimento em segundo plano via API oficial do IBGE para os 27 estados e 5.570 municípios. |
| 🎉 **Motor Completo de Feriados** | Calcula feriados **nacionais fixos**, **móveis** (Carnaval, Sexta-Feira Santa e Corpus Christi via algoritmo matemático de *Computus*), **estaduais** (Data Magna PE, Revolução SP, etc.) e **municipais** (São João, Carmo, Conceição, etc.). |
| 🎯 **Meta por % ou Dias/Semana** | Alterne entre porcentagem do mês útil (1% a 100%) ou frequência semanal (1 a 7 dias/sem) usando o slider customizado ou digitando o valor exato. |
| 🧠 **Sugestão Inteligente de Escala** | Escolha seus dias preferidos da semana (com *easter egg* bem-humorado para quem inventar de marcar sábado ou domingo ☕) para preenchimento automático equilibrado. |
| 📊 **Métricas Clarificadas & Saldo Extra** | Barra de progresso dedicada para o **Cumprimento da Meta (100% = Meta Batida)**, indicador da fração sobre o mês útil e cálculo automático de **dias excedentes (`+Xd`)**. |
| 📅 **Central de Sincronização de Agenda** | Exporte todos os dias planejados de uma só vez criando uma **série recorrente no Google Agenda (1 clique)**, baixando o pacote `.ICS` (Outlook, Apple e Google) ou adicionando dia a dia. |
| 🔗 **Link Compartilhável (Zero Login)** | Gere um link único (`#d=...`) que serializa sua escala na URL para enviar ao gestor ou colegas de equipe no Slack/Teams, sem precisar de banco de dados. |

---

## 🗂️ Arquitetura e Tecnologias

O projeto é dividido em estrutura modular limpa, sem necessidade de *bundlers* pesados, garantindo carregamento instantâneo e código aberto fácil de manter:

```text
📦 Planejador-Inteligente-de-Presencial
 ┣ 📜 index.html   # Estrutura semântica do Wizard, Modal Multi-Agenda e Meta Tags (Open Graph)
 ┣ 🎨 style.css    # Estilização Glassmorphism, Ambient Glow, Sliders customizados e animações
 ┣ ⚙️ app.js       # Motor de feriados (Computus + Locais), integração IBGE, IA de distribuição e exportação (.ICS / RRULE)
 ┗ 📖 README.md    # Documentação do projeto
```

* **HTML5 Semântico + CSS3 Custom Properties** (*Glassmorphism* & *Dark UI*)
* **Tailwind CSS (via CDN)** para *grid layout* responsivo
* **Vanilla JavaScript (ES6+)** com persistência em `localStorage` e estado via URL (`Base64`)

---

## 💻 Como Rodar Localmente

Não requer instalação de pacotes (`npm`) nem servidor complexo. Basta clonar e abrir:

```bash
git clone [https://github.com/beltamm/Planejador-Inteligente-de-Presencial.git](https://github.com/beltamm/Planejador-Inteligente-de-Presencial.git)
cd Planejador-Inteligente-de-Presencial
# Dê dois cliques no arquivo index.html para abrir no navegador
```

---

## 📄 Licença

Distribuído sob a licença **MIT**. Sinta-se livre para usar, compartilhar com seu time ou fazer um *fork*!
