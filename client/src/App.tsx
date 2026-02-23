import React, { useEffect, useState, useRef } from "react"
import { Cpu, Gpu, MemoryStick, HardDrive, LayoutDashboard, AppWindow, Computer, Cable, Wifi, UsersRound, Cog, Flame, Fan } from 'lucide-react'
import "./App.css"

const App = () => {

  const [dataJson, seDataJson] = useState<any>(null)
  const [updatedDataJson, setUpdatedDataJson] = useState<any>(null)
  const [conectionType, setConectionType] = useState<string>('')
  const [ipv, setIpv] = useState<any[]>([])

  const [chassiType, setChassiType] = useState('')

  const [InitError, setInitError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function updateData() {
      try{
        const response2 = await fetch("/api/update");
        if (!response2.ok) throw new Error(`Error HTTP: ${response2.status}`);
        const updatedData = await response2.json();
        if (isMounted) setUpdatedDataJson(updatedData)
      } catch (error){
        console.error("Error to update data: ",error)
      }
    }

    async function loadData() {
      try {

        const response = await fetch("/api/osDetails")

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Error HTTP: ${response.status} ${errorText}`);
        }

        const data = await response.json()

        const response2 = await fetch("/api/update");
        if (!response2.ok) throw new Error(`Error HTTP: ${response2.status}`);
        const updatedData = await response2.json();

        if (isMounted){
          if (data.networkData && data.networkData.interfaces) {
            const active = Object.values(data.networkData.interfaces).find((iface: any) => iface.default) as any;
            if (active) {
              setConectionType(active.type);
              setIpv([active.ip4, active.ip6])
              setChassiType((data.systemData?.chassis.type).toLowerCase())
            }
          } else {
            console.warn("Interfaces de rede não encontradas");
            setConectionType('unknown');
          }


          setUpdatedDataJson(updatedData);
          seDataJson(data)
          setInitError(false)

          intervalId.current = window.setInterval(updateData, 1000);

        }

      } catch (error: any) {
        console.error("Error: ", error)
        setInitError(true)
        setErrorMessage(error.message)
      }
    }
 

    loadData()

    return () => {
      isMounted = false;
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }

  }, [])

  if (InitError) return <div className="errorScreen">
    <h2>Error</h2>
    <p>{errorMessage}</p>
    <h3>Check if server is running and restart the application!</h3>
  </div>

  if (!dataJson && !InitError) return <div className="loading">
    <h2>Loading PC Specs... </h2>
    <div className="loadingIcon"></div>
    <Computer />
  </div>

  return (
    <main className="App">

      <h1 className="titulo1">MY PC OVERVIEW</h1>

      <h1 className="titulo2"><strong>{dataJson.systemData.osInfo.hostname}</strong> {chassiType} details: </h1>

      <div className="details">

        <div className="users">
          <span className="title"><h2 style={{color: '#000000'}}><UsersRound /> Users</h2></span>
          <p>Welcome <strong>{dataJson.systemData.user.username}</strong>!</p>
          <p>Users length in {dataJson.systemData.osInfo.hostname}: <strong>{dataJson.systemData.users.length}</strong></p>
          {dataJson.systemData.users.length > 1 && <p>Other users:</p>}
        </div>

        <div className="software">

          <span className="title"><h2 style={{color: '#02334b'}}><AppWindow /> Software</h2></span>

          <div className="content">
            <p><strong>OS</strong>: {dataJson.systemData.osInfo.platform}</p>
            <p><strong>Distro</strong>: {dataJson.systemData.osInfo.distro}</p>
            <p><strong>Software Version</strong>: {dataJson.systemData.version}</p>
            <p><strong>Uefi Activated</strong>: {JSON.stringify(dataJson.systemData.osInfo.uefi)}</p>
            <p><strong>Virtual Machine</strong>: {String(dataJson.systemData.system.virtual)}</p>
          </div>

        </div>

        <h2>Hardware</h2>

        <div className="general">
          <span className="title"><h2 style={{color: '#242323'}}><Cog /> General</h2></span>

          <div className="content">
            <p style={{textAlign: 'center'}}>{dataJson.systemData.system.version}</p>
            <p><strong>Model</strong> {dataJson.systemData.system.model}</p>
            <p><strong>Serial</strong> {dataJson.systemData.system.serial}</p>
            <p><strong>UUID</strong> {dataJson.systemData.system.uuid}</p>
          </div>

        </div>

        <div className="mainboard">

          <span className="title"><h2 style={{color: '#2b0000'}}><LayoutDashboard /> Mainboard</h2></span>

          <div className="content">
            <p><strong>Manufacturer</strong>: {dataJson.systemData.system.manufacturer}</p>
            <p><strong>Model</strong>: {dataJson.systemData.baseboard.model} - {dataJson.systemData.baseboard.version}</p>
            <p><strong>Max Memory</strong>: {dataJson.systemData.baseboard.memMax / (1024 ** 3)} GB Ram</p>
            <p><strong>Memory Slots</strong>: {dataJson.systemData.baseboard.memSlots}</p>
          </div>

        </div>

        <div className="cpu">

          <span className="title"><h2 style={{color: '#023b07'}}><Cpu /> CPU</h2></span>

          <div className="content">
            <p><strong>Name</strong>: {dataJson.cpuData.info.brand}</p>
            <p><strong>Brand</strong>: {dataJson.cpuData.info.manufacturer}</p>
            <p><strong>Package</strong>: {dataJson.cpuData.info.socket}</p>
            <p><strong>Cores</strong>: {dataJson.cpuData.info.physicalCores}</p>
            <p><strong>Threads</strong>: {dataJson.cpuData.info.cores}</p>
            <p><strong>Speed</strong>: {(dataJson.cpuData.info.speed).toFixed(2)} @GHz</p>
          </div>

        </div>

        <div className="gpu">

          <span className="title"><h2 style={{color: '#2f7b3f'}}><Gpu /> GPU</h2></span>

          <div className="content">
            {dataJson.gpuData.graphics.controllers.map((data: any, index: number) => {
              
              let temperatureGpu = updatedDataJson.graphics[index].temperatureGpu
              let memoryUsed = updatedDataJson.graphics[index].memoryUsed
              let memoryTotal = updatedDataJson.graphics[index].memoryTotal
              let memoryPorcentage = ((memoryUsed / memoryTotal) * 100).toFixed(0)

              let clockCore = updatedDataJson.graphics[index].clockCore
              let clockMemory = updatedDataJson.graphics[index].clockMemory
              let fanSpeed = updatedDataJson.graphics[index].fanSpeed
              
              return (
              
              <div key={index}>
                <h3>GPU {index + 1} </h3>
                <p><strong>Name</strong>: {data.name}</p>
                <p><strong>Vendor</strong>: {data.vendor}</p>
                <p><strong>VRAM</strong>: {(data.vram || 0).toFixed(0)} MB</p>
                <p><strong>Dynamic VRAM</strong>: {JSON.stringify(data.vramDynamic)}</p>
                <p><strong>Power Limit</strong>: {data.powerLimit} W</p>
                <p><strong>{data.vendor} driver version</strong>: {data.driverVersion}</p>
                <p><strong>Sub Device ID</strong>: {data.subDeviceId}</p>

                {
                
                updatedDataJson ? <span>
                   
                  <div className="representations">

                    <div className="tempMeter">
                      <h2>Temperature</h2>
                      <div className="tempMeterContainer">
                        <div className="tempBackgroundGradient"></div>
                        <div 
                          className="tempLevelBar" 
                          style={{ "--tempHeight": `${temperatureGpu}%` } as React.CSSProperties}
                        ></div>
                      </div>
                      <p><Flame />{temperatureGpu} °C</p>
                    </div>

                    

                    <div className="gpuMemory">
                      <h2>VRAM Usage</h2>
                      <div className="gpuMemoryRepresentation" style={
                        {
                          "--gpuUsedMemory": `${memoryPorcentage}%`,
                        } as React.CSSProperties}>

                        <span className="percentageText">{memoryPorcentage}%</span>

                      </div>

                      <p><span style={{color:'#444444'}}>{memoryUsed} / {memoryTotal} <b>MB </b></span></p> 

                    </div>

                  </div>

                  <p><strong>Clock Core</strong>: {clockCore} MHz</p>
                  <p><strong>Clock Memory</strong>: {clockMemory} MHz</p>

                  <p><Fan /> <strong>Fan Speed</strong>: {fanSpeed}</p>

                </span>
                : <p>Loading real-time data...</p>
                }

              </div>
            )})}
          </div>
        </div>

        <div className="disks">

          <span className="title"><h2 style={{color: '#251901'}}><HardDrive /> Disks</h2></span>

          <div className="content">
            {dataJson.storageData.layout.map((data: any, index: number) => {
              
              const totalGB = (dataJson.storageData.fileSystem.size[index].size / (1024 ** 3)).toFixed(2);
              const usedGB = (dataJson.storageData.fileSystem.size[index].used / (1024 ** 3)).toFixed(2);
              const percentage = dataJson.storageData.fileSystem.size[index].use.toFixed(1);
              
              return (
              <div key={index}>
                <h3>{index + 1}</h3>
                <p><strong>Name</strong>: {data.name}</p>
                <p><strong>Brand</strong>: {data.vendor}</p>
                <p> <strong>Used / Total</strong>:{usedGB} / {totalGB} GB <b>({percentage}%)</b></p>
                <p><strong>Type</strong>: {data.type}</p>
                <p><strong>Interface Type</strong>: {data.interfaceType}</p>
                <p>{data.bytesPerSector} Bytes per sector</p>
                <p>{data.sectorsPerTrack} Sector per track</p>
                <p><strong>Total Tracks:</strong> {String(data.totalTracks)}</p> 
                <p><strong>Total Sectors:</strong> {String(data.totalSectors)}</p>
              </div>
            )})}
          </div>

        </div>

        <div className="memory">

          <span className="title"><h2><MemoryStick /> RAM Memory</h2></span>

          <div className="content">
            {dataJson.memoryData.layout.map((data: any, index: number) => (

              <div key={index}>
                <h3>{index + 1}</h3>
                <p><strong>Slot placed in motherboard</strong>: {data.bank}</p>
                <p><strong>Brand</strong>: {data.manufacturer}</p>
                <p><strong>Size</strong>: {data.size / (1024 ** 2)} MB</p>
                <p><strong>Frequency in use</strong> (Clock Speed): {data.clockSpeed} Mhz</p>
                <p><strong>Form Factor</strong>: {data.formFactor}</p>

              </div>
            ))}

            <div className="gpuMemory">
                <h2>Total RAM Usage</h2>
                <div className="gpuMemoryRepresentation" style={
                  {
                    "--gpuUsedMemory": `${((updatedDataJson.memory.used / 1024 ** 3) / (updatedDataJson.memory.total / 1024 ** 3) * 100).toFixed(2)}%`,
                  } as React.CSSProperties}>

                  <span className="percentageText">{((updatedDataJson.memory.used / 1024 ** 3) / (updatedDataJson.memory.total / 1024 ** 3) * 100).toFixed(2)}%</span>

                </div>

                <p><span style={{color:'#444444'}}>{(updatedDataJson.memory.used / 1024 ** 2).toFixed(0)} / {(updatedDataJson.memory.total / 1024 ** 2).toFixed(0)} <b>MB </b></span></p> 

              </div>

          </div>

        </div>

        <div className="connection">

          <span className="title"><h2>Connection</h2></span>

          <div className="content">
            <p><strong>{dataJson.networkData.wifi.connections[0]?.ssid || 'N/A'}</strong>, via {conectionType}.
              {conectionType === 'wireless' && <Wifi style={{opacity: .5}} />}
              {conectionType === 'wired' && <Cable style={{opacity: .5}} />}
            </p>

            <div className="ipvs">
              <p><strong>IPV4</strong>: {ipv[0]}</p>
              <p><strong>IPV6</strong>: {ipv[1]}</p>
            </div>
          </div>

        </div>

      </div>

    </main>
  )
}

export default App