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

  console.log(modelTarget)
  return (
    <LayerSelectionContainer>
      <h1>MODEL INPUTS</h1>
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
    </LayerSelectionContainer>
  )
}
