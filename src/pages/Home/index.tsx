import { MapHome } from '../../components/MapHome'
import { RangeSelection } from '../../components/RangeSelection'
import { SideSelection } from '../../components/SideSelection'
import { BottomBar, HomeContainer, SideBar, TopRightBar } from './styles'
import { useState } from 'react'
import { DepthSelection } from '../../components/DepthSelection'
import { ColorBar } from '../../components/ColorBar'
import { yearMonths } from '../../data/yearMonths'
import { GraphPopup } from '../../components/GraphPopup'

export function Home() {
  const [selectedLayers, setSelectedLayers] = useState('')
  const [actualLayer, setActualLayer] = useState('')
  const [actualDate, setActualDate] = useState(yearMonths.indexOf('2021-05'))
  const [actualDepth, setActualDepth] = useState('1.0')
  const [layerAction, setLayerAction] = useState('')

  const [colorLegend, setColorLegend] = useState(null)

  const [modelTarget, setModelTarget] = useState('')

  const [extension, setExtension] = useState('')
  const [showGraph, setShowGraph] = useState('')
  const [clickPoint, setClickPoint] = useState(false)

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
          modelTarget={modelTarget}
          setModelTarget={setModelTarget}
          extension={extension}
          setExtension={setExtension}
          setColorLegend={setColorLegend}
        />
      </SideBar>
      <BottomBar>
        {selectedLayers &&
        selectedLayers !== 'Posidonia oceanica' &&
        selectedLayers !== 'gebco' ? (
          <RangeSelection
            actualDate={actualDate}
            setActualDate={setActualDate}
            setLayerAction={setLayerAction}
            setActualLayer={setActualLayer}
            selectedLayers={selectedLayers}
            extension={extension}
            setActualDepth={setActualDepth}
          />
        ) : null}
      </BottomBar>
      <TopRightBar>
        {colorLegend && selectedLayers !== 'Posidonia oceanica' ? (
          <>
            {selectedLayers !== 'gebco' ? (
              <DepthSelection
                actualDepth={actualDepth}
                setActualDepth={setActualDepth}
                setLayerAction={setLayerAction}
                setActualLayer={setActualLayer}
                selectedLayers={selectedLayers}
                actualDate={actualDate}
                setClickPoint={setClickPoint}
              ></DepthSelection>
            ) : null}
            <ColorBar
              colorLegend={colorLegend}
              selectedLayers={selectedLayers}
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
        modelTarget={modelTarget}
        clickPoint={clickPoint}
        setClickPoint={setClickPoint}
        setShowGraph={setShowGraph}
      />
      {showGraph ? (
        <GraphPopup
          showGraph={showGraph}
          actualLayer={actualLayer}
          actualDepth={actualDepth}
          setShowGraph={setShowGraph}
        ></GraphPopup>
      ) : null}
    </HomeContainer>
  )
}
