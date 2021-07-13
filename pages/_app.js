import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS (Necolas Reset CSS <3) */
  * {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next { /* ID="__next" */
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img { /* imagem responciva automaticamente */
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles} //Chama a importacao externa no stylo 
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
