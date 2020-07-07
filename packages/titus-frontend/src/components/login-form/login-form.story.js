import React from 'react'
import Layout from '../layout'
import docs from './login-form.mdx'
import LoginForm from './'
import { MATCH_OPTIONS } from '../../constants'

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
      expect(image).toMatchImageSnapshot(MATCH_OPTIONS)
      // Grab the submit button and hit it
      const button = await page.$('[type="submit"]')
      await button.click()
      // Snapshot that a required message should show
      const requiredFields = await page.screenshot()
      expect(requiredFields).toMatchImageSnapshot(MATCH_OPTIONS)

      // Set a username with an invalid password
      await page.focus('#username')
      await page.keyboard.type('Foo')
      await page.focus('#password')
      await page.keyboard.type('Bar')
      await button.click()
      const invalidPassword = await page.screenshot()
      expect(invalidPassword).toMatchImageSnapshot(MATCH_OPTIONS)

      // Set a valid password
      await page.focus('#password')
      await page.keyboard.type('Bar4')
      await button.click()
      // Snapshot will just be an empty form as LoginForm
      // isn't wrapped in routes, pages etc
      const validPassword = await page.screenshot()
      expect(validPassword).toMatchImageSnapshot(MATCH_OPTIONS)
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
