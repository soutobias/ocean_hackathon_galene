// import {
//   faBackward,
//   faForward,
//   faPause,
//   faPlay,
// } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useState } from 'react'
import { yearMonths } from '../../data/yearMonths'
import { years } from '../../data/years'
import { RangeSelectionContainer, RangeValue } from './styles'

interface RangeSelectionProps {
  actualDate: any
  setActualDate: any
  setLayerAction: any
  setActualLayer: any
  selectedLayers: any
  extension: any
}

export function RangeSelection({
  actualDate,
  setActualDate,
  setLayerAction,
  setActualLayer,
  selectedLayers,
  extension,
}: RangeSelectionProps) {
  const startDate = 0
  const endDate = yearMonths.length - 1

  // const [action, setAction] = useState('')

  function handleChange(e: any) {
    if (selectedLayers.empty) {
      return
    }
    setActualLayer(selectedLayers)
    setLayerAction('time')
    setActualDate(e.target.value)
  }

  // const backgroundLimits =

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
        <p>{yearMonths[actualDate]}</p>
      </RangeValue>
      {/* <div className="flex gap-4 justify-center">
        <FontAwesomeIcon
          icon={faBackward}
          onClick={() => handleChangeDate('back')}
          className="h-6"
        />
        <FontAwesomeIcon
          icon={faPlay}
          onClick={() => handleChangeDate('play')}
          className="h-6"
        />
        <FontAwesomeIcon
          icon={faPause}
          onClick={() => handleChangeDate('pause')}
          className="h-6"
        />
        <FontAwesomeIcon
          icon={faForward}
          onClick={() => handleChangeDate('front')}
          className="h-6"
        />
      </div> */}
    </RangeSelectionContainer>
  )
}
