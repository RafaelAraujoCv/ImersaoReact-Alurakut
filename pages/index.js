import MainGrid from '../src/components/MainGrid'; /* Sempre começar com ./ para saber onde esta na estrutura de pastas  ./ ou ../ */
import Box from '../src/components/Box'; /* Sempre começar com ./ para saber onde esta na estrutura de pastas  ./ ou ../ */
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'; /* Adiciona um componente especifico { xxxxxxxx } */
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}></img> {/* stylo fixo na TAG */ }
    </Box>
  )
}

export default function Home() {

  /* NOTA: Usar valores variaveis em React -> {` xxxxxxxxx/${nome_da_variavel} `} */
  /* NOTA: {} para variavel ..... ${} para String */

  { /* Valores dinamicos */ }
  const usuarioAleatorio = 'RafaelAraujoCv'; 
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}> {/* Importando do CSS */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2> 
          
            <ul>
              {pessoasFavoritas.map((itemAtual) => { { /* .map => Transforma um Array e retorna Array transformada */ }
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`http://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
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
