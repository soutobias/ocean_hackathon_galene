import { RangeSelectionContainer, RangeValue } from './styles'
import { yearMonth } from './months'
// import InputRange from 'react-input-range';

interface RangeSelectionProps {
  actualDate: any
  setActualDate: any
  setLayerAction: any
  setActualLayer: any
  selectedLayers: any
}

export function RangeSelection({
  actualDate,
  setActualDate,
  setLayerAction,
  setActualLayer,
  selectedLayers,
}: RangeSelectionProps) {
  const startDate = 0
  const endDate = yearMonth.length - 1

  function handleChange(e: any) {
    if (selectedLayers.empty) {
      return
    }
    setLayerAction('time')
    setActualLayer(Object.keys(selectedLayers))
    setActualDate(e.target.value)
  }
  const years = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020, 2021,
  ]

  return (
    <RangeSelectionContainer>
      <div className="flex w-full justify-between pb-3">
        {years.map((year: any) => {
          return (
            <div key={year} className="text-center font-extrabold">
              <p>{year}</p>
              <p className="text-xs">|</p>
            </div>
          )
        })}
      </div>
      <input
        type="range"
        min={startDate}
        max={endDate}
        step={1}
        style={{
          background: `linear-gradient(to right, #138a8a 0%, #138a8a ${Math.floor(
            ((actualDate - startDate) / endDate) * 100,
          )}%, #fff ${Math.floor(
            ((actualDate - startDate) / endDate) * 100,
          )}%, white 100%)`,
        }}
        value={actualDate}
        onChange={handleChange}
        className="w-full large-range"
      />
      <RangeValue
        style={{
          marginLeft: `${Math.floor(
            ((actualDate - startDate) / (endDate + 10)) * 100,
          )}%`,
        }}
      >
        <p>{yearMonth[actualDate]}</p>
      </RangeValue>
    </RangeSelectionContainer>
  )
}
