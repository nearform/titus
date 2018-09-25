import React, { Fragment } from 'react'
import { Group } from '@vx/group'
import { Cluster } from '@vx/hierarchy'
import { LinkVerticalStep } from '@vx/shape'
import { LinearGradient } from '@vx/gradient'
import { Text } from '@vx/text'
import { hierarchy } from 'd3-hierarchy'
import uuid from 'uuid'
import generateName from 'sillyname'
import RefreshIcon from '@material-ui/icons/Refresh'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const generateTree = ({ depth = 4, maxChildren = 2, prev }) => {
  if (depth === 0) {
    return
  }

  const newNode = {
    id: uuid.v4(),
    name: generateName(),
    children: [],
    _children: []
  }
  
  if (prev) prev.children.push(newNode)
  
  const noOfChildren = Math.floor(Math.random() * maxChildren + 1)
  
  for (let i = 0; i < noOfChildren; ++i) {
    generateTree({ depth: depth - 1, maxChildren, prev: newNode })
  }
  
  return newNode
}

class TreeGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.containerRef = React.createRef()
  }

  regenerate = () => {
    this.setState({
      data: generateTree({})
    })
  }

  // Render a link between two nodes
  link = ({ link }) => {
    return (
      <LinkVerticalStep
        data={link}
        stroke="#374469"
        strokeWidth="2"
        fill="none"
      />
    )
  }

  // Render a node
  node = ({ node }) => {
    const width = 100
    const height = 35

    // Hidden childen are saved in data._children prop of the node
    const containsChildren =
      node.data.children.length > 0 || node.data._children.length > 0

    return (
      <Group top={node.y} left={node.x}>
        {node.depth === 0 && (
          <rect
            width={width}
            height={height}
            y={-height / 2}
            x={-width / 2}
            fill="url('#rootlg')"
            stroke={'#000000'}
            strokeWidth={2}
          />
        )}
        {node.depth !== 0 && (
          <rect
            height={height}
            width={width}
            y={-height / 2}
            x={-width / 2}
            fill={'#272b4d'}
            stroke={'#000000'}
            strokeWidth={2}
            rx={!containsChildren ? 10 : 0}
            style={{ cursor: containsChildren ? 'pointer' : 'default' }}
            onClick={this.click(node)}
          />
        )}
        <Text
          dy={'.33em'}
          scaleToFit
          width={width - 20}
          fontFamily="Arial"
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#ffffff'}
        >
          {node.data.name}
        </Text>
        {node.data._children.length > 0 && (
          <Fragment>
            <circle
              cx={width / 2}
              cy={0 - height / 2}
              r={width * 0.1}
              stroke="#000000"
              strokeWidth="2"
              fill="#3d96e2"
            />
            <Text
              x={width / 2}
              y={0 - height / 2}
              verticalAnchor="middle"
              fontFamily="Arial"
              textAnchor={'middle'}
              fill={'#ffffff'}
            >
              {node.data._children.length}
            </Text>
          </Fragment>
        )}
      </Group>
    )
  }

  // Move children of this node to _children to hide and vice versa
  click(n) {
    return () => {
      const newState = { ...this.state }
      const parent = n.parent.data
      const idx = parent.children.findIndex(x => x.id === n.data.id)
      if (n.data._children.length > 0) {
        parent.children[idx] = {
          ...n.data,
          children: n.data._children,
          _children: []
        }
      } else if (n.data.children) {
        parent.children[idx] = {
          ...n.data,
          children: [],
          _children: n.data.children
        }
      }
      this.setState({
        data: newState.data
      })
    }
  }

  chart({ width, height, padding, data }) {
    return (
      <svg width={width} height={height}>
        <LinearGradient id="rootlg" from="#032e5f" to="#0f6dc6" />
        <Cluster
          top={padding.top}
          left={padding.left}
          root={data}
          size={[
            width - padding.left - padding.right,
            height - padding.top - padding.bottom
          ]}
          nodeComponent={this.node}
          linkComponent={this.link}
        />
      </svg>
    )
  }

  componentDidMount() {
    this.setState({
      data: generateTree({})
    })
    // Resize graph based on container size
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => {
    let updateWidth = this.containerRef.current.parentNode.clientWidth * 0.9
    let updateHeight = updateWidth * 0.4
    this.setState({ width: updateWidth, height: updateHeight })
  }

  render() {
    const padding = {
      top: 20,
      left: 0,
      right: 0,
      bottom: 20
    }

    const data = hierarchy(this.state.data || [])
    
    return (
      <div
        ref={this.containerRef}
        className="app"
        style={{
          paddingTop: padding.top,
          paddingBottom: padding.bottom,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          width: this.state.width,
          height: this.state.height,
          position: 'relative'
        }}
      >
        {this.state.data && (
          <Fragment>
            <Tooltip
              title={'Regenerate data'}
              enterDelay={500}
              leaveDelay={200}
            >
              <Button
                aria-label="Refresh"
                onClick={this.regenerate}
                style={{ position: 'absolute' }}
              >
                <RefreshIcon />
              </Button>
            </Tooltip>
            {this.chart({
              width: this.state.width - padding.left - padding.right,
              height: this.state.height - padding.top - padding.bottom,
              padding,
              data
            })}
          </Fragment>
        )}
      </div>
    )
  }
}

export default TreeGraph
