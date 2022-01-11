const express = require('express')
const cors = require('cors')
const multiparty = require('connect-multiparty')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))


const multipartyMiddleware = multiparty({uploadDir: './uploads'})

app.post('/upload', multipartyMiddleware, (req , res ) => {
  const files = req.files;
  console.log(files)
  res.json({message: files})
})

app.use((err, req, res, next) => {
  res.json({error: err.message})
})

app.get('/', (req, res) => {
  return res.json("Estou funcionando")
})

app.listen(8080, () => {
  console.log("ouvindo 8080")
})

