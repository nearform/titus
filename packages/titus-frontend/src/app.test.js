import React from 'react'
import { shallow } from 'enzyme'
import App from './app'

describe('<App />', () => {
  test('should render correctly', () => {
    const component = shallow(<App />).dive()
    // expect(component.find())
    expect(component).toMatchSnapshot()
  })
})

// import {} from 'enzyme'

// const AsyncLogin = lazy(() => import('./pages/login'))
// const AsyncDashboard = lazy(() => import('./pages/dashboard'))

// const authentication = new Authentication()

// const App = () => (
//   <Suspense fallback={s<Loading />}>
//     <Auth authentication={authentication} component={Login}>
//       {isAuthenticated => (
//         <Router history={history}>
//           <Switch>
//             <Route path="/login">
//               <AsyncLogin />
//             </Route>
//             <Route
//               path="/"
//               render={() =>
//                 isAuthenticated ? <AsyncDashboard /> : <Redirect to="/login" />
//               }
//             />
//             {/* INSERT NEW ROUTES HERE */}
//           </Switch>
//         </Router>
//       )}
//     </Auth>
//   </Suspense>
// )

// export default App
