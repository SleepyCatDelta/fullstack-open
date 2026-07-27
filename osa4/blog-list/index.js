const app = require('./app')
const { connectDB } = require('./utils/config')

connectDB()

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
