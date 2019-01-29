(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"./src/pages/kitchen-sink/kitchen-sink-frontend.mdx":function(e,a,t){"use strict";t.r(a),t.d(a,"default",function(){return h});var n=t("./node_modules/react/index.js"),o=t.n(n),r=t("./node_modules/@mdx-js/tag/dist/index.js");function m(e){return(m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,a){if(null==e)return{};var t,n,o=function(e,a){if(null==e)return{};var t,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function c(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,a){return!a||"object"!==m(a)&&"function"!==typeof a?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):a}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,a){return(l=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}var h=function(e){function a(e){var t;return function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a),(t=s(this,i(a).call(this,e))).layout=null,t}var t,n,m;return function(e,a){if("function"!==typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&l(e,a)}(a,o.a.Component),t=a,(n=[{key:"render",value:function(){var e=this.props,a=e.components;p(e,["components"]);return o.a.createElement(r.MDXTag,{name:"wrapper",components:a},o.a.createElement(r.MDXTag,{name:"h1",components:a,props:{id:"kitchen-sink-frontend"}},"kitchen-sink-frontend"),o.a.createElement(r.MDXTag,{name:"p",components:a},"The kitchen sink sample application is available at ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://titus.nearform.com"}},"titus.neaform.com")," but can also be run locally using Docker, as described in the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/nearform/titus"}},"README")," file contained in the repository root."),o.a.createElement(r.MDXTag,{name:"p",components:a},"It includes a simple layout with a main area and a left side drawer which allows switching to various sections of the application."),o.a.createElement(r.MDXTag,{name:"p",components:a},"It includes the following features:"),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"wizard"}},"Wizard"),o.a.createElement(r.MDXTag,{name:"p",components:a},"A wizard-like component based on ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/"}},"Material UI"),"'s ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/demos/steppers/"}},"Stepper")," component."),o.a.createElement(r.MDXTag,{name:"p",components:a},"The ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"/titus-components/wizard"}},"Wizard")," component, available in the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"/titus-components"}},"titus-components")," package, wraps ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/"}},"Material UI")," components and provides additional features which make it an easier to use, higher level component."),o.a.createElement(r.MDXTag,{name:"p",components:a},"For more information, check out the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"/titus-components/wizard"}},"Wizard documentation"),"."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"visualisations"}},"Visualisations"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section shows how to create visualisations using the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/FormidableLabs/victory"}},"victory")," and ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/hshoff/vx"}},"@vx")," open source visualization and charting libraries."),o.a.createElement(r.MDXTag,{name:"p",components:a},"It includes examples of victory's:"),o.a.createElement(r.MDXTag,{name:"ul",components:a},o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"VictoryAxis")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"VictoryArea")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"VictoryBar")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"VictoryCandlestick")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"VictoryChart")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"VictoryStack")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"VictoryTheme")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},"and more...")),o.a.createElement(r.MDXTag,{name:"p",components:a},"to create area, bar and candlestick charts, and @vx's:"),o.a.createElement(r.MDXTag,{name:"ul",components:a},o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"Group")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"Cluster")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"LinkVerticalStep")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"LinearGradient")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"Text")),o.a.createElement(r.MDXTag,{name:"li",components:a,parentName:"ul"},"and more...")),o.a.createElement(r.MDXTag,{name:"p",components:a},"to create a tree-like visualisation."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"tables"}},"Tables"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section showcases a simple usage of the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"Table")," component found in the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"/titus-components"}},"titus-components")," package, which uses the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/nearform/react-table"}},"@nearform/react-table")," component along with the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/"}},"Material UI"),"'s ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/demos/tables/"}},"Table")," component."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"autocomplete"}},"Autocomplete"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section shows how to use the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"Autocomplete")," component found in the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"/titus-components"}},"titus-components")," package, which uses PayPayl's ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/paypal/downshift"}},"downshift")," and ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/"}},"Material UI")," components."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"api"}},"API"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section showcases a more advanced exampe use of the table components and other ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/"}},"Material UI")," components. It provides a full-featured CRUD frontend over an ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"Apollo")," server via ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/apollographql/react-apollo"}},"react-apollo"),"."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"search"}},"Search"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section shows a more advantage example use of the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"Autocomplete")," component found in the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"/titus-components"}},"titus-components")," package, building on top of it to implement live search over an ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"Apollo")," server via ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/apollographql/react-apollo"}},"react-apollo"),"."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"comments"}},"Comments"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section shows how to integrate NearForm's ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/nearform/commentami"}},"commentami")," library in a react application. The ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"commentami")," library provides a backend and client components to implement a Google Docs-like comment functionality in HTML pages."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"uploader"}},"Uploader"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section shows how to use the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"Uploader")," component and ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"UploaderService")," class found in the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"/titus-components"}},"titus-components")," package to create an easy to use file uploader."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"authorization"}},"Authorization"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This sectopn shows how to use NearForm's ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/nearform/udaru"}},"udaru")," project to model and enforce user permissions with a PBAC authorization model."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"temporal-tables"}},"Temporal tables"),o.a.createElement(r.MDXTag,{name:"p",components:a},"Showcases NearForm's ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/nearform/temporal_tables"}},"temporal_tables")," PostgreSQL extension to track a history of table record changes."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"theming"}},"Theming"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section uses the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/"}},"Material UI")," theming feature to create a custom theme with NearForm's theming styles."),o.a.createElement(r.MDXTag,{name:"p",components:a},"It also shows how to switch between different themes and store the currently selected theme on the client using ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/apollographql/react-apollo"}},"react-apollo"),"."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"internationalization"}},"Internationalization"),o.a.createElement(r.MDXTag,{name:"p",components:a},"Shows how to integrate ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/i18next/react-i18next"}},"react-i18next")," in a React application using a REST-ful backend to provide translations to the client."))}}])&&c(t.prototype,n),m&&c(t,m),a}();h.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}}}]);
//# sourceMappingURL=titus-documentation-src-pages-kitchen-sink-kitchen-sink-frontend.239ac6182784a5652525.js.map