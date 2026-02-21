import { useEffect, useState } from "react"
import { Cpu, Gpu, MemoryStick, HardDrive, LayoutDashboard, AppWindow, Computer, Cable, Wifi, UsersRound, Cog } from 'lucide-react'
import "./App.css"

const App = () => {

  const [dataJson, seDataJson] = useState<any>(null)
  const [updatedDataJson, setUpdatedDataJson] = useState<any>(null)
  const [conectionType, setConectionType] = useState<string>('')
  const [ipv, setIpv] = useState<any[]>([])

  const [InitError, setInitError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(()=>{

    async function loadData() {
      try{

        const response = await fetch("/api/osDetails")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const active = Object.values(data.networkInterfaces).find((iface: any) => iface.default) as any;
        if (active) {
          setConectionType(active.type);
          setIpv([active.ip4, active.ip6])
        }

        seDataJson(data)
        setInitError(false)

      } catch(error: any){
        console.error("Error: ",error)

        setInitError(true)
        setErrorMessage(error.message)
      }
    }

    async function updateData() {
  try {
    const response = await fetch("/api/update");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const updatedData = await response.json(); 

    setUpdatedDataJson(updatedData);
  } catch (error) {
    console.error("Update error:", error);
  }
}

    loadData()

    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval)
    
  },[])

  if(InitError) return <div className="errorScreen">
    <h2>Error</h2>
    <p>{errorMessage}</p>
    <h3>Check if server is running and restart the application!</h3>
  </div>

  if(!dataJson && !InitError) return <div className="loading">
    <h2>Loading PC Specs... </h2>
      <div className="loadingIcon"></div>
      <Computer/>
    </div>

  return (
    <main className="App">

      <h1 className="titulo1">MY PC OVERVIEW</h1>

      <h1 className="titulo2"><strong>{dataJson.osInfo.hostname}</strong> {dataJson.chassis.type} details: </h1>

      <div className="details">

        <div className="users">
          <span className="title"><h2 style={{color:'#000000'}}><UsersRound/> Users</h2></span>
          <p>Welcome <strong>{dataJson.user.username}</strong>!</p>
          <p>Users lenght in {dataJson.osInfo.hostname}: <strong>{dataJson.users.length}</strong></p>
          {dataJson.users.length > 1 && <p>Other users:</p>}
        </div>

        <div className="software">

          <span className="title"><h2 style={{color:'#02334b'}}><AppWindow/> Software</h2></span>

          <div className="content">
            <p><strong>OS</strong>: {dataJson.osInfo.platform}</p>
            <p><strong>Distro</strong>: {dataJson.osInfo.distro}</p>
            <p><strong>Software Version</strong>: {dataJson.version}</p>
            <p><strong>Uefi Activated</strong>: {JSON.stringify(dataJson.osInfo.uefi)}</p> 
            <p><strong>Virtual Machine</strong>: {String(dataJson.system.virtual)}</p>
          </div>

        </div>

        <h2>Hardware</h2>

        <div className="general">
          <span className="title"><h2 style={{color:'#242323'}}><Cog/> General</h2></span>

          <div className="content">
            <p style={{textAlign:'center'}}>{dataJson.system.version}</p>
            <p><strong>Model</strong> {dataJson.system.model}</p>
            <p><strong>Serial</strong> {dataJson.system.serial}</p>
            <p><strong>UUID</strong> (Universally Unique Identifier) {dataJson.system.uuid}</p>
          </div>

        </div>

        <div className="mainboard">

          <span className="title"><h2 style={{color:'#2b0000'}}><LayoutDashboard/> Mainboard</h2></span>

          <div className="content">
            <p><strong>Manufacturer</strong>: {dataJson.system.manufacturer}</p>
            <p><strong>Model</strong>: {dataJson.baseboard.model} - {dataJson.baseboard.version}</p>
            <p><strong>Max Memory</strong>: {dataJson.baseboard.memMax / (1024 ** 3)} GB Ram</p>
            <p><strong>Memory Slots</strong>: {dataJson.baseboard.memSlots}</p>
          </div>

        </div>

        <div className="cpu">

          <span className="title"><h2 style={{color:'#023b07'}}><Cpu/> CPU</h2></span>

          <div className="content">
            <p><strong>Name</strong>: {dataJson.cpu.brand}</p>
            <p><strong>Brand</strong>: {dataJson.cpu.manufacturer}</p>
            <p><strong>Package</strong>: {dataJson.cpu.socket}</p>
            <p><strong>Cores</strong> (Physical Cores): {dataJson.cpu.physicalCores}</p>
            <p><strong>Threads</strong> (Cores): {dataJson.cpu.cores}</p>
            <p><strong>Speed</strong>: {(dataJson.cpu.speed).toFixed(2)} @GHz</p>
          </div>

        </div>

        <div className="gpu">

          <span className="title"><h2 style={{color:'#2f7b3f'}}><Gpu/> GPU</h2></span>

          <div className="content">
            {(updatedDataJson && updatedDataJson.gpu) ? dataJson.graphics.controllers.map((data: any,index: number)=>(
              <div key={index}>
                <h3>GPU {index+1} </h3>
                <p><strong>Name</strong>: {data.name}</p>
                <p><strong>Vendor</strong>: {data.vendor}</p>
                <p><strong>VRAM</strong>: {(data.vram).toFixed(0)} MB</p>
                <p><strong>Dynamic VRAM</strong>: {JSON.stringify(data.vramDynamic)}</p>
                <p><strong>Power Limit</strong>: {data.powerLimit} W</p>
                <p><strong>{data.vendor} driver version</strong>: {data.driverVersion}</p>
                <p><strong>Sub Device ID</strong>: {data.subDeviceId}</p>
                <p><strong>Temperature</strong>: {updatedDataJson.temperatureGpu}</p>
              </div>
            )) : <p>Loading GPU data...</p>}
          </div>
        </div>

        <div className="disks">

          <span className="title"><h2 style={{color:'#251901'}}><HardDrive/> Disks</h2></span>

          <div className="content">
            {dataJson.diskLayout.map((data: any,index: number) => (
              <div key={index}>

                <h3>{index+1}</h3>

                  <p><strong>Name</strong>: {data.name}</p>
                  <p><strong>Brand</strong>: {data.vendor}</p>
                  <p><strong>Size</strong>: {(data.size / (1024 ** 3)).toFixed(2)} GB</p>
                  <p><strong>Type</strong>: {data.type}</p>
                  <p><strong>Interface Type</strong>: {data.interfaceType}</p>

                  <p>{data.bytesPerSector} Bytes per sector</p>
                  <p>{data.sectorsPerTrack} Sector per track</p>

                  <p><strong>Total Tracks:</strong> {data.totalTracks.toLocaleString()}</p>
                  <p><strong>Total Sectors:</strong> {data.totalSectors.toLocaleString()}</p>

              </div>
            ))}
          </div>

        </div>

        <div className="memory">

          <span className="title"><h2><MemoryStick/> RAM Memory</h2></span>

          <div className="content">
            {dataJson.memLayout.map((data: any,index: number)=>(
              <div key={index}>
                <h3>{index + 1}</h3>
                <p><strong>Slot placed in motherboard</strong>: {data.bank}</p>
                <p><strong>Brand</strong>: {data.manufacturer}</p>
                <p><strong>Type</strong>: {data.type}</p>
                <p><strong>Size</strong>: {data.size / (1024 ** 2)} MB</p>
                <p><strong>Frequency in use</strong> (Clock Speed): {data.clockSpeed} Mhz</p>
                <p><strong>Form Factor</strong>: {data.formFactor}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="connection">

          <span className="title"><h2>Connection</h2></span>

          <div className="content">

          <p><strong>{dataJson.wifiConnections[0].ssid}</strong>, via {conectionType}.
            {conectionType == 'wireless' && <Wifi style={{opacity:.5}}/>}            
            {conectionType == 'wired' && <Cable style={{opacity:.5}}/>}
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
