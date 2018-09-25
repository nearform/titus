import { withLive } from 'react-live'

export const LiveConsumer = withLive(({ live, children }) => children(live))
