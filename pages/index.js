import { useState } from 'react';
import { MainGrid, DivArea } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

import { ProfilePicture } from '../src/components/ProfilePicture';


function ProfileSideBar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>

        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>


      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuario = 'GabrielBrandao13';

  const [comunidades, setComunidades] = useState([])

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'diego3g',
  ]

  const parsedPessoasFavoritas = pessoasFavoritas.slice(0, 6)

  return (
    <>
      <AlurakutMenu githubUser={usuario} />
      <MainGrid>
        <DivArea area="profile" className="profile">

          <ProfileSideBar githubUser={usuario} />

        </DivArea>

        <DivArea area="welcome" className="welcome">
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={e => {
              e.preventDefault()

              const formData = new FormData(e.target)

              const comunidade = {
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image')
              }

              setComunidades([...comunidades, comunidade])
            }}>
              <div>

                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />

              </div>
              <div>

                <input
                  type="text"
                  placeholder="Coloque uma url para usar de capa"
                  name="image"
                  aria-label="Coloque uma url para usar de capa"
                />

              </div>

              <button type="submit">
                Criar comunidade
              </button>
            </form>
          </Box>

        </DivArea>
        <DivArea area="communities" className="communities">
          <ProfileRelationsBoxWrapper>

            <ul>

              {comunidades.map(comunidade => {
                return (
                  <ProfilePicture
                    key={comunidade.id}
                    link="https://github.com"
                    title={comunidade.title}
                    image={comunidade.image}
                  />
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>

              {parsedPessoasFavoritas.map(pessoa => {
                return (
                  <ProfilePicture
                    key={pessoa}
                    link="https://github.com"
                    title={pessoa}
                    image={`https://github.com/${pessoa}.png`}
                  />
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>

        </DivArea>

      </MainGrid>
    </>
  )
}
