const express = require("express")
const path = require("path")
const open = require("open")
const app = express()
const PORT = 3067

const cors = require('cors');
app.use(cors())

const {OsAllDetails} = require("./osDetails")

app.use(express.static(path.join(__dirname, "client")));

app.get("/api/osDetails", async (req,res)=>{
    try{
        const data = await OsAllDetails()
        res.json(data)
    } catch (error) {
        res.status(500).send("Erro ao carregar os dados: ",error)
    }
})

app.get("/api/update", async (req, res) => {
    const fullData = await OsAllDetails();
    res.json({
        cpu: fullData.cpuData.currentSpeed,
        temp: fullData.cpuData.temperature,
        gpu: fullData.gpuData.graphics.controllers[0],
        mem: fullData.memoryData.usage
    });
});

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(3067, async ()=>{

    console.log("PC Overview opening... \n")

    console.log(`========================================== \n`);
    console.log(`    Server running at http://localhost:${PORT}`);
    console.log(`    DON'T CLOSE THIS WINDOW!`);
    console.log(`    Accessing system... \n`);
    console.log(`==========================================\n`);
    console.log(`    To stop the application, close this window or terminate the process.`);

    // try {
    //     await open(`http://localhost:${PORT}`);
    // } catch (err) {
    //     console.log("ERROR: Could not open localhost in browser.\n");
    //     console.log(err)
    // }
})