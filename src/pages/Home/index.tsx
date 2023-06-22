import { MapHome } from '../../components/MapHome'
import { RangeSelection } from '../../components/RangeSelection'
import { SideSelection } from '../../components/SideSelection'
import { BottomBar, HomeContainer, SideBar } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <SideBar>
        <SideSelection />
      </SideBar>
      <BottomBar>
        <RangeSelection />
      </BottomBar>
      <MapHome />
    </HomeContainer>
  )
}
