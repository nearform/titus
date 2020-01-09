import React from 'react'
// import { render, fireEvent } from '@testing-library/react'
import { shallow, mount } from 'enzyme'

import { Form } from './form'
// import PropTypes from 'prop-types'

describe('LoginForm', () => {
  it('should render right', async () => {
    const authentication = {
      parseHash: () => {
        return new Promise(resolve => {
          resolve()
          return true
        })
      } //acho que precisa ser uma promise
    }

    const component = shallow(
      <Form login={() => {}} authentication={authentication} />
    )

    expect(component).toMatchSnapshot()
    // expect(authentication.parseHash.toHaveBeenCalledTimes(1))
  })
})

// export const Form = ({ login, authentication }) => {
//   useEffect(() => {
//     authentication
//       .parseHash()
//       // in case the url contains details, trigger login to resume redirect on dashboard
//       .then(isAuthenticated => isAuthenticated && login())
//   })
//   return (
//     <button className="button" onClick={login}>
//       Login through Auth0
//     </button>
//   )
// }

// Form.propTypes = {
//   login: PropTypes.func.isRequired
// }
