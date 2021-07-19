import React from 'react';
import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(properties) {
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`} target="_blank">
          @{properties.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />      
    </Box>
  )
}


function ProfileRelationsBox(properties) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>
      <ul>
         {properties.items.slice(0, 6).map((item) => {
          return (
            <li key={item.id}>
              <a href={`https://github.com/${item.login}`} target="_blank">
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'rafaelassacconi';

  // Communities
  const [communities, setCommunities] = React.useState([]);

  React.useEffect(function() {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': process.env.DATO_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          link
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((responseFinal) => {
      setCommunities(responseFinal.data.allCommunities);
    })
  }, [])

  // Followers
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/rafaelassacconi/followers')
    .then((response) => response.json())
    .then((responseFinal) => {
      setFollowers(responseFinal);
    })
    }, [])

  // Favorite People
  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>
            <OrkutNostalgicIconSet 
              recados={305}
              fotos={56}
              videos={2}
              fas={1}
              mensagens={7}
              confiavel={3}
              legal={3}
              sexy={3}
            />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCreateCommunity(e) {
                e.preventDefault();
                const formData = new FormData(e.target);

                console.log('Campo: ', formData.get('title'));
                console.log('Campo: ', formData.get('image'));

                const community = {
                  title: formData.get('title'),
                  link: formData.get('link'),
                  imageUrl: formData.get('image'),
                  creatorSlug: githubUser,
                }

                fetch('/api/communities', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(community)
                })
                .then(async (response) => {
                  const data = await response.json();
                  const community = data.createdData;
                  const updatedCommunity = [...communities, community];
                  setCommunities(updatedCommunity)
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
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para o link da comunidade"
                  name="link"
                  aria-label="Coloque uma URL para o link da comunidade"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>

          </Box>

        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={item.link} target="_blank">
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>

            <ul>
              {favoritePeople.map((item) => {
                return (
                  <li key={item}>
                    <a href={`https://github.com/${item}`} target="_blank">
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
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
