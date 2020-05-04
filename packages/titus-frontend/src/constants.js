export const LANGUAGES = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'ro',
    name: 'Românā'
  },
  {
    code: 'sr',
    name: 'Српски'
  },
  {
    code: 'pt',
    name: 'Português'
  }
]

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/'
}

export const AUTH_PROVIDERS = {
  AD: 'AD',
  AUTH0: 'AUTH0',
  AWS: 'AWS',
  MEM: 'MEM',
  TITUS: 'TITUS'
}

export const MATCH_OPTIONS = {
  failureThreshold: process.env.CI === 'true' ? 0.08 : 0.015, // Equates to 8% on CI, 1.5% local
  failureThresholdType: 'percent'
}
