import {
  SideSelectionContainer,
  SideSelectionExtension,
  SideSelectionLink,
  SideSelectionSide,
} from './styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { LayerSelection } from '../LayerSelection'
import { PredictionSelection } from '../PredictionSelection'

interface SideSelectionProps {
  selectedLayers: any
  setSelectedLayers: any
  actualLayer: any
  setActualLayer: any
  layerAction: any
  setLayerAction: any
}

export function SideSelection({
  selectedLayers,
  setSelectedLayers,
  setActualLayer,
  setLayerAction,
}: SideSelectionProps) {
  const [extension, setExtension] = useState('')

  function handleAddExtension(value: string) {
    setExtension((extension) => (extension === value ? '' : value))
  }
  return (
    <SideSelectionContainer>
      <SideSelectionSide>
        <SideSelectionLink
          title={'Add Layers'}
          id={'Data Exploration'}
          onClick={() => handleAddExtension('layer')}
        >
          <FontAwesomeIcon icon={faLayerGroup} />
        </SideSelectionLink>
        <SideSelectionLink
          title={'Add Layers'}
          id={'Data Exploration'}
          onClick={() => handleAddExtension('model')}
        >
          <FontAwesomeIcon icon={faChartLine} />
        </SideSelectionLink>
        <img src="favicon_galene.png" className="absolute bottom-7 h-10" />
      </SideSelectionSide>
      {extension === 'layer' ? (
        <SideSelectionExtension>
          <LayerSelection
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
            setActualLayer={setActualLayer}
            setLayerAction={setLayerAction}
          />
        </SideSelectionExtension>
      ) : extension === 'model' ? (
        <SideSelectionExtension>
          <PredictionSelection></PredictionSelection>
        </SideSelectionExtension>
      ) : null}
    </SideSelectionContainer>
  )
}
