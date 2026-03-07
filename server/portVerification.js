const net = require("net")
const readline = require('readline');

async function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', ()=>resolve(false));
        server.once('listening',()=>{
            server.close()
            resolve(true)
        })
        server.listen(port)
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function askForPort(params) {
    return new Promise((resolve) => {
        rl.question(`What port, should "My PC Overview" run (e.g: 3067)? `, async (answer) => {
            let chosenPort = parseInt(answer)

        if (isNaN(chosenPort) || chosenPort <= 0 || chosenPort > 65535) {
            console.log("⚠️  Error, type a valid PORT number (e.g: 1-65535).\n");
            return resolve(await askForPort());
        }

        const availabe = await isPortAvailable(chosenPort)
        if(availabe){
            rl.close();
            resolve(chosenPort);
        } else {
            console.log(`❌ Error, port ${chosenPort} not available, try another.\n`)
            return resolve(await askForPort())
        }

        })
    })
}

module.exports = { askForPort };