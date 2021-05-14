import React, { useState, useEffect } from 'react'
import Loading from 'components/loading'
import config from 'lib/config'

const RemoteAwsConfigContainer = ({ children }) => {
  if (!config.remoteAwsConfigPath) {
    return <>{children}</>
  }

  return <RemoteAwsConfig>{children}</RemoteAwsConfig>
}

const RemoteAwsConfig = ({ children }) => {
  const [isInit, setIsInit] = useState(false)
  const [error, setError] = useState()
  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch(config.remoteAwsConfigPath, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
          setError((await response.json()).message)
          return
        }
        const result = await response.json()
        config.aws = {
          region: result.region,
          userPoolId: result.userPoolId,
          userPoolWebClientId: result.userPoolWebClientId,
          identityPoolId: result.identityPoolId
        }
        setIsInit(true)
      } catch (e) {
        setError(e.message)
      }
    }

    fetchConfig()
  }, [])

  if (error) {
    return (
      <div>
        <h1>Initialization Error</h1>
        <div>{error}</div>
      </div>
    )
  }

  return !isInit ? <Loading /> : <>{children}</>
}

export default RemoteAwsConfigContainer
