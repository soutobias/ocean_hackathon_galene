import { RangeSelectionContainer } from './styles'
import { useState } from 'react'
// import InputRange from 'react-input-range';

// interface SideSelectionProps {
// }

export function RangeSelection() {
  const startDate = new Date('2018-01-01 00:00:00').getTime() / 1000
  const endDate = new Date('2021-01-01 00:00:00').getTime() / 1000
  const totalSeconds = endDate - startDate
  const step = 60 * 60 * 24 * 30
  const [dateRange, setDateRange] = useState(startDate)

  function handleChange(e: any) {
    setDateRange(e.target.value)
    // rangeBullet.style.left = (bulletPosition*98) + "%";
    // var value = (rangeSlider.value-rangeSlider.min)/(rangeSlider.max-rangeSlider.min)*100
    // rangeSlider.style.background = 'linear-gradient(to right, rgb(130, 207, 208) 0%, rgb(130, 207, 208) ' + value + '%, #fff ' + value + '%, white 100%)'
  }
  console.log(dateRange)
  console.log(totalSeconds)
  console.log((dateRange - startDate) / totalSeconds)
  return (
    <RangeSelectionContainer>
      <input
        type="range"
        min={startDate}
        max={endDate}
        step={step}
        style={{
          background: `linear-gradient(to right, #138a8a 0%, #138a8a ${Math.floor(
            ((dateRange - startDate) / totalSeconds) * 100,
          )}%, #fff ${Math.floor(
            ((dateRange - startDate) / totalSeconds) * 100,
          )}%, white 100%)`,
        }}
        value={dateRange}
        onChange={handleChange}
        className="w-full large-range"
      />
    </RangeSelectionContainer>
  )
}
