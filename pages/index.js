import { MainGrid, DivArea } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const usuario = 'GabrielBrandao13';

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <DivArea area="profile" className="profile">

          <ProfileSideBar githubUser={usuario} />

        </DivArea>

        <DivArea area="welcome" className="welcome">
          <Box>
            <h1 className="title">
              Bem vindo(a), {usuario}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

        </DivArea>
        <DivArea area="communities" className="communities">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>

              {pessoasFavoritas.map(pessoa => {
                return (
                  <li key={pessoa}>
                    <a href={`https://github.com/${pessoa}`}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>

                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>

        </DivArea>

      </MainGrid>
    </>
  )
}
