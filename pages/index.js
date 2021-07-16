import React from 'react';
import nookies from 'nookies';
import jsonwebtoken from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'; /* Sempre começar com ./ para saber onde esta na estrutura de pastas  ./ ou ../ */
import Box from '../src/components/Box'; /* Sempre começar com ./ para saber onde esta na estrutura de pastas  ./ ou ../ */
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'; /* Adiciona um componente especifico { xxxxxxxx } */
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  //console.log(propriedades);
  return (
    <Box as="aside"> { /* Utiliza a Box com comportamento do aside. as=TAG_html*/ }
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}></img> {/* stylo fixo na TAG */ }
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.titles} ({propriedades.items.length})
      </h2> 
    
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {

  /* NOTA: Usar valores variaveis em React -> {` xxxxxxxxx/${nome_da_variavel} `} */
  /* NOTA: {} para variavel ..... ${} para String */

  /* Valores dinamicos */
  const usuarioAleatorio = props.githubUser;  //props.githubUser valor q vem do login apos validaçao com a api
  const [comunidades, setComunidades] = React.useState([]); //fica olhando as comunidades function handleCriaComunidade(e), caso tenha uma auteracao ele soma e adionona na tela dinamicamente
  // const comunidades = comunidades[0]
  // const alteradorDeComunidades/setComunidades = comunidades[1];

  //console.log('Nosso teste ', );
  /*const comunidades = [
    'Alurakut'
  ]; */
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'marcobrunodev', 
    'felipefialho'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o Array decdados do GitHub
  React.useEffect(function() { // executa sempre q uma coisa for auterada na tela, q recebe 2 parametros. 1- uma funcao, 2- o tempo ... [] significa exec uma so vez
    // API GitHub - GET(padrao)
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta){
      console.log(respostaCompleta);
      setSeguidores(respostaCompleta);
    })

    // API GraphQL - // 2 parametros. url da api e configuracoes da chamada.
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '07b55a408db691534ba6d73a7dfa87',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` }) // No body, utilizar o JSON.stringify para converter em json. utilizar ` ` para poder quebrar linha 
    })
    .then((response) => response.json()) // pega o retorno do response.json() e ja retorna
    .then((respostaCompleta) => {

      const comunidadesVindaDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindaDoDato);
      setComunidades(comunidadesVindaDoDato);

    })
    // OU
    // .then(function (response) {
    //  return response.json()
    // })


  }, []); 

  console.log('seguidores antes do return', seguidores);

  // 1 - Criar um box que vai ter um map, baseado nos itens do array que pegamos no GitHub

  return (
    <> { /* Abre e fecha TAG, agrupa as tags do return */ }
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}> {/* Importando do CSS */}
          <ProfileSidebar githubUser={usuarioAleatorio} /> { /* Chamando funçao, passando a propriedade githubUser= , valor usuarioAleatorio */ }
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}> {/* Importando do CSS */}
          <Box>
            <h1 className="title">
              Bem vindo(a) {usuarioAleatorio}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault(); //desabilita o comportamento Default do formulario
              console.log(e); // Informcoes gerais do formulario

              const dadosDoForm = new FormData(e.target); //Guarda os valores dos input
              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Imagem: ', dadosDoForm.get('image'));

              //criar objeto com os valores
              const comunidade = { 
                //id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }

              //chama a api para cadastro
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              }) 
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade]; // os 3 pontos adiniona o valor na mesma Array
                setComunidades(comunidadesAtualizadas) // Joga o novo valor la no React.useState 
              })
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text" 
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                  type="text" 
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>

        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}> {/* Importando do CSS */}
        <ProfileRelationsBox titles="Seguidores" items={seguidores}/>
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2> 
          
            <ul>
              {pessoasFavoritas.map((itemAtual) => { { /* .map => Transforma um Array e retorna Array transformada */ }
                return (
                  <li key={itemAtual}> 
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`http://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => { { /* .map => Transforma um Array e retorna Array transformada */ }
                return (
                  <li key={itemAtual.id}> { /* key usado como identificador para nao conflitar informacoes */ }
                    <a href={`/comunities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      
      </MainGrid>
    </>
  )
}

//recebe o valor do coookie , usuario retornado da api apos o onSubmit={(infosDoEvento)
export async function getServerSideProps(context) {
  //console.log('Cookies', nookies.get(context).USER_TOKEN)
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN
  // instalar lib para fazer o decode, npm install jsonwebtoken
  console.log('Token decodificado: ', jsonwebtoken.decode(token));

  //Valida se o token/usuario existe true ou false
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json());

  console.log('isAuthenticated', isAuthenticated);

  // if FALSE retorna para tela de login
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jsonwebtoken.decode(token) // const { } ... informa q o nome do ultimo parametro sera o nome da variavel
  // OU
  // const githubUser = jsonwebtoken.decode(token).githubUser;
  return {
    props: {
      githubUser
      // OU
      // githubUser: githubUser
    },
  }
}