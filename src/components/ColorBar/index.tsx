import chroma from 'chroma-js'
import { ColorBarContainer, ColorBarItem } from './styles'

interface ColorBarProps {
  colorLegend: any
  setColorLegend: any
}

export function ColorBar({ colorLegend }: ColorBarProps) {
  console.log(colorLegend)

  const scale = chroma
    .scale(['#FFFFD4', '#FE9F59', '#E0E0E0'])
    .domain(colorLegend)

  function linspace(start: number, stop: number, num: number, endpoint = true) {
    const div = endpoint ? num - 1 : num
    const step = (stop - start) / div
    return Array.from({ length: num }, (_, i) => start + step * i)
  }
  const values = linspace(colorLegend[0], colorLegend[1], 20)

  return (
    <ColorBarContainer>
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
    </ColorBarContainer>
  )
}
