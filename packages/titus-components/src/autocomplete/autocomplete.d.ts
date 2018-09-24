import * as React from 'react'

type DataItem = {
  value: string
  key: string
}

export interface AutocompleteProps {
  data?: Array<DataItem>
  inputValue?: string
  placeholder?: string
  id?: string
  filterType?: string
  maxResults?: number
  loading?: any
  items?: Array<DataItem>
  onInputChange?: (e: any) => void
  onChange?: (item: DataItem) => void
}

declare class Autocomplete extends React.Component<AutocompleteProps> {}
export default Autocomplete
