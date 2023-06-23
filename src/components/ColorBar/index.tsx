import chroma from 'chroma-js'
import { ColorBarContainer, ColorBarItem } from './styles'
import { variables } from '../../data/variables'

interface ColorBarProps {
  colorLegend: any
  selectedLayers: any
}

export function ColorBar({ colorLegend, selectedLayers }: ColorBarProps) {
  let scale: any

  if (!selectedLayers || selectedLayers === 'Posidonia oceanica') {
    return <></>
  }

  function linspace(start: number, stop: number, num: number, endpoint = true) {
    const div = endpoint ? num - 1 : num
    const step = (stop - start) / div
    return Array.from({ length: num }, (_, i) => start + step * i)
  }
  let values = linspace(colorLegend[0], colorLegend[1], 20)
  if (colorLegend[0] === 0 && colorLegend[1] === 100) {
    scale = [
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#09ff00',
      '#707070',
      '#707070',
      '#707070',
      '#707070',
      '#707070',
      '#707070',
      '#707070',
      '#707070',
      '#707070',
      '#707070',
    ]
    values = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]
  } else {
    scale = chroma.scale(variables[selectedLayers][3]).domain(colorLegend)
  }

  return (
    <ColorBarContainer>
      {colorLegend[0] === 0 && colorLegend[1] === 100 ? (
        <>
          <div className="flex justify-center font-extrabold gap-3">
            <p className="text-white text-lg">Favorable Conditions</p>
            <p className="text-white text-lg"></p>
          </div>
          <div className="flex justify-between font-extrabold">
            <p className="text-white text-lg">YES</p>
            <p className="text-white text-lg">NO</p>
          </div>
          <div className="flex">
            {values.map((value) => (
              <ColorBarItem
                key={value}
                style={{ backgroundColor: scale[value] }}
              >
                <p>=</p>
              </ColorBarItem>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center font-extrabold gap-3">
            <p className="text-white text-lg">{variables[selectedLayers][0]}</p>
            <p className="text-white text-lg">{variables[selectedLayers][1]}</p>
          </div>
          <div className="flex justify-between font-extrabold">
            <p className="text-white text-lg">{colorLegend[0].toFixed(2)}</p>
            <p className="text-white text-lg">{colorLegend[1].toFixed(2)}</p>
          </div>
          <div className="flex">
            {values.map((value) => (
              <ColorBarItem
                key={value}
                style={{ backgroundColor: scale(value).hex() }}
              >
                <p>=</p>
              </ColorBarItem>
            ))}
          </div>
        </>
      )}
    </ColorBarContainer>
  )
}
