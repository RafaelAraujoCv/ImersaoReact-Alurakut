import React from 'react';
import MainGrid from '../src/components/MainGrid'; /* Sempre começar com ./ para saber onde esta na estrutura de pastas  ./ ou ../ */
import Box from '../src/components/Box'; /* Sempre começar com ./ para saber onde esta na estrutura de pastas  ./ ou ../ */
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'; /* Adiciona um componente especifico { xxxxxxxx } */
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  console.log(propriedades);
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

export default function Home() {

  /* NOTA: Usar valores variaveis em React -> {` xxxxxxxxx/${nome_da_variavel} `} */
  /* NOTA: {} para variavel ..... ${} para String */

  /* Valores dinamicos */
  const usuarioAleatorio = 'RafaelAraujoCv'; 
  const [comunidades, setComunidades] = React.useState([{
    id: '000000',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]); //fica olhando as comunidades function handleCriaComunidade(e), caso tenha uma auteracao ele soma e adionona na tela dinamicamente
  // const comunidades = comunidades[0]
  // const alteradorDeComunidades/setComunidades = comunidades[1];

  console.log('Nosso teste ', );
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
              Bem vindo(a)
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

              const comunidade = { //criar objeto com os valores
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }

              //comunidades.push('Alura Stars');
              const comunidadesAtualizadas = [...comunidades, comunidade]; // os 3 pontos adiniona o valor na mesma Array
              setComunidades(comunidadesAtualizadas) // Joga o novo valor la no React.useState 
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
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
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
