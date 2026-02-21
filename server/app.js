const express = require("express")
const path = require("path")
const app = express()
const PORT = 3067

const cors = require('cors');
app.use(cors())

const {OsAllDetails} = require("./osDetails")

app.get("/api/osDetails", async (req,res)=>{
    try{
        const data = await OsAllDetails()
        res.json(data)
    } catch (error) {
        res.sendStatus(500).send("Erro ao carregar os dados: ",error)
    }
})

app.use(express.static(path.join(__dirname, "../client")));

app.listen(3067, ()=>{
    console.log(`Rodando na porta ${PORT}`)
})