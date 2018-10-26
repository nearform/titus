import * as React from 'react'

type DataItem = {
  value: string
  key: string
}

type InputChangeItem = {
  value: string
  filterType?: string
  maxResults?: number
}

export interface AutocompleteProps {
  data?: Array<DataItem>
  placeholder?: string
  id?: string
  filterType?: 'contains' | 'startsWith'
  maxResults?: number
  loading?: boolean
  items?: Array<DataItem>
  onInputChange?: (item: InputChangeItem) => void
  onChange?: (item: DataItem) => void
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
  label?: string
  helperText?: string
}

declare class Autocomplete extends React.Component<AutocompleteProps> {}
export default Autocomplete
