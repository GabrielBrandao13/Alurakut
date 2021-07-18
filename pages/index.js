import { useState } from 'react';
import { MainGrid, DivArea } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper, ProfilePicture } from '../src/components/ProfileRelations';

import jwt from 'jsonwebtoken';

import nookies from 'nookies'


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

function ProfileRelationsBox({ title, items }) {
  const parsedItems = items.slice(0, 6)
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

export default function Home({ seguidores, communities, githubUser }) {
  const [comunidades, setComunidades] = useState(communities)

  const parsedComunidades = comunidades.slice(0, 6).map(comunidade => {
    return {
      id: comunidade.id,
      title: comunidade.title,
      image: comunidade.imageUrl
    }
  })

  const parsedSeguidores = seguidores.map(seguidor => {
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
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <DivArea area="profile" className="profile">

          <ProfileSideBar githubUser={githubUser} />

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

            <form onSubmit={async (e) => {
              e.preventDefault()

              const formData = new FormData(e.target)

              const comunidade = {
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                creatorSlug: 'GabrielBrandao13'
              }

              const res = await fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              const dados = await res.json()

              // console.log(dados.registro)

              const newComunidade = dados.registro

              setComunidades([...comunidades, newComunidade])
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
          <ProfileRelationsBox title="Seguidores" items={parsedSeguidores} />
          <ProfileRelationsBoxWrapper>

            <h2>Comunidades ({comunidades.length})</h2>

            <ul>

              {parsedComunidades.map(comunidade => {
                return (
                  <ProfilePicture
                    key={comunidade.id}
                    link={`/comunidades/${comunidade.id}`}
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN



  const resAuth = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })

  const completeAuth = await resAuth.json()
  const auth = completeAuth.isAuthenticated

  const comunidadesCompletas = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': 'e94b2d0460e898589bbb3738a972a6',
      'Content-Type': 'aplication/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "query": `query {
        allComunnities {
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
  })

  const parsedComunidadesCompletas = await comunidadesCompletas.json()
  // console.log(parsedComunidadesCompletas)

  const comunidades = parsedComunidadesCompletas.data.allComunnities

  if (!auth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token)

  const resFollowers = await fetch(`https://api.github.com/users/${githubUser}/followers`)
  const seguidores = await resFollowers.json()

  return {
    props: {
      seguidores,
      communities: comunidades,
      githubUser
    }
  }
}
