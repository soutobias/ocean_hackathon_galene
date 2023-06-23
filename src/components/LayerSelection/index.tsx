import { variables } from '../../data/variables'
import { LayerSelectionContainer, SelectButton } from './styles'

interface LayerSelectionProps {
  selectedLayers: any
  setSelectedLayers: any
  setActualLayer: any
  setLayerAction: any
  modelTarget: any
  setColorLegend: any
}

export function LayerSelection({
  selectedLayers,
  setSelectedLayers,
  setActualLayer,
  setLayerAction,
  modelTarget,
  setColorLegend,
}: LayerSelectionProps) {
  function addLayerToMap(variable: any) {
    if (isSelected(variable)) {
      setColorLegend(null)
      setLayerAction('remove')
      setActualLayer(variable)
      setSelectedLayers('')
    } else {
      if (variable === 'Favorable Conditions') {
        setColorLegend([0, 100])
      }
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
      {modelTarget === 'Posidonia oceanica' ? (
        <div key={'Favorable Conditions'} className="pb-4">
          <SelectButton
            className={isSelected('Favorable Conditions') ? 'active' : ''}
            onClick={() => addLayerToMap('Favorable Conditions')}
          >
            <p>Favorable Conditions</p>
          </SelectButton>
        </div>
      ) : null}
    </LayerSelectionContainer>
  )
}
