const express = require('express')
const https = require('https')
const app = express()
const PORT = 8080

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const getSecretFilesData = async () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'echo-serv.tbxnet.com',
      port: 443,
      path: '/v1/secret/files',
      method: 'GET',
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    }

    const httpRequest = https.request(options, (response) => {
      let data = ''
      response.on('data', (chunk) => {
        data += chunk
      })
      response.on('end', () => {
        resolve(JSON.parse(data))
      })
    })
    httpRequest.on('error', (error) => {
      console.error(error)
      return new Error(error, { error: 'Error al realizar la solicitud' })
    })
    httpRequest.end()
  })
}

const getEachDataFile = (file) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'echo-serv.tbxnet.com',
      port: 443,
      path: `/v1/secret/file/${file}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    }

    const httpRequest = https.request(options, (response) => {
      let data = ''
      response.on('data', (chunk) => {
        data += chunk
      })
      response.on('end', () => {
        resolve(data)
      })
    })
    httpRequest.on('error', (error) => {
      console.error(error)
      return new Error(error, { error: 'Error al realizar la solicitud' })
    })
    httpRequest.end()
  })
}

const rowsHandler = (rows) => {
  const header = rows[0].split(',')
  const checkContent = rows.slice(1).filter(row => {
    const data = row.split(',')
    return data.length === header.length && data.every(value => value.trim() !== '')
  })
  return checkContent
}

const responseBuilder = (data, file) => {
  const fileData = data.toString()
  const rows = fileData.trim().split('\n')
  const dataFormatted = rowsHandler(rows)

  if (dataFormatted.length === 0) {
    return null
  }

  const formattedLines = dataFormatted.map(line => {
    const [text, number, hex] = line.split(',').slice(1)
    return { text, number: parseInt(number), hex }
  })
  return { file, lines: formattedLines }
}

app.get('/files/data', async (req, res) => {
  const params = req.query
  const container = []
  try {
    if (params.fileName) {
      const file = await getEachDataFile(params.fileName)
      const response = responseBuilder(file, params.fileName)
      res.status(200).json(response)
    } else {
      const listOfFiles = await getSecretFilesData()
      for (let file = 0; file < listOfFiles.files.length; file++) {
        const response = await getEachDataFile(listOfFiles.files[file])
        container.push(responseBuilder(response, listOfFiles.files[file]))
      }
      const data = container.filter(Boolean)
      res.status(200).json(data)
    }
  } catch (error) {
    console.log(error)
    console.error(`Error en la obtencion de datos: ${error.message}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/files/list', async (req, res) => {
  try {
    const fileData = await getSecretFilesData()
    res.status(200).json(fileData)
  } catch (error) {
    console.log(error)
    console.error(`Error en la obtencion de datos: ${error.message}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

module.exports = app
