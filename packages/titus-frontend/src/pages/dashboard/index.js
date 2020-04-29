import React, { useContext } from 'react'
import { AuthContext } from '../../components/authentication/authentication-context'
import Dashboard from '../../components/dashboard'

// TODO:: Need to do something with this if we are using the AD powered auth
// import { authContext } from '../../components/auth-providers/azure-ad/adalConfig'

const DashboardContainer = () => {
  const { logout } = useContext(AuthContext)
  // const [adIdToken, setAdIdToken] = useState(null)

  // This stuff only happens if the AuthProvider is AD
  // useEffect(() => {
  //   if (!authContext) {
  //     return
  //   }

  //   const adIdToken = localStorage.getItem(
  //     authContext.CONSTANTS.STORAGE.IDTOKEN
  //   )

  //   if (adIdToken) {
  //     setAdIdToken({ adIdToken })
  //   }
  // }, [])

  // const testAzureAuth = async () => {
  //   const headers = {
  //     Authorization: `Bearer ${adIdToken}`
  //   }
  //   try {
  //     const response = await fetch('/user', { headers })
  //     const json = await response.json()
  //     alert(`Azure UPN: ${json.userPrincipalName}`)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  return <Dashboard logout={logout} />
}

export default DashboardContainer
