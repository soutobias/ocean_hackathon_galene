import { MapHome } from '../../components/MapHome'
import { RangeSelection } from '../../components/RangeSelection'
import { SideSelection } from '../../components/SideSelection'
import { BottomBar, HomeContainer, SideBar, TopRightBar } from './styles'
import { yearMonth } from '../../components/RangeSelection/months'
import { useState } from 'react'
import { DepthSelection } from '../../components/DepthSelection'

export function Home() {
  const [selectedLayers, setSelectedLayers] = useState([])
  const [actualLayer, setActualLayer] = useState([])
  const [actualDate, setActualDate] = useState(yearMonth.length - 1)
  const [actualDepth, setActualDepth] = useState('1.0')
  const [layerAction, setLayerAction] = useState('')

  return (
    <HomeContainer>
      <SideBar>
        <SideSelection
          selectedLayers={selectedLayers}
          setSelectedLayers={setSelectedLayers}
          actualLayer={actualLayer}
          setActualLayer={setActualLayer}
          layerAction={layerAction}
          setLayerAction={setLayerAction}
        />
      </SideBar>
      <BottomBar>
        <RangeSelection
          actualDate={actualDate}
          setActualDate={setActualDate}
          setLayerAction={setLayerAction}
          setActualLayer={setActualLayer}
          selectedLayers={selectedLayers}
        />
      </BottomBar>
      <TopRightBar>
        <DepthSelection
          actualDepth={actualDepth}
          setActualDepth={setActualDepth}
          setLayerAction={setLayerAction}
          setActualLayer={setActualLayer}
          selectedLayers={selectedLayers}
        ></DepthSelection>
      </TopRightBar>
      <MapHome
        selectedLayers={selectedLayers}
        actualLayer={actualLayer}
        actualDate={actualDate}
        layerAction={layerAction}
        setLayerAction={setLayerAction}
        actualDepth={actualDepth}
      />
    </HomeContainer>
  )
}
