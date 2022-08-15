# <center>Filtro de Planetas API Star Wars</center>

![visualização da pagina](src/logo/print_filtro_de_planetas.png)

## Contexto
Este projeto trata-se do desenvolvimento de uma página com alguns filtros, onde ela consome dados da API Star Wars, e renderiza os dados dos planetas.

---
## Habilidades

Nesse projeto, eu trabalhei as seguiners Habilidades:

* Utilizar a _Context API_ do **React** para gerenciar estado.
* Utilizar o _React Hook useState_;
* Utilizar o _React Hook useContext_;
* Utilizar o _React Hook useEffect_;

---

## Lista de requisitos

##### 1 - Fazer uma requisição para o endpoint `/planets` da API de Star Wars e preencher uma tabela com os dados retornados, com exceção dos da coluna `residents`

A API a ser consultada está [nesse link](https://swapi-trybe.herokuapp.com/api/planets/).

---
##### 2 - Filtrar a tabela através de um texto, inserido num *campo de texto*, exibindo somente os planetas cujos nomes incluam o texto digitado
---
##### 3 - Criar um filtro para valores numéricos
---
##### 4 - Não utilizar filtros repetidos
---
##### 5 - Apagar o filtro de valores numéricos e desfazer as filtragens dos dados da tabela ao clicar no ícone de `X` de um dos filtros
---
##### 6 - Ordenar as colunas de forma ascendente ou descendente
---
## Técnologias usadas

Front-end:
> Desenvolvido usando: React, CSS3, HTML5, ES6, Context API, React Hooks

## Instalando Dependências
> Frontend
```bash
cd Filtro_de_Planetas/
npm install
``` 
## Executando aplicação

* Para rodar o front-end:
  ```
    cd Filtro_de_Planetas/
    npm start
  ```