import { yearMonths } from '../../data/yearMonths'
import { SelectButton } from '../LayerSelection/styles'
import { DepthSelectionContainer } from './styles'

interface DepthSelectionProps {
  actualDepth: any
  setActualDepth: any
  setLayerAction: any
  setActualLayer: any
  selectedLayers: any
  actualDate: number
}

export function DepthSelection({
  actualDepth,
  setActualDepth,
  setLayerAction,
  setActualLayer,
  selectedLayers,
  actualDate,
}: DepthSelectionProps) {
  const depths = ['1.0', '5.0', '10.0']

  function addLayerToMap(depth: number) {
    if (isSelected(depth)) {
      return
    }
    if (selectedLayers.empty) {
      return
    }
    setLayerAction('depth')
    setActualLayer(selectedLayers)
    setActualDepth(depth)
  }

  function isSelected(depth: number) {
    return actualDepth === depth
  }

  return (
    <DepthSelectionContainer>
      {depths.map((depth: any) => {
        if (actualDate > yearMonths.indexOf('2021-05') && depth !== '5.0') {
          return (
            <div key={depth} className="mr-4">
              <SelectButton style={{ cursor: 'not-allowed' }} disabled>
                <p>
                  {parseInt(depth) === 1
                    ? `${parseInt(depth)} meter`
                    : `${parseInt(depth)} meters`}
                </p>
              </SelectButton>
            </div>
          )
        } else {
          return (
            <div key={depth} className="mr-4">
              <SelectButton
                className={isSelected(depth) ? 'active' : ''}
                onClick={() => addLayerToMap(depth)}
              >
                <p>
                  {parseInt(depth) === 1
                    ? `${parseInt(depth)} meter`
                    : `${parseInt(depth)} meters`}
                </p>
              </SelectButton>
            </div>
          )
        }
      })}
    </DepthSelectionContainer>
  )
}
