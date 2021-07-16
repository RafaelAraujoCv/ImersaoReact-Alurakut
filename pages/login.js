//export default function LoginScreen() { 
//    return <div>Pagina de login!</div>
//} // export default com return tendo uma tag html para colocar a pagina no ar , se nao dara erro

import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router'; // usar o sistama de roteamendo do react
import nookies from 'nookies'; // inporta lib para criar cookies , npm install nookies

export default function LoginScreen() {
  const router = useRouter(); // chama o router ( roteador do react )
  const [githubUser, setGithubUser] = React.useState('');
  //OU
  //const [githubUser, setGithubUser] = React.useState('RafaelAraujoCv'); // captura usuario digitado no input

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
            {  }
          <form className="box" onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                // alert('Alguém clicou no botão!')
                // router.push('/');
                console.log('Usuário: ', githubUser)
                //envia para a api o usurio digitado via POST, retorna token
                fetch('https://alurakut.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                       'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify({ githubUser: githubUser })
                }) 
                .then(async (respostaDoServer) => {
                    const dadosDaResposta = await respostaDoServer.json()
                    //console.log(dadosDaResposta.token)
                    const token = dadosDaResposta.token;
                    //cria um cookies, primeiro sem null, segundo nome aleario, terceiro o valorToken, 
                    //quarto informar onde estara disponivel a informacao com idade maxima ( em segundos )
                    nookies.set(null, 'USER_TOKEN', token, {
                        path: '/',
                        maxAge: 86400 * 7 
                    })
                    router.push('/')
                })
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input
                placeholder="Usuário"
                value={githubUser}
                onChange={(evento) => {
                    console.log(evento.target.value);
                    setGithubUser(evento.target.value)
                }}
            /> { /* campo input com valor value pre determinado e onChange para capturar o digito no campo */ }
            {githubUser.length === 0
                ? 'Preencha o campo'
                : ''
            } { /* validar campo, usando if ternario ? :  */ }
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 