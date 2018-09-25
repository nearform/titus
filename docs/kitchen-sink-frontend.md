The kitchen sink sample application is available at [titus.neaform.com](https://titus.nearform.com) but can also be run locally using Docker, as described in the [README](https://github.com/nearform/titus) file contained in the repository root.

It includes a simple layout with a main area and a left side drawer which allows switching to various sections of the application. 

It includes the following features:

## Wizard

A wizard-like component based on Material-UI's [Stepper](https://material-ui.com/demos/steppers/) component.

The [Wizard]() component, available in the [titus-components](titus-components.md) package, wraps Material-UI components and provides additional features which make it an easier to use, higher level component.

For more information, check out the [Wizard documentation](https://github.com/nearform/titus/tree/master/packages/titus-components/src/wizard).


## Visualisations

This section shows how to create visualisations using the [victory](https://github.com/FormidableLabs/victory) and [@vx](https://github.com/hshoff/vx) open source visualization and charting libraries.

It includes examples of victory's:

- `VictoryAxis`
- `VictoryArea`
- `VictoryBar`
- `VictoryCandlestick`
- `VictoryChart`
- `VictoryStack`
- `VictoryTheme`
- and more...

to create area, bar and candlestick charts, and @vx's:

- `Group`
- `Cluster`
- `LinkVerticalStep`
- `LinearGradient`
- `Text`
- and more...

to create a tree-like visualisation.

## Tables

This section showcases a simple usage of the `Table` component found in the [titus-components](titus-components.md) package, which uses the [@nearform/react-table](https://github.com/nearform/react-table) component along with the Material-UI [Table](https://material-ui.com/demos/tables/) component.

## Autocomplete

This section shows how to use the `Autocomplete` component found in the [titus-components](titus-components.md) package, which uses PayPayl's [downshift](https://github.com/paypal/downshift) and Material-UI components.

## API

This section showcases a more advanced example use of the table components and other Material-UI components. It provides a full-featured CRUD frontend over an `Apollo` server via [react-apollo](https://github.com/apollographql/react-apollo).

## Search

This section shows a more advanced example use of the `Autocomplete` component found in the [titus-components](titus-components.md) package, building on top of it to implement live search over an `Apollo` server via [react-apollo](https://github.com/apollographql/react-apollo).

## Comments

This section shows how to integrate NearForm's [commentami](https://github.com/nearform/commentami) library in a react application. The `commentami` library provides a backend and client components to implement a Google Docs-like comment functionality in HTML pages.

## Uploader

This section shows how to use the `Uploader` component and `UploaderService` class found in the [titus-components](titus-components.md) package to create an easy to use file uploader.

## Authorization

This sectopn shows how to use NearForm's [udaru](https://github.com/nearform/udaru) project to model and enforce user permissions with a PBAC authorization model.

## Temporal tables

Showcases NearForm's [temporal_tables](https://github.com/nearform/temporal_tables) PostgreSQL extension to track a history of table record changes.

## Theming

This section uses the Material-UI theming feature to create a custom theme with NearForm's theming styles. 

It also shows how to switch between different themes and store the currently selected theme on the client using [react-apollo](https://github.com/apollographql/react-apollo).

## Internationalization

Shows how to integrate [react-i18next](https://github.com/i18next/react-i18next) in a React application using a REST-ful backend to provide translations to the client.