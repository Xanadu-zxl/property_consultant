module.exports = {
  devServer: {
    proxy: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
}


