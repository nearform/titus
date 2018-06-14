import React from 'react'
import { VictoryArea, VictoryChart, VictoryStack, VictoryTheme } from 'victory'

const random = (lower, upper) => Math.floor((Math.random() * (upper - lower + 1)) + lower)

const areaData =
  Array.from(Array(7)).map(() => [
    { x: 1, y: random(1, 5) },
    { x: 2, y: random(1, 10) },
    { x: 3, y: random(2, 10) },
    { x: 4, y: random(2, 10) },
    { x: 5, y: random(2, 15) }
  ])

const Area = () => (
  <VictoryChart
    theme={VictoryTheme.material}
  >
    <VictoryStack
      colorScale={'blue'}
    >
      {areaData.map((data, i) => (
        <VictoryArea
          key={i}
          data={data}
          interpolation={'basis'}
        />
      ))}
    </VictoryStack>
  </VictoryChart>
)

export default Area
