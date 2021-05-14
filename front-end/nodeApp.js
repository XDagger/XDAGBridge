const express = require('express')
const app = express()
const port = 8888

const { createProxyMiddleware } = require('http-proxy-middleware');
// const axios = require('axios')

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});


// app.use('/', createProxyMiddleware({ target: 'http://127.0.0.1:7667', changeOrigin: true }))
app.use('/', createProxyMiddleware({ target: 'https://explorer.xdag.io', changeOrigin: true }))

app.listen(port, () => {
    console.log(`Example app listening on http://127.0.0.1:${port}`)
    })


