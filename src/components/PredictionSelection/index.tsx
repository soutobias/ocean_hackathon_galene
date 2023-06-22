import { LayerSelectionContainer, SelectButton } from '../LayerSelection/styles'

// interface SideSelectionProps {
// }

export function PredictionSelection() {
  const variables: any = {
    prediction: 'Prediction',
  }

  function addLayerToMap(variable: any) {
    console.log(variable)
  }

  return (
    <LayerSelectionContainer>
      <h1>MODEL RESULTS</h1>
      {Object.keys(variables).map((variable) => {
        return (
          <div key={variable} className="pb-4">
            <SelectButton onClick={() => addLayerToMap(variable)}>
              <p>{variables[variable]}</p>
            </SelectButton>
          </div>
        )
      })}
    </LayerSelectionContainer>
  )
}
