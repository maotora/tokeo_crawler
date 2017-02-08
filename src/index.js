import 'babel-polyfill'
import app from './app'

const port = process.env.PORT || 3000
const appName = process.env.appName || 'Meh!'

app.listen(port, () => console.log(`\n${appName} \nRunning on 127.0.0.1:${port}`))
