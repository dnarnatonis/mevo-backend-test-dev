<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Descrição do Teste Técnico

## Como começar
- Faça um fork deste teste na sua conta do github.
- Crie uma branch com o seu nome.
- Realize commits com frequencia.

## Objetivo
Implementar uma API REST que:
- Receba um arquivo CSV contendo operações financeiras.
- Realize validações específicas nas operações.
- Registre as operações validadas em um banco de dados.
- Gere um resumo das operações não validadas.

## Requisitos Funcionais

### Recebimento do Arquivo
- A API deve oferecer um endpoint para o upload de arquivos CSV.
- O arquivo deve seguir o formato especificado: `from;to;amount`.

### Validações
1. **Valores Negativos**: Operações com valores negativos são consideradas inválidas.
2. **Operações Duplicadas**: Uma operação é duplicada se existir outra operação no arquivo com os mesmos valores de `to`, `from`, e `amount`. Tais operações são consideradas inválidas.
3. **Valores Suspeitos**: Operações com valores acima de R$50.000,00 são marcadas como suspeitas, mas ainda válidas para inclusão no banco de dados.
4. Os Valores estão em centavos, desta forma 100 = R$1

### Processamento do Arquivo
- O arquivo deve ser lido e as operações devem ser validadas conforme as regras acima.
- As operações validadas devem ser armazenadas em um banco  de dados (você decide).
- Um resumo das operações não validadas (com o motivo da invalidade) deve ser gerado e armazenado no banco de dados juntamente com o nome do arquivo.

### Resposta da API
Após o processamento do arquivo, a  API deve retornar uma resposta contendo:
- Número de operações validadas e inseridas no banco de dados.
- Resumo das operações não validadas, incluindo o motivo.

### Geraçao do Arquivo
- Utilize o script transactionGenerator.js para gerar o arquivo com as transaçoes.

### O que esperamos:
- Uso de Node.js com TypeScript.
- Aplicação de conceitos para a criação de uma API REST eficiente.
- Estratégias para a solução de problemas em tempo real.
- Capacidade de testar e validar sua solução.
- Dockerização da aplicação (se possível dentro do tempo alocado).
- Persistência em banco de dados.

### Critérios de Avaliação:
- Testabilidade e Manutenibilidade.
- Eficiência e Preparo para Escalabilidade.
- Modularidade, Organização e Reutilização de Código.
- A preocupação com segurança também será considerada um plus na sua solução.
