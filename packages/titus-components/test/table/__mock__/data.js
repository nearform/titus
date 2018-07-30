export const columns = [
  {
    accessor: 'name',
    sortable: true,
    disablePadding: true,
    label: 'Dessert (100g serving)'
  },
  {
    accessor: 'calories',
    sortable: true,
    disablePadding: false,
    label: 'Calories'
  },
  { accessor: 'fat', sortable: true, disablePadding: false, label: 'Fat (g)' },
  {
    accessor: 'carbs',
    sortable: true,
    disablePadding: false,
    label: 'Carbs (g)',
    hidden: true
  },
  {
    accessor: 'protein',
    sortable: true,
    disablePadding: false,
    label: 'Protein (g)'
  }
]

export const rows = [
  {
    name: 'Frozen yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6.0
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 3.9
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 0.0
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 6.5
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 4.9
  }
]

export const rowsWithRowData = [
  {
    rowKey: 'key-1',
    rowData: [
      {
        accessor: 'name',
        data: 'Frozen yogurt',
        key: 'name'
      },
      {
        accessor: 'calories',
        data: 159,
        key: 'calories'
      },
      {
        accessor: 'fat',
        data: 6,
        key: 'fat'
      },
      {
        accessor: 'carbs',
        data: 24,
        key: 'carbs'
      },
      {
        accessor: 'protein',
        data: 4,
        key: 'protein'
      },
      {
        key: 'unknown'
      }
    ],
    selected: false
  },
  {
    rowKey: 'key-2',
    rowData: [
      {
        accessor: 'name',
        data: 'Eclair',
        key: 'name'
      },
      {
        accessor: 'calories',
        data: 159,
        key: 'calories'
      },
      {
        accessor: 'fat',
        data: 6,
        key: 'fat'
      },
      {
        accessor: 'carbs',
        data: 24,
        key: 'carbs'
      },
      {
        accessor: 'protein',
        data: 4,
        key: 'protein'
      },
      {
        key: 'unknown'
      }
    ],
    selected: false
  },
  {
    rowKey: 'key-3',
    rowData: [
      {
        accessor: 'name',
        data: 'Cupcake',
        key: 'name'
      },
      {
        accessor: 'calories',
        data: 159,
        key: 'calories'
      },
      {
        accessor: 'fat',
        data: 6,
        key: 'fat'
      },
      {
        accessor: 'carbs',
        data: 24,
        key: 'carbs'
      },
      {
        accessor: 'protein',
        data: 4,
        key: 'protein'
      },

      {
        key: 'unknown'
      }
    ],
    selected: false
  }
]
