export const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'ro',
    name: 'Românā',
    flag: '🇷🇴'
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '🇵🇹'
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
  failureThreshold: 0.015, // Equates to 8% on CI, 1.5% local
  failureThresholdType: 'percent'
}
