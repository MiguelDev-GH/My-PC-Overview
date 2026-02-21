import { useEffect, useState } from "react"
import { Cpu, Gpu, MemoryStick, HardDrive, LayoutDashboard, AppWindow } from 'lucide-react'
import "./App.css"

const App = () => {

  const [dataJson, seDataJson] = useState<any>(null)
  const [conectionType, setConectionType] = useState('')
  const [ipv, setIpv] = useState([])

  useEffect(()=>{

    async function loadData() {
      try{

        const response = await fetch("/api/osDetails")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const active = Object.values(data.networkInterfaces).find((iface: any) => iface.default);
        if (active) {
          setConectionType(active.type);
          setIpv([active.ip4, active.ip6])
        }

        seDataJson(data)
        console.log(dataJson)

      } catch(error){
        console.error("Erro: ",error)
      }
    }

    loadData()
    
  },[])

  if(!dataJson) return <div className="loading"><h2>Loading PC Specs...</h2><div className="loadingIcon"></div></div>

  return (
    <main className="App">

      <h1 className="titulo1">My PC Overview</h1>

      <p>Welcome <strong>{dataJson.user.username}</strong>!</p>
      <p>Users lenght: {dataJson.users.length}</p>
      {dataJson.users.length > 1 && <p>Other users:</p>}

      <h1><strong>{dataJson.osInfo.hostname}</strong> {dataJson.chassis.type} details: </h1>

      <div className="details">

        <div className="software">

          <span className="title"><h2><AppWindow/> Software</h2></span>

          <div className="content">
            <p><strong>OS</strong>: {dataJson.osInfo.platform}</p>
            <p><strong>Distro</strong>: {dataJson.osInfo.distro}</p>
            <p><strong>Software Version</strong>: {dataJson.version}</p>
            <p><strong>Uefi Activated</strong>: {JSON.stringify(dataJson.osInfo.uefi)}</p> 
          </div>

        </div>

        <h2>Hardware</h2>

        <div className="mainboard">

          <span className="title"><h2><LayoutDashboard/> Mainboard</h2></span>

          <div className="content">
            <p><strong>Manufacturer</strong>: {dataJson.system.manufacturer}</p>
            <p><strong>Model</strong>: {dataJson.baseboard.model} - {dataJson.baseboard.version}</p>
            <p><strong>Max Memory</strong>: {dataJson.baseboard.memMax / (1024 ** 3)} GB Ram</p>
            <p><strong>Memory Slots</strong>: {dataJson.baseboard.memSlots}</p>
          </div>

        </div>

        <div className="cpu">

          <span className="title"><h2><Cpu/> CPU</h2></span>

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

          <span className="title"><h2><Gpu/> GPU</h2></span>

          <div className="content">
            {dataJson.graphics.controllers.map((data: any,index: number)=>(
              <div key={index}>
                <h3>GPU {index+1} </h3>
                <p><strong>Name</strong>: {data.name}</p>
                <p><strong>Vendor</strong>: {data.vendor}</p>
                <p><strong>VRAM</strong>: {(data.vram).toFixed(0)} MB</p>
                <p><strong>Dynamic VRAM</strong>: {JSON.stringify(data.vramDynamic)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="disks">

          <span className="title"><h2><HardDrive/> Disks</h2></span>

          <div className="content">
            {dataJson.diskLayout.map((data: any,index: number) => (
              <div key={index}>

                <h3>Disk {index+1}</h3>

                  <p><strong>Name</strong>: {data.name}</p>
                  <p><strong>Brand</strong>: {data.vendor}</p>
                  <p><strong>Size</strong>: {(data.size / (1024 ** 3)).toFixed(2)} GB</p>
                  <p><strong>Type</strong>: {data.type}</p>
                  <p><strong>Interface Type</strong>: {data.interfaceType}</p>

              </div>
            ))}
          </div>

        </div>

        <div className="memory">

          <span className="title"><h2><MemoryStick/> RAM Memory</h2></span>

          <div className="content">
            {dataJson.memLayout.map((data: any,index: number)=>(
              <div key={index}>
                <h3>RAM {index + 1}</h3>
                <p><strong>Brand</strong>: {data.manufacturer}</p>
                <p><strong>Type</strong>: {data.type}</p>
                <p><strong>Size</strong>: {data.size / (1024 ** 2)} MB</p>
                <p><strong>Frequency</strong> (Clock Speed): {data.clockSpeed} Mhz</p>
                <p><strong>Form Factor</strong>: {data.formFactor}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="connection">

          <span className="title"><h2>Connection</h2></span>

          <div className="content">

          <p>Conection: <strong>{dataJson.wifiConnections[0].ssid}</strong>, via {conectionType}.</p>

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
