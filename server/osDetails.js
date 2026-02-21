const si = require('systeminformation');
const os = require('os');

module.exports.OsAllDetails = async () => {
    const rawData = await si.get({
        // Grupo Sistema
        system: '*',
        bios: '*',
        baseboard: '*',
        chassis: '*',
        uuid: "*",
        osInfo: '*',
        shell: '*',
        users: '*',
        versions: '*',
        time: '*',
        battery: '*',

        // Grupo CPU
        cpu: '*',
        cpuFlags: '*',
        cpuCache: '*',
        cpuCurrentSpeed: '*',
        cpuTemperature: '*',

        // Grupo Memória
        mem: '*',
        memLayout: '*',

        // Grupo Gráficos
        graphics: '*',

        // Grupo Rede
        net: '*',
        networkInterfaces: '*',
        wifiNetworks: '*',
        wifiInterfaces: '*',
        wifiConnections: '*',

        // Grupo Disco
        diskLayout: '*',
        blockDevices: '*',
        disksIO: '*',
        fsSize: '*',
        fsOpenFiles: '*',
        fsStats: '*'
    });

    // Estruturando o retorno final por categorias
    return {
        systemData: {
            system: rawData.system,
            bios: rawData.bios,
            baseboard: rawData.baseboard,
            chassis: rawData.chassis,
            uuid: rawData.uuid,
            osInfo: rawData.osInfo,
            shell: rawData.shell,
            users: rawData.users,
            versions: rawData.versions,
            time: rawData.time,
            battery: rawData.battery,
            // Dados do módulo 'os'
            user: os.userInfo(),
            type: os.type(),
            version: os.version(),
            arch: os.arch()
        },
        cpuData: {
            info: rawData.cpu,
            flags: rawData.cpuFlags,
            cache: rawData.cpuCache,
            currentSpeed: rawData.cpuCurrentSpeed,
            temperature: rawData.cpuTemperature,
            cpus: os.cpus() // Dados do módulo 'os'
        },
        memoryData: {
            usage: rawData.mem,
            layout: rawData.memLayout
        },
        gpuData: {
            graphics: rawData.graphics
        },
        networkData: {
            net: rawData.net,
            interfaces: rawData.networkInterfaces,
            wifi: {
                networks: rawData.wifiNetworks,
                interfaces: rawData.wifiInterfaces,
                connections: rawData.wifiConnections
            }
        },
        storageData: {
            layout: rawData.diskLayout,
            blockDevices: rawData.blockDevices,
            io: rawData.disksIO,
            fileSystem: {
                size: rawData.fsSize,
                openFiles: rawData.fsOpenFiles,
                stats: rawData.fsStats
            }
        }
    };
};