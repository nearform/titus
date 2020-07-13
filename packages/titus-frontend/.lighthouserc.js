module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': 'warn',
        'categories:accessibility': 'warn',
        'categories:best-practices': 'warn',
        'categories:seo': 'warn',
        'categories:pwa': 'warn'
      }
    }
  }
}
