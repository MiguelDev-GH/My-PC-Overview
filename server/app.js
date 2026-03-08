const express = require("express")
const path = require("path")
const open = require("open")
const app = express()
const server = require('net')

const cors = require('cors');
app.use(cors())

const { OsAllDetails, getQuickUpdate } = require("./osDetails")
const { type } = require("os")
const { cpuCurrentSpeed, graphics } = require("systeminformation");
const { resolve } = require("dns");

app.use(express.static(path.join(__dirname, "client")));

app.get("/api/osDetails", async (req,res)=>{
    try{
        const data = await OsAllDetails()
        res.json(data)
    } catch (error) {
        res.status(500).send("Error to load data: ",error)
    }
})

app.get("/api/update", async (req, res) => {
    try{
        const quickData = await getQuickUpdate();
        res.json(quickData);
    } catch (error){
        res.status(500).json({ "Error to update data":error  });
    }
});

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

function init(PORT) {

    // 1. Guardamos o servidor na constante 'server'
    const server = app.listen(PORT, async () => {
        
        console.log("PC Overview opening... \n");
        console.clear();
        console.log(`========================================== \n`);
        console.log(`    Server running at http://localhost:${PORT}`);
        console.log(`    DON'T CLOSE THIS WINDOW!`);
        console.log(`    Accessing system... \n`);
        console.log(`==========================================\n`);
        console.log(`    To stop the application, close this window or terminate the process.`);

        try {
            await open(`http://localhost:${PORT}`);
        } catch (err) {
            console.log("ERROR: Could not open localhost in browser.\n");
            console.log(err);
        }
    });   

    // 2. Escutador de erro FORA do callback de sucesso
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`⚠️  Port ${PORT} is busy. Trying port ${PORT + 1}...`);
            // Chama a si mesma (init) para tentar a próxima porta!
            init(PORT + 1); 
        } else {
            console.error('❌ Unexpected error trying to start the server:', err);
        }
    });
}

init(3000)