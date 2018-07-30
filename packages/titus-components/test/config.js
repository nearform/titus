import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
