import React, { useEffect, useState, useRef } from "react"
import { Cpu, Gpu, MemoryStick, HardDrive, LayoutDashboard, AppWindow, Computer, Cable, Wifi, UsersRound, Cog, Flame, Fan } from 'lucide-react'
import NavBar from "./components/NavBar.tsx"
import "./App.css"
import PageInitTitle from "./assets/PageInitTitle.png"

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

          setChassiType((data.systemData?.chassis?.type || '').toLowerCase())

          if (data?.networkData && data?.networkData?.interfaces) {
            Object.values(data.networkData.interfaces || {}).map((iface: any) => {

              if(iface.operstate == 'up' && iface.default){
                if (iface) {
                  setConectionType(iface?.type || '');
                  setIpv([iface?.ip4, iface?.ip6])
                }
              }

            }) as any;
            
          } else {
            console.warn("Interfaces de rede não encontradas");
            setConectionType('unknown');
          }


          setUpdatedDataJson(updatedData || '');
          seDataJson(data || '')
          setInitError(false)

          intervalId.current = window.setInterval(updateData, 1500);

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

  const system = {
    'version': dataJson.systemData?.system?.version,
    'model': dataJson.systemData?.system?.model,
    'serial': dataJson.systemData?.system?.serial,
    'uuid': dataJson.systemData?.system?.uuid
  }

  const baseboard = {
    'manufacturer': dataJson.systemData?.system?.manufacturer,
    'model':dataJson.systemData?.baseboard?.model,
    'version':dataJson.systemData?.baseboard?.version,
    'memMax':(dataJson.systemData?.baseboard?.memMax) / (1024 ** 3),
    'memSlots':dataJson.systemData?.baseboard?.memSlots
  }

  const cpu = {
    'brand':dataJson.cpuData?.info?.brand,
    'manufacturer':dataJson.cpuData?.info?.manufacturer,
    'socket':dataJson.cpuData?.info?.socket,
    'physicalCores':dataJson.cpuData?.info?.physicalCores,
    'cores':dataJson.cpuData?.info?.cores,
    'speed':dataJson.cpuData?.info?.speed

  }

  return (
    <main className="App">

      <NavBar/>

      {/* <h1 className="titulo1">MY PC OVERVIEW</h1> */}

      <img src={PageInitTitle} className="PageInitTitle"/>

      <h1 className="titulo2"><strong>{dataJson.systemData?.osInfo?.hostname}</strong> {chassiType} details: </h1>

      <div className="details">

        <div className="users">
          <span className="title"><h2 style={{color: '#000000'}}><UsersRound /> Users</h2></span>
          <p>Welcome <strong>{dataJson.systemData?.user?.username}</strong>!</p>
          <p>Users length in {dataJson.systemData?.osInfo?.hostname}: <strong>{dataJson.systemData?.users?.length}</strong></p>
          {dataJson.systemData?.users?.length > 1 && <p>Other users:</p>}
        </div>

        <div className="software" style={{}}>

          <span className="title"><h2 style={{color: '#02334b'}}><AppWindow /> Software</h2></span>

          <div className="content">
            <p><strong>OS</strong>: {dataJson.systemData?.osInfo?.platform}</p>
            <p><strong>Distro</strong>: {dataJson.systemData?.osInfo?.distro}</p>
            <p><strong>Software Version</strong>: {dataJson.systemData?.version}</p>
            <p><strong>Uefi Activated</strong>: {JSON.stringify(dataJson.systemData?.osInfo?.uefi)}</p>
            <p><strong>Virtual Machine</strong>: {String(dataJson.systemData?.system?.virtual)}</p>
          </div>

        </div>

        </div>

        <div className="details">

        <h2>Hardware</h2>

        <div className="general" style={{}}>
          <span className="title"><h2 style={{color: '#242323'}}><Cog /> General</h2></span>

          <div className="content">

            {system.version && <p style={{textAlign: 'center'}}>{system.version}</p>}
            {system.model && <p><strong>Model</strong> {system.model}</p>}
            {system.serial && <p><strong>Serial</strong> {system.serial}</p>}
            {system.uuid && <p><strong>UUID</strong> {system.uuid}</p>}
          </div>

        </div>

        <div className="mainboard" id="mainboard">

          <span className="title"><h2 style={{color: '#2b0000'}}><LayoutDashboard /> Mainboard</h2></span>

          <div className="content">
            {baseboard.manufacturer &&<p><strong>Manufacturer</strong>: {baseboard.manufacturer}</p>}
            {baseboard.model &&<p><strong>Model</strong>: {baseboard.model} - {baseboard.version}</p>}
            {baseboard.memMax &&<p><strong>Max Memory</strong>: {baseboard.memMax} GB Ram</p>}
            {baseboard.memSlots &&<p><strong>Memory Slots</strong>: {baseboard.memSlots}</p>}
          </div>

        </div>

        <div className="cpu" id="cpu" style={{borderBottomColor:'#023b07'}}>

          <span className="title"><h2 style={{color: '#023b07'}}><Cpu /> CPU</h2></span>

          <div className="content">
            {cpu.brand &&<p><strong>Name</strong>: {cpu.brand}</p>}
            {cpu.manufacturer &&<p><strong>Brand</strong>: {cpu.manufacturer}</p>}
            {cpu.socket &&<p><strong>Package</strong>: {cpu.socket}</p>}
            {cpu.physicalCores &&<p><strong>Cores</strong>: {cpu.physicalCores}</p>}
            {cpu.cores &&<p><strong>Threads</strong>: {cpu.cores}</p>}
            {cpu.speed &&<p><strong>Speed</strong>: {(cpu.speed || 0).toFixed(2)} @GHz</p>}
          </div>

        </div>

        <div className="gpu" id="gpu" style={{borderBottomColor:'#2f7b3f'}}>

          <span className="title"><h2 style={{color: '#2f7b3f'}}><Gpu /> GPU</h2></span>

          <div className="content">
            {dataJson.gpuData.graphics.controllers.map((data: any, index: number) => {
              
              let temperatureGpu = updatedDataJson?.graphics[index]?.temperatureGpu
              let memoryUsed = updatedDataJson?.graphics[index]?.memoryUsed
              let memoryTotal = updatedDataJson?.graphics[index]?.memoryTotal
              let memoryPorcentage = ((memoryUsed / memoryTotal) * 100).toFixed(0)

              let clockCore = updatedDataJson?.graphics[index]?.clockCore
              let clockMemory = updatedDataJson?.graphics[index]?.clockMemory
              let fanSpeed = updatedDataJson?.graphics[index]?.fanSpeed
              
              return (
              
              <div key={index}>
                <h3>GPU {index + 1} </h3>
                {data.name &&<p><strong>Name</strong>: {data.name}</p>}
                {data.vendor &&<p><strong>Vendor</strong>: {data.vendor}</p>}
                {data.vram &&<p><strong>VRAM</strong>: {(data.vram || 0).toFixed(0)} MB</p>}
                {data.vramDynamic &&<p><strong>Dynamic VRAM</strong>: {JSON.stringify(data.vramDynamic)}</p>}
                {data.powerLimit &&<p><strong>Power Limit</strong>: {data.powerLimit} W</p>}
                {data.driverVersion &&<p><strong>{data.vendor} driver version</strong>: {data.driverVersion}</p>}
                {data.subDeviceId &&<p><strong>Sub Device ID</strong>: {data.subDeviceId}</p>}

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
                          "--UsedMemory": `${memoryPorcentage}%`,
                          "--cor": "#00539c"
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

        <div className="disks" id="disks" style={{}}>

          <span className="title"><h2 style={{color: '#251901'}}><HardDrive /> Disks</h2></span>

          <div className="content">
            {dataJson.storageData.layout.map((data: any, index: number) => {
              
              const totalGB = Number((dataJson.storageData?.fileSystem?.size[index]?.size / (1024 ** 3) || 0).toFixed(2));
              const usedGB = Number((dataJson.storageData?.fileSystem?.size[index]?.used / (1024 ** 3) || 0).toFixed(2));
              const percentage = (dataJson.storageData?.fileSystem?.size[index]?.use || 0).toFixed(1);
              const cor = percentage < 30 ? '#125b71' : 
                percentage < 60 ? '#127112' : 
                percentage < 80 ? '#adb900' : '#b90000';
              
              return (
              <div key={index}>
                <h3>{index + 1}</h3>
                {data.name && <p><strong>Name</strong>: {data.name}</p>}
                {data.vendor &&<p><strong>Brand</strong>: {data.vendor}</p>}
                {data.type &&<p><strong>Type</strong>: {data.type}</p>}
                {data.interfaceType &&<p><strong>Interface Type</strong>: {data.interfaceType}</p>}
                {data.bytesPerSector &&<p>{data.bytesPerSector} Bytes per sector</p>}
                {data.sectorsPerTrack &&<p>{data.sectorsPerTrack} Sector per track</p>}
                {data.totalTracks &&<p><strong>Total Tracks:</strong> {String(data.totalTracks)}</p>}
                {data.totalSectors &&<p><strong>Total Sectors:</strong> {String(data.totalSectors)}</p>}

                <div className="representations">

                  <div className="diskRepresentation" style={
                    {
                      "--diskUsagePercentage":`${percentage}%`,
                      "--cor":cor
                    } as React.CSSProperties}>
                      <div className="bar"></div>

                  </div>

                  <p><strong>{usedGB} / {totalGB} GB</strong></p>
                  <p><b>({percentage}%)</b></p>

                </div>
              </div>
            )})}

          </div>


            <h2 style={{textAlign:'center', marginTop:'20px'}}>Partitions or other storages</h2>

            <div className="blockDevices">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>File System Type</th>
                  <th>Removable</th>
                  <th>Type</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {dataJson.storageData?.blockDevices.map((data:any, index:number)=>{
                  
                return (

                    <tr key={index}>
                      <td><p> <b>{data.name} {data.physical && ` - ${data.physical}`}</b></p></td>
                      <td><p> <b>{data.fsType || '...'}</b></p></td>
                      <td><p> {String(data.removable)}</p></td>
                      <td><p> {data.type}</p></td>
                      <td><p> {data.size ? (data.size / 1024 ** 3).toFixed(2) + 'GB' : '...'} </p></td>
                    </tr>

                  
                )})}
                </tbody>
                </table>
            </div>
        </div>

        <div className="memory" id="memory">

          <span className="title"><h2><MemoryStick /> RAM Memory</h2></span>

          <div className="content">
            {dataJson.memoryData.layout.map((data: any, index: number) => (

              <div key={index}>
                <h3>{index + 1}</h3>
                {data.bank &&<p><strong>Slot placed in motherboard</strong>: {data.bank}</p>}
                {data.manufacture &&<p><strong>Brand</strong>: {data.manufacturer}</p>}
                {data.size &&<p><strong>Size</strong>: {data.size / (1024 ** 2)} MB</p>}
                {data.clockSpeed &&<p><strong>Frequency in use</strong> (Clock Speed): {data.clockSpeed} Mhz</p>}
                {data.formFactor &&<p><strong>Form Factor</strong>: {data.formFactor}</p>}

              </div>
            ))}

            <div className="ramMemory">
                <h2>Total RAM Usage</h2>
                <div className="ramMemoryRepresentation" style={
                  {
                    "--UsedMemory": `${((updatedDataJson?.memory?.used / 1024 ** 3) / (updatedDataJson?.memory?.total / 1024 ** 3) * 100).toFixed(2)}%`,
                    "--cor": "green"
                  } as React.CSSProperties}>

                  <span className="percentageText">{((updatedDataJson?.memory?.used / 1024 ** 3) / (updatedDataJson?.memory?.total / 1024 ** 3) * 100).toFixed(2)}%</span>

                </div>

                <p><span style={{color:'#444444'}}>{(updatedDataJson?.memory?.used / 1024 ** 2).toFixed(0)} / {(updatedDataJson?.memory?.total / 1024 ** 2).toFixed(0)} <b>MB </b></span></p> 

              </div>

          </div>

        </div>

        <div className="connection" id="connection">

          <span className="title"><h2>Connection</h2></span>

          <div className="content">
            <p><strong>{dataJson.networkData?.wifi?.connections[0]?.ssid || 'N/A'}</strong>, via {conectionType}.
              {conectionType === 'wireless' && <Wifi style={{opacity: .5}} />}
              {conectionType === 'wired' && <Cable style={{opacity: .5}} />}
            </p>

            <div className="ipvs">
              <p><strong>IPV4</strong>: {ipv[0]}</p>
              <p><strong>IPV6</strong>: {ipv[1]}</p>
            </div>
          </div>

          <h3 style={{textAlign:'center'}}>Other Connections</h3>

          <div className="otherConnections">

            {Object.values(dataJson.networkData?.interfaces || {}).map(( x:any, index:number) => (
                <p key={index}><b>{(x.iface)}</b> - {(x?.ip4)}</p>
            ))}
          </div>

        </div>

        

      </div>

    </main>
  )
}

export default App