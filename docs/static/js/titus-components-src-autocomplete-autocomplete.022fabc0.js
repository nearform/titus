(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"../titus-components/src/autocomplete/autocomplete.mdx":function(e,a,n){"use strict";n.r(a);var t=n("./node_modules/react/index.js"),i=n.n(t),o=n("./node_modules/@mdx-js/tag/dist/index.js"),r=n("./node_modules/docz/dist/index.m.js"),l=n("../titus-components/node_modules/downshift/dist/downshift.esm.js"),u=n("../titus-components/node_modules/@material-ui/core/styles/index.js"),s=n("../titus-components/node_modules/@material-ui/core/TextField/index.js"),y=n.n(s),c=n("../titus-components/node_modules/@material-ui/core/Paper/index.js"),p=n.n(c),d=n("../titus-components/node_modules/@material-ui/core/MenuItem/index.js"),m=n.n(d),A=n("../titus-components/node_modules/@material-ui/core/LinearProgress/index.js"),k=n.n(A);function g(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.forEach(function(a){v(e,a,n[a])})}return e}function v(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function h(e,a){if(null==e)return{};var n,t,i=function(e,a){if(null==e)return{};var n,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],a.indexOf(n)>=0||(i[n]=e[n]);return i}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var I=function(e){var a=e.getInputProps,n=e.getItemProps,t=e.isOpen,o=e.selectedItem,r=e.highlightedIndex,l=e.classes,u=e.placeholder,s=e.id,c=e.items,d=e.onInputChange,A=e.loading,v=e.required,I=e.disabled,C=e.readOnly,S=e.error,f=e.label,w=e.helperText;return i.a.createElement("div",{className:l.root},i.a.createElement("div",{className:l.container},function(e){var a=e.inputProps,n=e.classes,t=e.ref,o=e.loading,r=h(e,["inputProps","classes","ref","loading"]);return i.a.createElement("div",{className:n.inputRoot},i.a.createElement(y.a,Object.assign({InputProps:g({inputRef:t},a),className:n.textField},r)),o&&i.a.createElement(k.a,null))}({fullWidth:!0,loading:A,classes:l,label:f,helperText:w,inputProps:a({onChange:d,placeholder:u,id:s,required:v,disabled:I,readOnly:C,error:S})}),t&&c&&i.a.createElement(p.a,{className:l.paper,square:!0},c.map(function(e,a){return function(e){var a=e.suggestion,n=e.index,t=e.itemProps,o=e.highlightedIndex,r=e.selectedItem;return i.a.createElement(m.a,Object.assign({},t,{key:a.key,selected:o===n,component:"div",style:{fontWeight:r&&r.value===a.value?500:400}}),a.value)}({suggestion:e,index:a,itemProps:n({key:e.key,item:e}),highlightedIndex:r,selectedItem:o})}))))},C=Object(u.withStyles)(function(e){return{root:{flexGrow:1},container:{flexGrow:1,position:"relative"},paper:{position:"absolute",zIndex:1,marginTop:e.spacing.unit,left:0,right:0},inputRoot:{position:"relative",flexWrap:"wrap"},textField:{zIndex:"auto"}}})(I);function S(e){return(S="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,a){return(b=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}function M(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}I.__docgenInfo={description:"",methods:[],displayName:"MaterialDownshift",props:{classes:{type:{name:"object"},required:!0,description:""},getInputProps:{type:{name:"any"},required:!1,description:""},getItemProps:{type:{name:"any"},required:!1,description:""},isOpen:{type:{name:"bool"},required:!1,description:""},selectedItem:{type:{name:"object"},required:!1,description:""},highlightedIndex:{type:{name:"number"},required:!1,description:""},placeholder:{type:{name:"string"},required:!1,description:""},id:{type:{name:"string"},required:!1,description:""},loading:{type:{name:"bool"},required:!1,description:""},onInputChange:{type:{name:"func"},required:!1,description:""},items:{type:{name:"array"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},disabled:{type:{name:"bool"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},label:{type:{name:"string"},required:!1,description:""},helperText:{type:{name:"string"},required:!1,description:""}}};var E=function(e){function a(){var e,n,t,o;!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a);for(var r=arguments.length,l=new Array(r),u=0;u<r;u++)l[u]=arguments[u];return t=this,o=(e=w(a)).call.apply(e,[this].concat(l)),(n=!o||"object"!==S(o)&&"function"!==typeof o?M(t):o).state={internalItems:null},n.renderMaterial=function(e){var a=M(M(n)),t=a.props,o=t.placeholder,r=t.id,l=t.items,u=t.loading,s=t.onInputChange,y=t.required,c=t.disabled,p=t.readOnly,d=t.error,m=t.label,A=t.helperText,k=a.state.internalItems,g=a.handleInputChange;return i.a.createElement("div",null,i.a.createElement(C,Object.assign({},e,{items:s?l:k,loading:u,placeholder:o,id:r,required:y,disabled:c,readOnly:p,error:d,label:m,helperText:A,onInputChange:g})))},n.handleInputChange=function(e){var a=e.target.value,t=n.props,i=t.data,o=t.filterType,r=t.maxResults,l=t.onInputChange;if(l)l({value:a,filterType:o,maxResults:r});else{var u=null;if(n.setState({internalItems:u}),!a||!i)return;var s=a.toLowerCase();u=("contains"===o.toLowerCase()?i.filter(function(e){return e.value.toLowerCase().indexOf(s)>-1}):i.filter(function(e){return e.value.toLowerCase().startsWith(s)})).sort(function(e,a){return e.value.length-a.value.length}).splice(0,r),n.setState({internalItems:u})}},n.itemToString=function(e){return e?e.value:""},n}var n,t,o;return function(e,a){if("function"!==typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&b(e,a)}(a,i.a.Component),n=a,(t=[{key:"render",value:function(){var e=this.props.onChange,a=this.renderMaterial,n=this.itemToString;return i.a.createElement(l.a,{onChange:e,itemToString:n},a)}}])&&f(n.prototype,t),o&&f(n,o),a}();E.defaultProps={filterType:"startsWith",maxResults:5};var B=E;E.__docgenInfo={description:"",methods:[{name:"renderMaterial",docblock:null,modifiers:[],params:[{name:"props",type:null}],returns:null},{name:"handleInputChange",docblock:null,modifiers:[],params:[{name:"{ target: { value } }",type:null}],returns:null},{name:"itemToString",docblock:null,modifiers:[],params:[{name:"item",type:null}],returns:null}],displayName:"Autocomplete",props:{filterType:{defaultValue:{value:"'startsWith'",computed:!1},type:{name:"enum",value:[{value:"'contains'",computed:!1},{value:"'startsWith'",computed:!1}]},required:!1,description:"The type of filter to use to match autocomplete items with user input."},maxResults:{defaultValue:{value:"5",computed:!1},type:{name:"number"},required:!1,description:"Maximum number of results returned in the autocomplete list."},data:{type:{name:"arrayOf",value:{name:"shape",value:{key:{name:"string",required:!1},value:{name:"string",required:!1}}}},required:!1,description:"The items used to populate the autocomplete list with a static list of elements."},onInputChange:{type:{name:"func"},required:!1,description:"Callback function invoked to retrieve a dynamic list of items, provided in the `items` prop."},onChange:{type:{name:"func"},required:!1,description:"Callback function invoked when an item is selected from the list."},placeholder:{type:{name:"string"},required:!1,description:"The input element placeholder."},id:{type:{name:"string"},required:!1,description:"The ID of the rendered input element."},loading:{type:{name:"bool"},required:!1,description:"Whether to show a loading indicator when loading suggestions."},items:{type:{name:"arrayOf",value:{name:"shape",value:{key:{name:"string",required:!1},value:{name:"string",required:!1}}}},required:!1,description:"The items to used to populate the autocomplete list dynamically after responding to the `onInputChange` callback."},required:{type:{name:"bool"},required:!1,description:"If the input element is required."},disabled:{type:{name:"bool"},required:!1,description:"If the input element is disabled."},readOnly:{type:{name:"bool"},required:!1,description:"If the input element is readOnly."},error:{type:{name:"bool"},required:!1,description:"If the input element is invalid."},label:{type:{name:"string"},required:!1,description:"The label for the input element."},helperText:{type:{name:"string"},required:!1,description:"The helper text for the input element."}}};var O=[{value:"Afghanistan",key:"AF"},{value:"\xc5land Islands",key:"AX"},{value:"Albania",key:"AL"},{value:"Algeria",key:"DZ"},{value:"American Samoa",key:"AS"},{value:"AndorrA",key:"AD"},{value:"Angola",key:"AO"},{value:"Anguilla",key:"AI"},{value:"Antarctica",key:"AQ"},{value:"Antigua and Barbuda",key:"AG"},{value:"Argentina",key:"AR"},{value:"Armenia",key:"AM"},{value:"Aruba",key:"AW"},{value:"Australia",key:"AU"},{value:"Austria",key:"AT"},{value:"Azerbaijan",key:"AZ"},{value:"Bahamas",key:"BS"},{value:"Bahrain",key:"BH"},{value:"Bangladesh",key:"BD"},{value:"Barbados",key:"BB"},{value:"Belarus",key:"BY"},{value:"Belgium",key:"BE"},{value:"Belize",key:"BZ"},{value:"Benin",key:"BJ"},{value:"Bermuda",key:"BM"},{value:"Bhutan",key:"BT"},{value:"Bolivia",key:"BO"},{value:"Bosnia and Herzegovina",key:"BA"},{value:"Botswana",key:"BW"},{value:"Bouvet Island",key:"BV"},{value:"Brazil",key:"BR"},{value:"British Indian Ocean Territory",key:"IO"},{value:"Brunei Darussalam",key:"BN"},{value:"Bulgaria",key:"BG"},{value:"Burkina Faso",key:"BF"},{value:"Burundi",key:"BI"},{value:"Cambodia",key:"KH"},{value:"Cameroon",key:"CM"},{value:"Canada",key:"CA"},{value:"Cape Verde",key:"CV"},{value:"Cayman Islands",key:"KY"},{value:"Central African Republic",key:"CF"},{value:"Chad",key:"TD"},{value:"Chile",key:"CL"},{value:"China",key:"CN"},{value:"Christmas Island",key:"CX"},{value:"Cocos (Keeling) Islands",key:"CC"},{value:"Colombia",key:"CO"},{value:"Comoros",key:"KM"},{value:"Congo",key:"CG"},{value:"Congo, The Democratic Republic of the",key:"CD"},{value:"Cook Islands",key:"CK"},{value:"Costa Rica",key:"CR"},{value:"Cote D'Ivoire",key:"CI"},{value:"Croatia",key:"HR"},{value:"Cuba",key:"CU"},{value:"Cyprus",key:"CY"},{value:"Czech Republic",key:"CZ"},{value:"Denmark",key:"DK"},{value:"Djibouti",key:"DJ"},{value:"Dominica",key:"DM"},{value:"Dominican Republic",key:"DO"},{value:"Ecuador",key:"EC"},{value:"Egypt",key:"EG"},{value:"El Salvador",key:"SV"},{value:"Equatorial Guinea",key:"GQ"},{value:"Eritrea",key:"ER"},{value:"Estonia",key:"EE"},{value:"Ethiopia",key:"ET"},{value:"Falkland Islands (Malvinas)",key:"FK"},{value:"Faroe Islands",key:"FO"},{value:"Fiji",key:"FJ"},{value:"Finland",key:"FI"},{value:"France",key:"FR"},{value:"French Guiana",key:"GF"},{value:"French Polynesia",key:"PF"},{value:"French Southern Territories",key:"TF"},{value:"Gabon",key:"GA"},{value:"Gambia",key:"GM"},{value:"Georgia",key:"GE"},{value:"Germany",key:"DE"},{value:"Ghana",key:"GH"},{value:"Gibraltar",key:"GI"},{value:"Greece",key:"GR"},{value:"Greenland",key:"GL"},{value:"Grenada",key:"GD"},{value:"Guadeloupe",key:"GP"},{value:"Guam",key:"GU"},{value:"Guatemala",key:"GT"},{value:"Guernsey",key:"GG"},{value:"Guinea",key:"GN"},{value:"Guinea-Bissau",key:"GW"},{value:"Guyana",key:"GY"},{value:"Haiti",key:"HT"},{value:"Heard Island and Mcdonald Islands",key:"HM"},{value:"Holy See (Vatican City State)",key:"VA"},{value:"Honduras",key:"HN"},{value:"Hong Kong",key:"HK"},{value:"Hungary",key:"HU"},{value:"Iceland",key:"IS"},{value:"India",key:"IN"},{value:"Indonesia",key:"ID"},{value:"Iran, Islamic Republic Of",key:"IR"},{value:"Iraq",key:"IQ"},{value:"Ireland",key:"IE"},{value:"Isle of Man",key:"IM"},{value:"Israel",key:"IL"},{value:"Italy",key:"IT"},{value:"Jamaica",key:"JM"},{value:"Japan",key:"JP"},{value:"Jersey",key:"JE"},{value:"Jordan",key:"JO"},{value:"Kazakhstan",key:"KZ"},{value:"Kenya",key:"KE"},{value:"Kiribati",key:"KI"},{value:"Korea, Democratic People'S Republic of",key:"KP"},{value:"Korea, Republic of",key:"KR"},{value:"Kuwait",key:"KW"},{value:"Kyrgyzstan",key:"KG"},{value:"Lao People'S Democratic Republic",key:"LA"},{value:"Latvia",key:"LV"},{value:"Lebanon",key:"LB"},{value:"Lesotho",key:"LS"},{value:"Liberia",key:"LR"},{value:"Libyan Arab Jamahiriya",key:"LY"},{value:"Liechtenstein",key:"LI"},{value:"Lithuania",key:"LT"},{value:"Luxembourg",key:"LU"},{value:"Macao",key:"MO"},{value:"Macedonia, The Former Yugoslav Republic of",key:"MK"},{value:"Madagascar",key:"MG"},{value:"Malawi",key:"MW"},{value:"Malaysia",key:"MY"},{value:"Maldives",key:"MV"},{value:"Mali",key:"ML"},{value:"Malta",key:"MT"},{value:"Marshall Islands",key:"MH"},{value:"Martinique",key:"MQ"},{value:"Mauritania",key:"MR"},{value:"Mauritius",key:"MU"},{value:"Mayotte",key:"YT"},{value:"Mexico",key:"MX"},{value:"Micronesia, Federated States of",key:"FM"},{value:"Moldova, Republic of",key:"MD"},{value:"Monaco",key:"MC"},{value:"Mongolia",key:"MN"},{value:"Montserrat",key:"MS"},{value:"Morocco",key:"MA"},{value:"Mozambique",key:"MZ"},{value:"Myanmar",key:"MM"},{value:"Namibia",key:"NA"},{value:"Nauru",key:"NR"},{value:"Nepal",key:"NP"},{value:"Netherlands",key:"NL"},{value:"Netherlands Antilles",key:"AN"},{value:"New Caledonia",key:"NC"},{value:"New Zealand",key:"NZ"},{value:"Nicaragua",key:"NI"},{value:"Niger",key:"NE"},{value:"Nigeria",key:"NG"},{value:"Niue",key:"NU"},{value:"Norfolk Island",key:"NF"},{value:"Northern Mariana Islands",key:"MP"},{value:"Norway",key:"NO"},{value:"Oman",key:"OM"},{value:"Pakistan",key:"PK"},{value:"Palau",key:"PW"},{value:"Palestinian Territory, Occupied",key:"PS"},{value:"Panama",key:"PA"},{value:"Papua New Guinea",key:"PG"},{value:"Paraguay",key:"PY"},{value:"Peru",key:"PE"},{value:"Philippines",key:"PH"},{value:"Pitcairn",key:"PN"},{value:"Poland",key:"PL"},{value:"Portugal",key:"PT"},{value:"Puerto Rico",key:"PR"},{value:"Qatar",key:"QA"},{value:"Reunion",key:"RE"},{value:"Romania",key:"RO"},{value:"Russian Federation",key:"RU"},{value:"RWANDA",key:"RW"},{value:"Saint Helena",key:"SH"},{value:"Saint Kitts and Nevis",key:"KN"},{value:"Saint Lucia",key:"LC"},{value:"Saint Pierre and Miquelon",key:"PM"},{value:"Saint Vincent and the Grenadines",key:"VC"},{value:"Samoa",key:"WS"},{value:"San Marino",key:"SM"},{value:"Sao Tome and Principe",key:"ST"},{value:"Saudi Arabia",key:"SA"},{value:"Senegal",key:"SN"},{value:"Serbia and Montenegro",key:"CS"},{value:"Seychelles",key:"SC"},{value:"Sierra Leone",key:"SL"},{value:"Singapore",key:"SG"},{value:"Slovakia",key:"SK"},{value:"Slovenia",key:"SI"},{value:"Solomon Islands",key:"SB"},{value:"Somalia",key:"SO"},{value:"South Africa",key:"ZA"},{value:"South Georgia and the South Sandwich Islands",key:"GS"},{value:"Spain",key:"ES"},{value:"Sri Lanka",key:"LK"},{value:"Sudan",key:"SD"},{value:"Suriname",key:"SR"},{value:"Svalbard and Jan Mayen",key:"SJ"},{value:"Swaziland",key:"SZ"},{value:"Sweden",key:"SE"},{value:"Switzerland",key:"CH"},{value:"Syrian Arab Republic",key:"SY"},{value:"Taiwan, Province of China",key:"TW"},{value:"Tajikistan",key:"TJ"},{value:"Tanzania, United Republic of",key:"TZ"},{value:"Thailand",key:"TH"},{value:"Timor-Leste",key:"TL"},{value:"Togo",key:"TG"},{value:"Tokelau",key:"TK"},{value:"Tonga",key:"TO"},{value:"Trinidad and Tobago",key:"TT"},{value:"Tunisia",key:"TN"},{value:"Turkey",key:"TR"},{value:"Turkmenistan",key:"TM"},{value:"Turks and Caicos Islands",key:"TC"},{value:"Tuvalu",key:"TV"},{value:"Uganda",key:"UG"},{value:"Ukraine",key:"UA"},{value:"United Arab Emirates",key:"AE"},{value:"United Kingdom",key:"GB"},{value:"United States",key:"US"},{value:"United States Minor Outlying Islands",key:"UM"},{value:"Uruguay",key:"UY"},{value:"Uzbekistan",key:"UZ"},{value:"Vanuatu",key:"VU"},{value:"Venezuela",key:"VE"},{value:"Viet Nam",key:"VN"},{value:"Virgin Islands, British",key:"VG"},{value:"Virgin Islands, U.S.",key:"VI"},{value:"Wallis and Futuna",key:"WF"},{value:"Western Sahara",key:"EH"},{value:"Yemen",key:"YE"},{value:"Zambia",key:"ZM"},{value:"Zimbabwe",key:"ZW"}];function T(e){return(T="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Y(e,a){if(null==e)return{};var n,t,i=function(e,a){if(null==e)return{};var n,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],a.indexOf(n)>=0||(i[n]=e[n]);return i}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function U(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function j(e,a){return!a||"object"!==T(a)&&"function"!==typeof a?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):a}function D(e){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function G(e,a){return(G=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}n.d(a,"default",function(){return F});var F=function(e){function a(e){var n;return function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a),(n=j(this,D(a).call(this,e))).layout=null,n}var n,t,l;return function(e,a){if("function"!==typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&G(e,a)}(a,i.a.Component),n=a,(t=[{key:"render",value:function(){var e=this.props,a=e.components,n=Y(e,["components"]);return i.a.createElement(o.MDXTag,{name:"wrapper",components:a},i.a.createElement(o.MDXTag,{name:"h1",components:a,props:{id:"autocomplete"}},"Autocomplete"),i.a.createElement(o.MDXTag,{name:"p",components:a},"The Autocomplete component provides typical autocompletion features using ",i.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://material-ui.com/"}},"Material UI")," and ",i.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/paypal/downshift"}},"downshift"),"."),i.a.createElement(o.MDXTag,{name:"p",components:a},"It supports synchronous and asynchronous loading of list items."),i.a.createElement(o.MDXTag,{name:"h2",components:a,props:{id:"properties"}},"Properties"),i.a.createElement(r.f,{of:B}),i.a.createElement(o.MDXTag,{name:"h2",components:a,props:{id:"typings-definitions"}},"Typings Definitions"),i.a.createElement(o.MDXTag,{name:"pre",components:a},i.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"language-ts"}},"type DataItem = {\n  value: string\n  key: string\n}\n\ntype InputChangeItem = {\n  value: string\n  filterType?: string\n  maxResults?: number\n}\n\nexport interface AutocompleteProps {\n  data?: Array<DataItem>\n  placeholder?: string\n  id?: string\n  filterType?: 'contains' | 'startsWith'\n  maxResults?: number\n  loading?: boolean\n  items?: Array<DataItem>\n  onInputChange?: (item: InputChangeItem) => void\n  onChange?: (item: DataItem) => void\n  required?: boolean\n  disabled?: boolean\n  readOnly?: boolean\n  error?: boolean\n  label?: string\n  helperText?: string\n}\n")),i.a.createElement(o.MDXTag,{name:"h2",components:a,props:{id:"usage"}},"Usage"),i.a.createElement(o.MDXTag,{name:"p",components:a},"This section shows how to use the Autocomplete component."),i.a.createElement(r.e,{__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkqiUrGiJkjK8Eq1QyZnWTWWoXY2Hm_To5G67mScAIAlCKRSsDsIxeeHGNjsFU83iWM1g_m6mVsSPMtjgoRg62oqTxb3qiAAlGYjJIzBAiDNKAIpgAlGCuchTMBCIjsToSqXtADc_MFwrFioIABEAPIAWXYMsi8q6koIAFoTkQVWqhSKHJEhah9EbZfKcJJsK5BbBbagzOLzXr9TguhgMgAKdbMNhidYWRh4ADMYkc6pdNE46pF2XYuImPScwJJNQEiCkKfj5gs7EYMzEkYaUyiyRdedc6BYMWo8XYMyEd3GlFSMCmL3Y4cw_VQKXzMASnKkDYTdfTztdkmriekccUZhOvSI-hwaQIAFFYMeaAAhRINdCRzrCAjtbmoTnKhTKb2-mA4TQyB0ahaHoRAVBzKYAEFwlOJ1YFoN0TXaT04AEchJDCCJPnJMcYEw2CcIQmB_QFe0pmAItQhoeE7HkJC5RQyQ0IwrC4L_WhmIiWjATaGiIHgUjIPYIMpQY00tXaO0NXYSjNB8ejjUYgABGAiBEAZUF4ropIDVBdFRY5TgAL2cAhEmxdhuFk9YogEZ5UCudoAAZ2GTGYsHafcaxmTsWFnJyABYPPYAA2DyvPWMAQIAMR9aBEic_hnEORFHUwdgAAUhH4JZ1J-OBfMRSKa2imhnAgYzLnYABGQLvPkcF9OoQyoLmKz2EjSjyBsKB0HDdh5E5KyxE6mMZHYVELJgbhgEPUzzOxeRt1rYAeugfrggAMi28ZEnmShmnWvqBu4M75TAaipU09p2AAfg2Dbw0jYarmOzbUEamspBkat3zMWEZMwMAwigKYXpGsbvralca0TUSCBwGLMhSa8CBW2s6xg7D4Lw1dMfJSUYGGPqMj4EAGhCOVXH7KAiZJ6d-Hx2t0GiVxZqoai0QEuAvsxzHqHsPxZxmtaWsoWAcCgSgUj5_mt1XKQEaRlG0ZWqQYb-sxvxAFiCJxjj8LYoi8IArQKBA_QGDImSEfEhVzV0m2HUse2B0oGYLXM-Y4Cd4TtVGVA4BsMBpXddoThGIOQ9faSHX1LJ-niAOo-DiBQ_tz0oloJOoEkbOMggeIrUDtPQ90sxyDpuA7Gx9jcMQ7BQPQOxlfXahXWAdZUWiWJ-0HSx9vgDqu7h9hjCMKxNk4WgiDsPI8wifsPdCOnEImJFCNxxCoFsKYC3xGme5ich2F3wzDphK99DgepeVXVmCFcK5LBwVwBEyRJdTASNX-D2YYBdXYNsGAiUrA4FRDOFISxWDxEZC_CB3NZyDU5JybymMJ4OHiFADwkpdiXX0j2OkqBWCUBATkJeXRuYwFYEiY4iRUDxVPufA4zQXhqTgGSIQfxMA5DQASboxR2Fz2KP3D2d8-Rj2oA0VAMxwhC3cGkBBBDyDoNrJg-w2DcE7CNFdIhnASFkLzCMTY5h3AzzUpwIkC4ti0ByEpARZ894SNXILYWSjwEqLURYTB1huhoDkVMGxaNab0wltOFxY9CaIgZhkBBkCCjePHiYKe3QGjaj2M0Dek46DTjzAE8IV81InnYPfMeXB4lIOgauXx09vbdEvpAMGGRhy5DgN0Je2ceohC3obCxc98x4jaS0gpiNSmSMxk0nOg95gII7t_SMABtdougn5oF9ksdoPcRRwAAOp4naAAXTQTUlJCcsAClCHKVAVzAhHEvl0BkYM7BUL6C6Ph5hsnG23t0FhkTMZRCwOKJ5BB7jgJuUQO5STMG7M2BvI4S9g6jBCGfSgnYCgGJYHEbi-ZTGovRcghkmJ4BENvuM1c0sCUpAQV4CW0KUl-P6XYJeC8KEjiFHIteHTp7fL6Sw-hjCiCxGwckVwocWmPOdP5OcS9snFGkbI-R7iYCiLiAkbR2x_m1mEWC1-79P4LL_n4eYQCQFgL_lUmBcDqoWqgSgk5Y9MGQmyaMopITbA5IAI6hAgF0dAWqLBdG9b67INLhBQHpZPZ109XXBNdB6lgFQPCwH9eSseibXDJtDeA2lEbTlRqyTGxVQTr5Zg9WadAupUBJADTkzsVakhhrpfmxohb_HFrdfGuwaBYG71TWUzGGQhDlhzeGyNqSz6ZoXEaYUjjY2lrGQO2sdNAhQEqVA8djLNhQDhOMJuM6EVFsCZ2mgtbt1wksE3ddBR1hfW7k_E-xwYAg1XgQbKHs7DWVHpM6A0yh5OW2aC_ZEwSoAtcEC-Ar6wUAFZb1NQsMfboX7VxoBzowqAzYOFXBuQkODelA25IyAnHORcoAdXdkObgo1v21gMhRZmFGwU0f5qEmJ4SMhJMxlwTj2rZ6cOZhYSl0qeMWAVYEhRIsRNep9X6qTGas2LAE3Wyt1bEhSaHcKKTK6FxSfPRkS9WBRBjwsEoZmiGriUVQxkdDmGBmmeM9MDAsAZHieVauei1kJi2Hg7WV5AhzDRgc7GWQSnGDEcLsnUuMclMWGADgeLjG5YsYsDq2aYmlWKO6A9HV7ArhWf8_EWzvMYv4ulbNITBQkvJeicTdjAhZo1diQIKrLGuCzS4C1_mQaZPZFmt1kN6BOuY3kym2aI3shDd8xKFTSQ-vTYbYkSbFgNP1eACtpbk7V3lanVADbemBAGYILNfbh2NvpYIBJtIx3KjOeLZdmAk2FZBd3CFse74TM-eFugW7rnMsdSAU_eyY4LPsF7YyQaKDIbMaLEHCixw2ZLCmfpoeeVwPAqg0sc792IeecJDgRjPmUvNEjFj5Vw1oc-MkJNDEaRUSaSGDdvMHhkirNcGgMEDnSeZaAWDmAiPf3I_mKjiDIK6LvdrPRBc7SbIOYQuwF0IwisdRw1AZmXnb7tIIGZLIQD8s2b49hmAiu-MoOZunTqABCXn7AAA-Nv2AW8fq4Yafn8P8zoyi6yvOcARAADKjAyJo9pL1Ce1gV0r6ykYkcHaHj7yg_uRiB8pBDM61kVkgTZ0HXSyX7rw6fjgaPkYPCQ3eN7v3AeBBB8AZyHAqhsALOd-wUaFoari5Y1cJ3BeBcCCLyXnAZf48V6ry9RB78gN4kjM7tvtZp-YwgRqSMk-lgeGGlRkI_frVSzoCkQsFp2Cl837AWcExZ-1ggeSWIgDnLC_R880_6uIFjm17QXXegCsYYN_Lo3Suhrubw-sYRSwSgMyO1ayYRSGSMcA7LWeDfKAcHJyN8HzKcKMcnVcD3CnMRO4EHNxP7ezFjZAgQcLXOHjQA4AqpdzDqdXUPV3KGFjRgFOaOdOA4VAe7NLFg5VeiUgkAgodrWeIA7g2cZaJTYAAgog0jTrKQBgsudGVccXL6O9F0LAciJ9F9MGdgOuE2WgbWJQXWdCfWeuYiLiYUHmXiLmWiM2ICVZK2cCQGB0D3TmfiYeayRZdYSiXnJyKCMAFIYWPedwLyYBUBDwmKW6PA2SUHa1JyAAUbpgwEaDgBiJbn8LNQ8IAA0Qi1E3CIj5QoIcF3Ai4kjAjsjfd0jXDwi4Dqp2gci0gk4CiwF2htQAAtEomsTI8ojw48foOIcwNwdSVwWojw5wZo2LMo-BbIjAYUAQKCfo7I7UIYsI9wsYlICWPopYZI7I3UOY1o0Yyo2cH1BIFYgIuoqCBoTYkYioqCGgd-a6OIaYyogARVOIWJ2JiBSFCBpkqHYBvHfg8FCFZluKggAHFHisjKigcaA0ADi1jKjRRgS2jsiBBrx8jVjCjKj9RYTtioJ0RcF_jdl0Tzi8g0R4gkTDiPCABVPEjwgkmo5Eo4ywCk7IqqAQXBCAdQPwmkjwpowaDIs4pyL4vwKIDZEk-UG8QYrk0op4vk6kVAW4m8AACXpPaC-NnDpnKDwBlNmLFJaJ5OFO-M7EoEFKhJvBvAVJvAXHfjyBlIAE0TSFxngrkZTzwbTd4qoZTOTQitiKjTTUA0AZSAApG0hE34yElEm8NEzU4YiUvAcINkoUxUuk8M-YkEm8CWNgYkw0jYhMj03k_U70942I2UjIKqJYv4RhGUqYzM7UxUkQOAEYdwYMuom8XEisiUtoWhKYBoeIyoGUgANRNMyGMmgBlJhObKTP6BiGDkaAwCLnMF1ERHMUvQ_heGFESFuIaAzPdMrJvHRBdAgHYG1HNJrniB9BlIADkTTV4Uh340yQygSRy4TFS-htgIT2A4o4BKAZTgi7ztibw-hqIWAZSTivyKjNFIUnBry6iABpeUoCpyECjIYQaU9k-UewMMjcp4zRRhP4pC9oewcstCkEzReYdgbsjITAW4-wXsmC5C1wRIKIcwDshIg0lEiC60qinC_QTIMjTwzo8xcUORZNWIciz8_C-8hRdAW4ywDUkS7YoWaAEibC-wYoti2S0shSs85SvAfoVEAUuIhI8itI5SuCOwSMCCoIXeWcYaBiyoJiuo-wewBUxwaWSFcC2C9c7k9CyIYUfU24iC1C9ygi6gJY8i286S4CwKygJYRlbUNSU4TIR9Pit4XeU-S-DeciqS_y0S4QXYKyjAGy2CiChy_Up-ESYVci4c0Kq4fgRwRCWYhoUhENXKWM-wQCiq5CoQXuespyWU8qjKmSt4Tq5C8k5S_adEPK5C1i1qnCqqbpBKgS8gcit03qio6K1AOybYW47UAqti7UdQCALwcICADa_07ayINAUq7C7UPy8UkEgOIVb0rokSGAfipKjaty66-888XoPUgQW488eyti88FIfaV8bC88EKpapyS8dgNwKAWBE4H67C5wSiya88b1aIYwvsAEn1F0Aa9oAEh4gGscs0X6nq967Y88VEagFy-Uc8R0gGrzD2am9oc8eMyauKKAbYBI3S6yzqBOWGiEuATkW4mKLatm9-SgNJTs3K4Wt6rUp4mKFkw67CmKY6tmtAPS5WlqiG-UZGdwYqZW0muWkE5GBEfELG6c3GgE4S7W9oE2_SfETKCWBheAJmzKa2smiou27pFKcITYfzKwIdJc2iCS92o2-8gEzNagW4gEvCm2iO5yy2q6sO7YgEmAYUZ4S2umya1OhE5EDarOuO4WS26C7OvaziwHaOrWj2pyAEroLYeS2MgEw2iMkE2uoIatLs7CgEpS7O8MTsS29K6u-ULGzsBcNoeYaOzKBUkem0Luoa7Ot42eI86O1muOxkfzdpFcru8GoevG7GiUaO9She9nVwC0G8ekMIaOpshexIOs6Oiam22UtnGIW42U1e3egs9-HIHKnID4_UcgE4dDb-qWxI7C2UpOlu-82Up26GoITqbs3uB6-wF4ZIZ_GAIW7C7s2Oj-6gdAPofwV-o-x-wK9gCCwK1-0Wx-6iS8gQLe2M2U-em2hoREDW2MhoUUyamRFgXGhoIh3erhjufIHhwe5OiohoTIVAJYKyoVU-WapK9gb-Vc5uxM-88R1wT1VcgmzhroVhqEhoAu_h-IhpZoBORCthiBlR7YjszIBcVcnuphp-JIVc9-0RpyX0n0NnG47C30ixrM-Udx3yMxqE30qeti30jITe2430gx1x_x4UVmIJlE302WyB7YiC1wYyVwbYPAHuRJyCxa3e0y1AW-nymJ1JioiC31Pa3uHyqu2J_gMhs0JYaK9ScgOKvuTKNO3CdoZwR656vuQ6RqqEiC0JyaxpiUJYORgZsAHy5Rvx9oCC0IWsl4Hy6-m2iCxIeyRIYyXJnyne-pkAX3VwEcTpj2P0Xplp2KxBvpxK2IIZlE33bB2J9oI5ggP4XG33ZGm233GAXBH4PJpyX3Y0tin5t8iYd87C33Dh75vaiLW433OZys33Pa2-8wTEzNdgdxqIGwfoEpyFh-3e5FrYQgOgVEGAH0yFup8pwFtkPIj5lx6l-UX3UIGoUCvoFIeFxh3ehOOICF2M_UFJyxionl7IKm1wSK6eGKYUDo9gS0jEfUumDgKZ5KmZ7C_USh7l_uy8uAOIBG_l_Zxl9oPm1wXEW4_UNZzVumRIIRs1gl55vmmQQSNVr5y1pW_l-xy1p-M1hloVpyBOAQf-BIbm6WtVkum2_1mIb071BuqE_ULR8NsIMculs1xFp4hOPoF4CAC0tVrl-1mikQWgW4y0n1-Z_UbAWIPl2Ngyya_UWIIQF0IRpYGKbIDILIHINBuwQ6YW3xys_UcJX4cVm5uazJM1kRw1vtxhKgM1_6mt8K3eXG_UPh-1kCdpD-aIM16F7lry8gKdtVp58dygTJ5y6Ns1gp-11FuyM1ntp4k8-KDwJmk8_d31-UW93824k81NkEk8p6-Id90Zm279-FRi99j155wDv2xi9Q8EhIJ12MqCJdw179sYTRFNMV99mdgDo3dgBoiUXRlEk8s9xD4VFGN499ql599oE8iAao99spijqj6oh9g1-jrNmN_D3NxD4UaKDm4N8S7Ck80OzjkUP28wf1i23jsao1_93ek84UWsuhqEk8wV-Z3UOi24g0BUzKLJ3wgF-UTKDV55rTumDobCzKC1wz-IElM6-cwO7iNTBRnd0IGYASPj2MzKTdizwVXGzKJ9-ZrTuRGmJD9gc2nG24zKZjvz9-VwV4misLu1w1zp9EMLujvz3qCAOYdnSTzKMN3ezKF4OIX1XT9oTKBDijx2vDuozKUDhLjUDEX90zktyszKdepeUUCtsLz9-8u4tmPVqEu43zys8UaiG6bC0UFLwbyIZN0b5TwbvIIR8wZt6cXuKO0bjjij0UXZeD7UKY0b8zw1twVDdgAso_XG5wHL55g7rMSpm4OwD479v4STiC0r-Zy7qYZl8gJm33DD3e17rKASD-WkHIWt6N6WIrzKa9kE377stARELMD47JNuzCzL247s77i7n0NFW43ZDz_b8xMTn4W45wCH-8twEcIA48EIWI7KGH9Ltjuo5wRrp4twX43c9F-907gbpn9IS8qAQn57ys5wDIdnynoHy2F0FIIQcinHijwXxIHqBcbEQntH_b_7zIdgH5juQn6rmXgoWYYUOnpyZwCLgX6WWBJ807gz_b03ugJm5wcjl7iWTy-ikByT5wYFyalKKIedwnmbpn_YfEbi862MhoznyH_34LtO-yIuEXxxH2wsNwDAXEbpH-yTgE6Xl73yCl2M88dPgX_odX9wbYD5y3mXoMor5wMd0vmcH0A3-UZwTr7Y5wXtXBAQX-2I9x0TmiugQn1Wm25wWsgcirw3wjmXxPTAcv8bpngsRkof5C87_bzZ6c9QzIYvZVwn-LijywNnWsyRrKbhGH4xhwGwVS2MywPbzf1wXap83Z7CywXv3erf1ATJ3MpYUk70uxId-Rrt2_kf-Z6wNnWfu0EsDz9N-AoYUBaFBaFtb-2vP_jLErYolLAxvJ4kARATGcJKJfWAbOFxqWBfeIJSwDOC4CdgY-QBXBEFVv6M88Bw3G1rf357IDHyoCCSg3wqKWBHyiJG_qf2J7bEWBAgbYLd1iKaIK2dgFPhJWV6b9QgYOCSi62eaklLyGAXGqSSQEglSS2wKUrX3aCklQ-95N_uwhyBs92A54IVHFVg5QkoIk_JQe_zzCVNZw1oaOu7xtraCP-HbW4qSVz5PEHBeYDtuwFrY_AjguocIEkAxTCDsKpJTgRUVJLogYuCnFEqSQ37zNSSxkQINfyfhFdSSv_SsggxuTRATOsZbsmt3mYkUXQxkRkHTBR5mD7y0PMcOwFvaz0chtAkEtDyj7O9GKSwLcpm2Dgo9FB5Q31A5Ak6v8cAzgHACj3t6Vldk2CD1B8RijhBqIuNXZIJwo67ISU1maGq4D8CZBfqIA-ZpaWKRFdLSZQ7Yg0R9Ds9biDRUIU5AaIChcEHgRPMcOvpmBDk2hZQHrF5QNx8IBcXOPnETikYS4qcGOBYW0BWEwIEEZQnbAcQOwlQccKYO-hmAzJh4oIijF7CHi-wIRYRA-GZGmh0R7YykN4V8J9TaR8IU0RXsiMOwK0Fw9icOFiM-HFxcRVALoJIGJECQ-ofsZQv5xaSgiKRJGKkRADxGSAWRP1ZEWWxuS2ZMR2IzkdyIFGhBbMTImSMixxoCB30EveAHYDZEiioAFoakfr0kAyiJQcooQAqJrgVxmosOScsekjyWZi0UIzhD0GrjtJLRXQMAEsAqyzglg8WHACID9qQ418gWRMBNCrj-A4A1Q0WL6JrjwBa8xaUUC-CEJjxGA9I0kczBczhALRs0DAiljDHPorgdoqTC6NGQWjmY8gTrEGP9E18OY1okMbQEMwki-onWOLPFjdEZAqsT2TGMAEdFzgdodYLUe_HlGPI7AW4OWD9DjBmB_oqAeMYjAowwjP0MuCwAWPgBXAoRY410R4HUC2Ja8cAcUMGlkwAFzRg4MFLOMRFvximaiO0TOIHi7jkQaiZsUeI9hzjc0ZgBQh7mcA04rOLIU0d3AfF05qAaiOvFgA_GzwLRaiGwN4V3jeE7EXDbAGonaSwApQ2QWzDeNXyjQvRdYcUdBLHjVja8P4rcVVjNSzQiUtOIhDgDNRVZwJtiXrMAH_F4BAJJLdACBJ8Cp5MU2AKrDhA7g0ByYMgJmGPAJGiwMCZUAgAsOo6EBEASmQiZBMomzx2ArYwScBJgLW4aJ2Ex8agFgLg4Ho0GZyK5CuCBRlJ7mOWBjFkgyS3xck3nL2MkCITZ4WsPSPeOJS6T8cx4n2CPHWCkTyJwEiMFgAvHQjdxEKKFBuLUDOS5xbkjjAATQkfovJu4ygAuNsRgSbEQk2zIFJ9iIIN0L48yUQiikhj_4JqPxjuOikJJkEQ0ZcauJ6zoAbxTUD3OxPHEbwKenomjEIBEAWZVwYAWAFgFrqjArgNUW9GolZzs4R00OGqdgHqkjBGpSSIUPkASkSQ14bAEiM1PWC-Q4QVUqJPqUzbUAnImaN8nASgGrhjIVE3qauDsgOQgCMwK4CVP_CFRJQBQHAMNwIBJJYAocK4NflXD9AgJl0saTWFGThjKpE42sP1NmmOQhpvcWhKBlrCdSsAuyTIDtPlAjBAZ2eBMmWIIAVj0AU0zGKtMcnzTYIYM-QoOI9xiFIsPwpgv9hoxnhhxv49YDjP8l3APxcAXUPMEkbdxwpEktSH-N4n2SoJjklqSWP4w-Q6YbGUmAIA_GKYHpfGNRFzkkzrBmxB4mAGuOyBqJxsXMgjPWlUxqIVsZ4nbH-IXAXom4MEiAuNDYBWi_RAY4sX6JDEVSCAkYzGMFg1k1wtZa0JmR8AzxtSDZ_MYAMOK6hKZLoCQfZOgAmC7T0QfOJTILKUxTjmZOebTHmgcwWATsTcKTNmK3FXAcZm4j9PbMDm1gcCIsK4HzLSBSYLAjWOrCnM4ASyc80mAbBnPFkZyK0C2DOStiUy_4HMQ0KsbYFJnbRdoOWVsfBLoK8jjZhY48NrODG3wJpdYyaGjS6BaSWMwAHVDgCiAzBF8OkohEsE_GwSSsFgMyThM0gxzs5_MMeZpAzlcYGZ083jGpAtERyxwtmC0QvMXn8w1iy86gHhNASrz-YwiK4CfLdyHyUEF8oObTN4kOS1AD8yaJTKgmzwN5ZcxeZyEmxSBeRfc9gH_MVgvZ1YYCgcU1DRlQApCvw0cYiJsk1gfZiU2-MFMXFShspws3KWokjmBJt5e_S8SeP3H4zd5hM7cVZJDGniACJMsmSgpwC5owpEEqmUQDoVoLQptkp-UBPpmeSCFLk6KT5I5njTWZtWdmXQoynVIHp0M3hXOPEVni0U0qOhQwuZBDi7syqOhV4j8lYZpFJ4tdmpnWD9Y_UiisdOsHFlGLm0NYQuapjMUBzlsH8YUNYrlmroxFlqWyYrP0xXptF6U8gp9Cai2EpgwMUGPvDxBojsQkYIqZyEjDQLYFTBd8DrCKhF80gZsagJYTF4GBwINGfgIKiZBIB2A_AIEMSCqDeAMgFoX8LhFyjrB-AtCANppH4CVUQAzkHAA0ucjlKaw_AcoG03S5EJaluSkAFBEmhkRYAMILAD6FwhPpyQlARIHmDyAYozQUoC0PkpBBFKBALSiwPwCiBoBul_AT8WbBWU9LMAZM8fh93gDdLoc_AWZaIByX8AAAejVFCg4BoMOAAAEy7LVlIAeEfUjgCbKQANyh5XcueUgAkkbSqLEwS-VXLHljSnADVGaUArVw_AdkRFlVHqiugoK5MDgFRXQrAVggLUCXCICgrbl9yp5axI-yfQdYBS6oBbNQCQAUgSS1ACkr0CAiu4IAWeITC0JIA8lZoWgBaHOUWhZgMwfgPIAUB5igAA",__position:1,__code:'<Autocomplete\n  placeholder="I am a placeholder"\n  data={countries}\n  onChange={console.log}\n/>',__scope:{props:this?this.props:n,Autocomplete:B,countries:O}},i.a.createElement(B,{placeholder:"I am a placeholder",data:O,onChange:console.log})))}}])&&U(n.prototype,t),l&&U(n,l),a}();F.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}}}]);
//# sourceMappingURL=titus-components-src-autocomplete-autocomplete.0c639240fea800b24c65.js.map