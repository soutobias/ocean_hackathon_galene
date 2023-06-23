import {
  SideSelectionContainer,
  SideSelectionExtension,
  SideSelectionLink,
  SideSelectionSide,
} from './styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalculator,
  faChartLine,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import { LayerSelection } from '../LayerSelection'
import { PredictionSelection } from '../PredictionSelection'

interface SideSelectionProps {
  selectedLayers: any
  setSelectedLayers: any
  actualLayer: any
  setActualLayer: any
  layerAction: any
  setLayerAction: any
  modelTarget: any
  setModelTarget: any
  extension: any
  setExtension: any
}

export function SideSelection({
  selectedLayers,
  setSelectedLayers,
  setActualLayer,
  setLayerAction,
  modelTarget,
  setModelTarget,
  extension,
  setExtension,
}: SideSelectionProps) {
  function handleAddExtension(value: string) {
    setExtension((extension: any) => (extension === value ? '' : value))
  }
  return (
    <SideSelectionContainer>
      <SideSelectionSide>
        <SideSelectionLink
          title={'Model Configuration'}
          onClick={() => handleAddExtension('model')}
        >
          <FontAwesomeIcon icon={faCalculator} />
          {/* <FontAwesomeIcon icon={faChartLine} /> */}
        </SideSelectionLink>
        <SideSelectionLink
          title={'Model Inputs'}
          onClick={() => handleAddExtension('layer')}
        >
          <FontAwesomeIcon icon={faLayerGroup} />
        </SideSelectionLink>
        <SideSelectionLink
          title={'Model Configuration'}
          onClick={() => handleAddExtension('result')}
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
            modelTarget={modelTarget}
          />
        </SideSelectionExtension>
      ) : extension === 'model' ? (
        <SideSelectionExtension>
          <PredictionSelection
            modelTarget={modelTarget}
            setModelTarget={setModelTarget}
          ></PredictionSelection>
        </SideSelectionExtension>
      ) : extension === 'result' ? (
        <SideSelectionExtension>
          <LayerSelection
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
            setActualLayer={setActualLayer}
            setLayerAction={setLayerAction}
            modelTarget={modelTarget}
          />
        </SideSelectionExtension>
      ) : null}
    </SideSelectionContainer>
  )
}
