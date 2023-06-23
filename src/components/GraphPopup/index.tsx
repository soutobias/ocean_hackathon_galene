import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FullPagePopupContainer } from './styles'
import { variables } from '../../data/variables'
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from 'victory'
import { SelectButton } from '../LayerSelection/styles'
import { useState } from 'react'

interface GraphPopupProps {
  showGraph: any
  actualLayer: any
  actualDepth: any
  setShowGraph: any
}

export function GraphPopup({
  showGraph,
  actualLayer,
  actualDepth,
  setShowGraph,
}: GraphPopupProps) {
  function handleClose() {
    setShowGraph(false)
  }

  const [dumbState, setDumbState] = useState(false)

  function changeStateToShowGraph() {
    setDumbState(true)
  }

  return (
    <FullPagePopupContainer>
      <div className="w-[40rem] align-middle text-center">
        <FontAwesomeIcon icon={faCircleXmark} onClick={handleClose} />
        <h2 className="text-center font-bold pb-3 capitalize text-3xl">
          {variables[actualLayer][1]
            ? `${variables[actualLayer][0]} (${variables[actualLayer][1]} ) - ${actualDepth} meters`
            : `${variables[actualLayer][0]} - ${actualDepth} meters`}
        </h2>
      </div>
      {!dumbState ? (
        <div>
          <SelectButton onClick={changeStateToShowGraph}>
            <p>Click here to show graph</p>
          </SelectButton>
        </div>
      ) : showGraph.length === 0 ? (
        <div>
          <p>No data for this point. Please try again...</p>
        </div>
      ) : (
        <VictoryChart
          theme={VictoryTheme.material}
          padding={50}
          width={600}
          style={{
            parent: {
              height: '60%',
              width: '90%',
            },
          }}
        >
          <VictoryAxis
            dependentAxis
            label={
              variables[actualLayer][1]
                ? `${variables[actualLayer][0]} (${variables[actualLayer][1]} )`
                : `${variables[actualLayer][0]}`
            }
            style={{
              axis: { stroke: 'white', fill: 'white', color: 'white' },
              axisLabel: {
                fontSize: 15,
                padding: 40,
                color: 'white',
                fill: 'white',
              },
              grid: {
                stroke: ({ tick }: any) => (tick > 0.5 ? 'gray' : 'white'),
              },
              ticks: { stroke: 'white', size: 5 },
              tickLabels: {
                fontSize: 15,
                padding: 5,
                color: 'white',
                fill: 'white',
              },
            }}
          />
          <VictoryAxis
            label="Time (years)"
            tickFormat={(x) => new Date(x).getFullYear()}
            style={{
              axis: { stroke: 'white', fill: 'white' },
              axisLabel: {
                fontSize: 15,
                padding: 30,
                color: 'white',
                fill: 'white',
              },
              grid: {
                stroke: ({ tick }: any) => (tick > 0.5 ? 'gray' : 'white'),
              },
              ticks: { stroke: 'white', size: 5 },
              tickLabels: {
                fontSize: 15,
                padding: 5,
                color: 'white',
                fill: 'white',
              },
            }}
          />
          <VictoryLine
            padding={0}
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' },
            }}
            data={showGraph}
          />
        </VictoryChart>
      )}
    </FullPagePopupContainer>
  )
}
