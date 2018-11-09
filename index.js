const express = require('express')
const JSZip = require("jszip")
const axios = require('axios')

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  zip = new JSZip()
  zip.file("hello.txt", "Hello World\n")

  await axios.get('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', {
    responseType: 'arraybuffer'
  })
  .then(function (response) {
    zip.file('test.pdf', response.data, {binary: true})
  })

  await zip.generateAsync({type: 'nodebuffer'})
  .then((buf) => {
    res.type('application/zip')
    res.send(buf)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
