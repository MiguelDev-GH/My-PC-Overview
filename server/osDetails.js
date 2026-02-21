const si = require('systeminformation');
const os = require('os')

module.exports.OsAllDetails = async () => {
    const data = await si.get({
        versions: '*',
        time: '*',

        system: '*',
        bios:'*',
        baseboard:'*',
        chassis:'*',

        cpu: '*',
        cpuFlags: '*',
        cpuCache: '*',
        cpuCurrentSpeed: '*',
        cpuTemperature: '*',

        mem: '*',
        memLayout: '*',  

        uuid:"*",
        osInfo: '*',
        shell: '*',
        users: '*',   

        graphics: '*',

        net: '*',

        diskLayout: '*',    
        blockDevices:'*',
        disksIO:'*',
        fsSize:'*',
        fsOpenFiles:'*',
        fsStats:'*',

        networkInterfaces:'*',

        wifiNetworks:'*',
        wifiInterfaces:'*',
        wifiConnections:'*',

        battery: '*',            
    });

    data.user = os.userInfo()
    data.cpus = os.cpus()
    data.type = os.type()
    data.version = os.version()
    data.arch = os.arch()

    return data
}