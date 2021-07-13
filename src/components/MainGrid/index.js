import styled from 'styled-components' /* importa para essa pagina a biblioteca */

/*
Tipo da variavel ( const ) , componente sempre maiusculo ( Box ) pq é um componente e nao TAG, 
depois do styled. colocar a tag ( .div ), tudo dentro da craze ( ` ` ) sera o CSS */
const MainGrid = styled.main`
  /* display: grid; */
  width: 100%;
  grid-gap: 10px; /* espaço de um elemento para o outro */
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea { /* className="" */
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) { /* SE a tela por de pelomenos 860px */
    max-width: 1110px;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea"; /* Nome sera usado no componente Box criado em index.js*/
    grid-template-columns: 160px 1fr 312px; /* Defini quantidade de colunas e tamanho*/
  }
  
`;
export default MainGrid; /* Permite usar em outros lugares */