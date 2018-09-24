module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    copy: [{ ignore: ['*.mdx'] }]
  }
}
