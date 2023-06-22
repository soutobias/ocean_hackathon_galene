import { LayerSelectionContainer, SelectButton } from './styles'

interface LayerSelectionProps {
  selectedLayers: any
  setSelectedLayers: any
  setActualLayer: any
  setLayerAction: any
}

export function LayerSelection({
  selectedLayers,
  setSelectedLayers,
  setActualLayer,
  setLayerAction,
}: LayerSelectionProps) {
  const variables: any = {
    chl: 'Chlorophyll',
    phyc: 'Phytoplankton',
    no3: 'Nitrogen',
    po4: 'Phosporus',
    o2: 'Dissolved Oxigen',
    ph: 'PH',
    so: 'Salinity',
    zos: 'Water Level ',
    avg_temp_C: 'Mean Temperature (°C)',
  }

  function addLayerToMap(variable: any) {
    if (isSelected(variable)) {
      setLayerAction('remove')
      setActualLayer([variable])
      setSelectedLayers((selectedLayers: any) => {
        const copy = [...selectedLayers]
        return copy.filter(function (e) {
          return e !== variable
        })
      })
    } else {
      setLayerAction('add')
      setActualLayer(variable)
      setSelectedLayers([...selectedLayers, variable])
    }
  }
  function isSelected(variable: string) {
    if (selectedLayers.includes(variable)) {
      return true
    }
    return false
  }

  return (
    <LayerSelectionContainer>
      <h1>MODEL INPUTS</h1>
      {Object.keys(variables).map((variable) => {
        return (
          <div key={variable} className="pb-4">
            <SelectButton
              className={isSelected(variable) ? 'active' : ''}
              onClick={() => addLayerToMap(variable)}
            >
              <p>{variables[variable]}</p>
            </SelectButton>
          </div>
        )
      })}
    </LayerSelectionContainer>
  )
}
