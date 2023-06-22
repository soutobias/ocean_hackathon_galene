import { MapHome } from '../../components/MapHome'
import { RangeSelection } from '../../components/RangeSelection'
import { SideSelection } from '../../components/SideSelection'
import { BottomBar, HomeContainer, SideBar, TopRightBar } from './styles'
import { yearMonth } from '../../components/RangeSelection/months'
import { useState } from 'react'
import { DepthSelection } from '../../components/DepthSelection'
import { ColorBar } from '../../components/ColorBar'

export function Home() {
  const [selectedLayers, setSelectedLayers] = useState([])
  const [actualLayer, setActualLayer] = useState([])
  const [actualDate, setActualDate] = useState(yearMonth.length - 1)
  const [actualDepth, setActualDepth] = useState('1.0')
  const [layerAction, setLayerAction] = useState('')

  const [colorLegend, setColorLegend] = useState(null)

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
        {colorLegend ? (
          <>
            <DepthSelection
              actualDepth={actualDepth}
              setActualDepth={setActualDepth}
              setLayerAction={setLayerAction}
              setActualLayer={setActualLayer}
              selectedLayers={selectedLayers}
            ></DepthSelection>
            <ColorBar
              colorLegend={colorLegend}
              setColorLegend={setColorLegend}
            />
          </>
        ) : null}
      </TopRightBar>
      <MapHome
        selectedLayers={selectedLayers}
        actualLayer={actualLayer}
        actualDate={actualDate}
        layerAction={layerAction}
        setLayerAction={setLayerAction}
        actualDepth={actualDepth}
        setColorLegend={setColorLegend}
      />
    </HomeContainer>
  )
}
