import { variables } from '../../data/variables'
import { LayerSelectionContainer, SelectButton } from './styles'

interface LayerSelectionProps {
  selectedLayers: any
  setSelectedLayers: any
  setActualLayer: any
  setLayerAction: any
  modelTarget: any
}

export function LayerSelection({
  selectedLayers,
  setSelectedLayers,
  setActualLayer,
  setLayerAction,
  modelTarget,
}: LayerSelectionProps) {
  function addLayerToMap(variable: any) {
    if (isSelected(variable)) {
      setLayerAction('remove')
      setActualLayer(variable)
      setSelectedLayers('')
    } else {
      setLayerAction('add')
      setActualLayer(variable)
      setSelectedLayers(variable)
    }
  }
  function isSelected(variable: string) {
    return selectedLayers === variable
  }

  return (
    <LayerSelectionContainer>
      <h1>FEATURES</h1>
      {Object.keys(variables).map((variable) => {
        if (modelTarget === 'Whales' && variable === 'zos') {
          return <></>
        } else {
          return (
            <div key={variable} className="pb-4">
              <SelectButton
                className={isSelected(variable) ? 'active' : ''}
                onClick={() => addLayerToMap(variable)}
              >
                <p>{variables[variable][0]}</p>
              </SelectButton>
            </div>
          )
        }
      })}
      {modelTarget ? (
        <div key={'Feature Combination'} className="pb-4">
          <SelectButton
            className={isSelected('Feature Combination') ? 'active' : ''}
            onClick={() => addLayerToMap('Feature Combination')}
          >
            <p>Feature Combination</p>
          </SelectButton>
        </div>
      ) : null}
    </LayerSelectionContainer>
  )
}
