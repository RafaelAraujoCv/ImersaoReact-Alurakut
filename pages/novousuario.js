export default function LoginScreen() {
    //const router = useRouter(); // chama o router ( roteador do react )
    //const [githubUser, setGithubUser] = React.useState('');
    //OU
    //const [githubUser, setGithubUser] = React.useState('RafaelAraujoCv'); // captura usuario digitado no input
  
    return (
      <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div className="loginScreen">
          <section className="logoArea">
            <img src="https://alurakut.vercel.app/logo.svg" />
  
            <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
            <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunades</p>
            <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
          </section>
  
          <section className="formArea">
            <form className="box">
              <p>
                Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
              <input required /> { /* campo input com valor value pre determinado e onChange para capturar o digito no campo */ }
              <input required />
              <button type="submit">
                Criar conta
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
              © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
            </p>
          </footer>
        </div>
      </main>
    )
  } 