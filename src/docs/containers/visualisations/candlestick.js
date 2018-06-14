import React from 'react'
import { VictoryAxis, VictoryCandlestick, VictoryChart, VictoryTheme } from 'victory'

const candlestickData = [
  { x: new Date(2016, 6, 1), open: 9, close: 30, high: 56, low: 7 },
  { x: new Date(2016, 6, 2), open: 80, close: 40, high: 120, low: 10 },
  { x: new Date(2016, 6, 3), open: 50, close: 80, high: 90, low: 20 },
  { x: new Date(2016, 6, 4), open: 70, close: 22, high: 70, low: 5 },
  { x: new Date(2016, 6, 5), open: 20, close: 35, high: 50, low: 10 },
  { x: new Date(2016, 6, 6), open: 35, close: 30, high: 40, low: 3 },
  { x: new Date(2016, 6, 7), open: 30, close: 90, high: 95, low: 30 },
  { x: new Date(2016, 6, 8), open: 80, close: 81, high: 83, low: 75 }
]

const Candlestick = () => (
  <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={{ x: 25 }}
    scale={{ x: 'time' }}
  >
    <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
    <VictoryAxis dependentAxis />
    <VictoryCandlestick
      candleColors={{ positive: '#5f5c5b', negative: '#c43a31' }}
      data={candlestickData}
    />
  </VictoryChart>
)

export default Candlestick
