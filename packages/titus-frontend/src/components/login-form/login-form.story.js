import React from 'react'
import Layout from '../layout'
import docs from './login-form.mdx'
import LoginForm from './'

export default {
  title: 'Login Form',
  decorators: [story => <Layout>{story()}</Layout>],
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const Default = () => <LoginForm />
Default.story = {
  parameters: {
    // Can attach these tests to all the stories
    // via the default export.
    async puppeteerTest(page) {
      // Default Login Form
      const image = await page.screenshot()
      expect(image).toMatchImageSnapshot()
      // Grab the submit button and hit it
      const button = await page.$('[type="submit"]')
      button.click()
      // Snapshot that a required message should show
      const requiredFields = await page.screenshot()
      expect(requiredFields).toMatchImageSnapshot()
    }
  }
}
export const CustomHeader = () => (
  <LoginForm header="Log in using the details provided to you by email" />
)
export const CustomPowerMessage = () => (
  <LoginForm powerMessage="powered by Titus" />
)
export const AllowPasswordChange = () => (
  <LoginForm allowChangePassword={true} loginError="Temporary password" />
)
export const LoginError = () => (
  <LoginForm loginError="There was a problem logging in." />
)
const CustomForm = ({ isSubmitting }) => (
  <button className="button" disabled={isSubmitting} type="submit">
    Login with Auth0
  </button>
)
export const RenderPropsForm = () => <LoginForm form={CustomForm} />
