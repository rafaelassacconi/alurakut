import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';


function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'rafaelassacconi';

  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <Box>
          <ProfileSidebar githubUser={githubUser} />
        </Box>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
            Bem vindo
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <Box>
          Pessoas da comunidade
        </Box>
      </div>
    </MainGrid>
  )
}
