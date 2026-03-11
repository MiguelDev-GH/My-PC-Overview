import express from "express"
import path from "path"
import open from "open"
import server from "net"
import boxen from "boxen"
import cors from "cors"

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { type } from "os"
import { cpuCurrentSpeed, graphics } from "systeminformation"
import { resolve } from "dns"

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { OsAllDetails, getQuickUpdate } from "./osDetails.js"

app.use(cors())

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

        let message = "Starting..." 
        
        // Primeiro Box (Mantido como no original)
        console.log(boxen(message, {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'green',
            title: 'PC OVERVIEW',
            titleAlignment: 'center',
            textAlignment: 'center'
        }));    

        // Segundo Box (Substituindo os console.logs com "===" manuais)
        const serverInfo = `Server running at http://localhost:${PORT}\n` +
                           `DON'T CLOSE THIS WINDOW!\n` +
                           `Accessing system...\n\n` +
                           `To stop the application, close this window or terminate the process.`;

        console.log(boxen(serverInfo, {
            padding: 1,
            margin: { bottom: 1, left: 1, right: 1, top: 0 },
            borderStyle: 'bold',
            borderColor: 'blue',
            textAlignment: 'center'
        }));

        try {
             await open(`http://localhost:${PORT}`);
        } catch (err) {
             console.log(boxen(`ERROR: Could not open localhost in browser.\n\n${err.message || err}`, {
                 padding: 1,
                 borderColor: 'red',
                 borderStyle: 'single'
             }));
        }
    });   
    
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(boxen(`⚠️  Port ${PORT} is busy. Trying port ${PORT + 1}...`, {
                padding: 1,
                borderColor: 'yellow',
                borderStyle: 'round'
            }));
            init(PORT + 1); 
        } else {
            console.error(boxen(`❌ Unexpected error trying to start the server:\n\n${err.message || err}`, {
                padding: 1,
                borderColor: 'red',
                borderStyle: 'double'
            }));
        }
    });
}

init(3000);