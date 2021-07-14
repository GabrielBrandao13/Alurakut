import { useEffect, useState } from 'react';
import { MainGrid, DivArea } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper, ProfilePicture } from '../src/components/ProfileRelations';


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

function ProfileRelationsBox({ title, items, parsedItems }) {
  return (
    <ProfileRelationsBoxWrapper>

      <h2>{title} ({items.length})</h2>

      <ul>
        {parsedItems.map(item => {
          return (
            <ProfilePicture
              key={item.id}
              link={item.link}
              title={item.title}
              image={item.image}
            />
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home({ seguidores }) {
  const usuario = 'GabrielBrandao13';

  const [comunidades, setComunidades] = useState([])
  const parsedComunidades = comunidades.slice(0, 6)

  const parsedSeguidores = seguidores.slice(0, 6).map(seguidor => {
    return {
      id: seguidor.id,
      link: `https://github.com/${seguidor.login}`,
      title: seguidor.login,
      image: `https://github.com/${seguidor.login}.png`
    }
  })

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
          <ProfileRelationsBox title="Seguidores" items={seguidores} parsedItems={parsedSeguidores} />
          <ProfileRelationsBoxWrapper>

            <ul>

              {parsedComunidades.map(comunidade => {
                return (
                  <ProfilePicture
                    key={comunidade.id}
                    link=""
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
                    link={`https://github.com/${pessoa}`}
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

export async function getServerSideProps() {
  const seguidores = await fetch('https://api.github.com/users/peas/followers')
  const parsedSeguidores = await seguidores.json()
  return {
    props: {
      seguidores: parsedSeguidores
    }
  }
}
