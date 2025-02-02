# Cron-externo
Monitor de Tarefas com Electron, Axios e Node-Cron
Descrição

Este projeto é um aplicativo desenvolvido com Electron, Axios e Node-Cron, que permite agendar tarefas (requisições HTTP para URLs especificadas) e acompanhar seu status em tempo real.

Tecnologias Utilizadas

Electron: Para criar uma interface desktop

Axios: Para realizar requisições HTTP

Node-Cron: Para agendar tarefas periódicas

JavaScript e HTML para a interface

Instalação

1. Requisitos

Node.js instalado (Baixar aqui)

npm instalado (já incluído no Node.js)

2. Clonar o repositório

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

3. Instalar dependências

npm install

4. Configurar e executar o projeto

npm start

Isso abrirá a interface do Electron e iniciará os cron jobs.

Como Funciona

Interface: Exibe os status das tarefas e permite acompanhar as requisições HTTP.

Agendamento: O Node-Cron executa requisições HTTP automaticamente a cada minuto.

Atualização em tempo real: A interface é atualizada com os status das requisições, mostrando última execução e possíveis erros.

Estrutura do Projeto

meu-projeto-electron/
│-- index.html       # Interface da aplicação
│-- main.js          # Lógica principal (Electron, Axios, Node-Cron)
│-- package.json     # Configurações do projeto
│-- README.md        # Documentação do projeto

Contribuição

Se desejar contribuir, faça um fork do projeto, crie uma nova branch e envie um pull request.

Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo conforme necessário.

