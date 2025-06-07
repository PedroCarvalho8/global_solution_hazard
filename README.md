# 📱 Hazard  
**Aplicativo Mobile de Monitoramento de Riscos de Deslizamentos**

---

## 🚀 Descrição do Projeto

O *Hazard* é um aplicativo mobile desenvolvido em **React Native com Expo**, que simula uma **rede de sensores inteligentes** para o monitoramento ambiental, com foco na **prevenção de deslizamentos de terra**. Inspirado por iniciativas como o **Alerta Rio** e **Early Warning Systems**, o projeto visa oferecer uma solução educacional e acessível para o acompanhamento de áreas de risco.

O aplicativo permite:
- Monitorar **inclinação** e **umidade** do solo
- Avaliar riscos com base em dados simulados ou cadastrados
- Exibir **níveis de alerta visualmente**
- Apresentar **ações de mitigação** e histórico das medições

---

## 🖥️ Funcionalidades Principais

O app é composto por 5 telas principais, descritas a seguir:

---

### 🏠 Tela Inicial – *Dashboard de Riscos*  
- Exibe **as medições mais recentes** dos sensores simulados ou cadastrados.  
- Mostra um painel com **nível de risco atual** por local ou ponto monitorado.  
- Os níveis de risco disponíveis são:
  - 🟢 **Seguro**
  - 🟡 **Cuidado**
  - 🔴 **Alerta**

---

### ➕ Tela de Cadastro – *Inserção de Medições*  
- Permite o **registro manual** de:
  - **Inclinação do solo (°)**
  - **Umidade do solo (g/m³)**
- As medições são armazenadas localmente com **AsyncStorage**.

---

### ⚠️ Tela de Alertas – *Relatórios e Estatísticas*  
- Lista os **relatórios de risco recentes**, baseados nas medições cadastradas.  
- Mostra o **nível de alerta atual** de cada ponto monitorado.  
- Apresenta **estatísticas** como:
  - Quantidade de alertas por nível
  - Quantidade de pontos medidos
  - Informações sobre alertas de riscos

---

### 📜 Tela de Histórico – *Acompanhamento Temporal*  
- Permite visualizar todas as medições já registradas.  
- Organização hierárquica:  
  - 📅 **Ano → Mês → Medições**
- Cada medição exibe:
  - Data e hora
  - Umidade
  - Inclinação
  - Nível de risco atribuído
  - Anotações realizadas

---

### 🛡️ Tela de Medidas de Mitigação – *Ações de Prevenção*  
- Apresenta **recomendações de segurança** com base no nível de risco detectado.  
- Exemplos de recomendações:
  - Análise da Inclinação do Terreno
  - Manutenção Preventiva da Infraestrutura
  - Capacitação da Comunidade Local
- Pensado como material educativo e preventivo.

---

## 💾 Tecnologias Utilizadas

- **React Native com Expo**  
- **expo-sensors** – para simulação de sensores (como acelerômetro)  
- **AsyncStorage** – armazenamento local dos dados  
- **expo-router / React Navigation** – sistema de rotas e navegação entre telas  
- **lucide-react-native** – biblioteca moderna de ícones  
- **StyleSheet API** – estilização modular  

---

## 🎯 Diferenciais

- Aplicativo com **impacto social e educativo**  
- Interface intuitiva com alertas visuais claros  
- Arquitetura simples e expansível  
- Pode ser utilizado em projetos escolares, comunitários ou simulações de Defesa Civil

---

## 👥 Integrantes

| Nome Completo                                 | RM     |
|-----------------------------------------------|--------|
| Pedro Henrique Pinheiro Carvalho              | 551918 |
| Fernando Magalhães Perezine de Souza          | 98010  |
| Kauan Dintof Lopes                            | 551733 |

---
