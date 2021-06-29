// [START sheets_quickstart]
const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const PROJECT_PATH = '/home/guigallo/git/roam/libs/google-sheet-importer'
const TOKEN_PATH = `${PROJECT_PATH}/token.json`
const CREDENTIALS_PATH = `${PROJECT_PATH}/credentials.json`

const Data = {
  objetos: {
    range: 'Lista de conteúdo dos objetos!A2:J',
    file: 'export/contentObjects.js',
  },
  extras: {
    range: 'Lista de conteúdos extras!A1:E',
    file: 'export/contentExtras.js',
  },
  contentCoordinatesSounds: {
    range: 'coordenadas corpos sonoros!A1:C',
    file: 'export/contentCoordinatesSounds.js',
  },
  contentCoordinatesObjects: {
    range: 'coordenadas objetos!A1:C',
    file: 'export/contentCoordinatesObjects.js',
  },
}

function getLists(auth) {
  listTable(auth, Data.objetos.range, Data.objetos.file)
  listTable(auth, Data.extras.range, Data.extras.file)
  listTable(
    auth,
    Data.contentCoordinatesSounds.range,
    Data.contentCoordinatesSounds.file
  )
  listTable(
    auth,
    Data.contentCoordinatesObjects.range,
    Data.contentCoordinatesObjects.file
  )
}

// Load client secrets from a local file.
fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), getLists)
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error('Error while trying to retrieve access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listTable(auth, range, saveTo) {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: '1Af7vnj6b1oiaqKT2NkKQcBls-Fyz5TtM06ynI3SOSWA',
      range,
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err)
      const rows = res.data.values
      if (rows.length) {
        // Print columns A and E, which correspond to indices 0 and 4.
        const columns = rows[0]
        const data = rows
          .map((row, i) => {
            if (i === 0) return
            const object = row.reduce(
              (prev, cur, i) => ({
                ...prev,
                [columns[i]]: cur,
              }),
              {}
            )
            return object
          })
          .filter((row) => {
            if (!row) return false
            if (!Object.values(row).length) return false
            return true
          })

        const text = `export default ${JSON.stringify(data, null, '  ')}`
        fs.writeFile(`${PROJECT_PATH}/${saveTo}`, text, (err) => {
          if (err) return console.error(err)
          console.log(`${saveTo} saved`)
        })
      } else {
        console.log('No data found.')
      }
    }
  )
}
// [END sheets_quickstart]

module.exports = {
  SCOPES,
  listTable,
}
