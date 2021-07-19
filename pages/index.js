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
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
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
         {/* properties.items.map((item) => {
           console.log(item);
          return (
            <li key={item}>
              <a href={`https://github.com/${item.avatar_url}`}>
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'rafaelassacconi';


  const myCommunities = [{
    id: '12802378123789378912789789123896123', 
    title: 'Queria sorvete, mas era feijão',
    image: 'https://picsum.photos/90/110?random=1'
  },
  {
    id: '12802378123789378912789789123896124', 
    title: 'Eu abro a geladeira pra pensar',
    image: 'https://picsum.photos/90/110?random=2'
  },
  {
    id: '12802378123789378912789789123896125', 
    title: 'Só observo',
    image: 'https://picsum.photos/90/110?random=3'
  }]

  const [communities, setCommunities] = React.useState(myCommunities);

  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/rafaelassacconi/followers')
    .then(function (responseServer) {
      return responseServer.json();
    })
    .then(function(responseFinal) {
      setFollowers(responseFinal);
    })
  }, [])

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
              const community = {
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image'),
              }
              const updatedCommunities = [...communities, community];
              setCommunities(updatedCommunities);
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
                    <a href={`/users/${item.title}`}>
                      <img src={item.image} />
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
                    <a href={`/users/${item}`}>
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
