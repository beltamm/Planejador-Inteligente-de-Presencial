<div align="center">

# 📅 PIP — Planejador Inteligente Presencial

**Organize sua escala de trabalho híbrido sem fazer conta de padaria.**  
Cálculo real sobre dias úteis, descontando automaticamente feriados nacionais, móveis, estaduais, municipais e férias.

[![Status](https://img.shields.io/badge/status-online-10b981?style=for-the-badge)](https://beltamm.github.io/Planejador-Inteligente-de-Presencial/)
[![Stack](https://img.shields.io/badge/stack-HTML5_%7C_Tailwind_%7C_JS_Vanilla-6366f1?style=for-the-badge)](#tecnologias)
[![Licença](https://img.shields.io/badge/license-MIT-slate?style=for-the-badge)](#licença)

👉 **[Acessar o PIP Online Agora](https://beltamm.github.io/Planejador-Inteligente-de-Presencial/)** 👈

</div>

---

## 💡 O Problema que o PIP Resolve

Nas empresas que adotam modelo híbrido (seja cobrando **40% / 60% do mês** ou **2 a 3 dias por semana**), calcular quantos dias você realmente precisa ir ao escritório vira uma dor de cabeça quando o mês tem feriados no meio da semana ou quando você tira alguns dias de férias/folga.

O **PIP** faz a matemática certa em **3 passos rápidos (Wizard)**:
1. Descobre quantos **dias úteis reais** existem no mês na sua cidade.
2. Abate seus dias de **férias/folga** da base de cálculo e desconta os dias em que você **já foi** (`✓ Já Fui`).
3. Sugere automaticamente a escala ideal priorizando os **seus dias da semana preferidos** e exporta tudo para o **Google Agenda, Outlook ou Slack/Teams**.

---

## ✨ Funcionalidades Principais

| Recurso | Como funciona |
| :--- | :--- |
| 🇧🇷 **Todos os Estados e Municípios** | Integração híbrida (base local instantânea + API do IBGE em segundo plano) cobrindo os 27 estados e 5.570 municípios brasileiros. |
| 🎉 **Motor Completo de Feriados** | Calcula feriados **nacionais fixos**, **móveis** (Carnaval, Sexta-Feira Santa e Corpus Christi via algoritmo de *Computus*), **estaduais** (ex: Data Magna PE, Revolução SP) e **municipais** (ex: São João, N. Sra. do Carmo, Conceição). |
| 🎯 **Meta por % ou Dias/Semana** | Alterne entre porcentagem do mês útil (1% a 100%) ou frequência semanal (1 a 7 dias/sem) usando o slider ou digitando o valor exato. |
| 🧠 **Sugestão Inteligente de Escala** | Escolha seus dias favoritos da semana (com *easter egg* para quem inventar de marcar sábado ou domingo ☕) e deixe o sistema preencher o calendário automaticamente. |
| ✅ **Controle de "Já Fui" & Banco de Horas** | Começou a planejar no meio do mês? Informe quantos dias já cumpriu. Se passar da meta mínima, o painel calcula seu **saldo excedente (+Xd)** no banco. |
| 📅 **Sincronização Multi-Agenda** | Crie uma **série recorrente no Google Agenda com 1 clique**, baixe o pacote `.ICS` com todos os dias exatos (para Outlook, Apple Calendar e Google) ou adicione dia a dia. |
| 🔗 **Link Compartilhável (Zero Login)** | Gere um link único (`#d=...`) que carrega exatamente a sua escala na tela do seu gestor ou colegas de equipe, sem precisar de cadastro ou banco de dados. |

---

## 🚀 Como Usar

1. Acesse **[beltamm.github.io/Planejador-Inteligente-de-Presencial](https://beltamm.github.io/Planejador-Inteligente-de-Presencial/)**.
2. **Passo 1 (Local & Meta):** Selecione o mês, seu Estado/Município e defina a meta exigida pela empresa.
3. **Passo 2 (Favoritos & Já Fui):** Marque os dias da semana em que você prefere ir presencialmente e, se já tiver ido alguns dias no mês, informe a quantidade.
4. **Passo 3 (Calendário & Agenda):** Revise os dias sugeridos (use os pincéis para ajustar férias, feriados extras ou dias realizados), copie o resumo para o Slack/Teams ou clique em **Adicionar Todos na Agenda**.

---

## 🛠️ Tecnologias & Arquitetura

Projeto construído com arquitetura **Zero-Dependency Single-File** para garantir carregamento instantâneo, privacidade total e custo zero de hospedagem:

* **HTML5 Semântico + Vanilla JavaScript (ES6+)**
* **Tailwind CSS (via CDN)** para estilização responsiva e *Dark Mode* nativo
* **Persistência Local (`localStorage`)** + **Serialização de Estado via URL Hash (`Base64`)** para compartilhamento sem backend
* **API de Localidades do IBGE** com *fallback* síncrono offline-first

---

## 💻 Rodando Localmente

Como o projeto não exige *build* nem Node.js, basta clonar o repositório e abrir o arquivo `index.html` em qualquer navegador:

```bash
git clone [https://github.com/beltamm/Planejador-Inteligente-de-Presencial.git](https://github.com/beltamm/Planejador-Inteligente-de-Presencial.git)
cd Planejador-Inteligente-de-Presencial
# Abra o arquivo index.html no navegador
```

---

## 📄 Licença

Distribuído sob a licença **MIT**. Sinta-se livre para usar, compartilhar com seu time ou fazer um *fork*!
