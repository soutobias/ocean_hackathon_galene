import { LayerSelectionContainer, SelectButton } from '../LayerSelection/styles'

interface PredictionSelectionProps {
  modelTarget: any
  setModelTarget: any
}

export function PredictionSelection({
  modelTarget,
  setModelTarget,
}: PredictionSelectionProps) {
  const targets = ['Posidonia oceanica', 'Whales']

  function handleConfig(target: any) {
    setModelTarget((modelTarget: any) => {
      return modelTarget === target ? '' : target
    })
  }

  function isSelected(target: string) {
    return modelTarget === target
  }

  return (
    <LayerSelectionContainer>
      <h1>ECOSYSTEMS</h1>
      {/* <p className="text-center font-bold pb-3 text-2xl">Model Target</p> */}
      {targets.map((target) => {
        return (
          <div key={target} className="pb-4">
            <SelectButton
              onClick={() => handleConfig(target)}
              className={isSelected(target) ? 'active' : ''}
            >
              <p className={target === 'Posidonia oceanica' ? 'italic' : ''}>
                {target}
              </p>
            </SelectButton>
          </div>
        )
      })}
    </LayerSelectionContainer>
  )
}
