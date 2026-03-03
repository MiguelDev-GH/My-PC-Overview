import HomePic from "./../../../client/src/assets/PageInitTitle.png"
import { Cpu, Gpu, MemoryStick, HardDrive, LayoutDashboard, Wifi, Server, Layout } from 'lucide-react'
import "./Home.css"

const Home = () => {
  return <main className="Home">

        <div className="head" id="head">
          <img src={HomePic}></img>
          <div>
            <p>Your real-time browser, hardware monitorer</p>
          </div>  
        </div>

        <div className="about"> 
          <div className="overview">
            <strong>PC Overview </strong> 
            is a powerful local application that extracts and displays detailed information about 
            your computer's hardware and operating system. Built with modern web technologies, it 
            provides a complete view of what's happening "under the hood" of your machine.

            <br /><br />

            With a fast Node.js server reading data directly from the system and a dynamic React.js 
            interface displaying it all, you have access to component specifications, temperature monitoring, 
            and real-time resource usage, all running offline and securely on your own PC.
          </div>

          <h2>What you can monitor</h2>

          <div className="grids">
              <div>
                  <Cpu size={40} style={{color: '#02334b'}}/>
                  <h3> Processor (CPU)</h3>
                  <p>Detailed information about the model, cores, threads, and real-time monitoring of temperature and speed.</p>
                </div>
                <div>
                  <Gpu size={40} style={{color: '#25631c'}}/>
                  <h3> Graphics (GPU)</h3>
                  <p>Data about your graphics cards, power limits, VRAM usage, temperatures, and fan speeds.</p>
                </div>

                <div>
                    <MemoryStick size={40} style={{color: '#6f1d1d'}}/> 
                    <h3>RAM Memory</h3>
                    <p>Visualization of total system memory usage, plus physical details about each installed RAM stick (size, speed, brand).</p>
                </div>

                <div>
                    <HardDrive size={40} style={{color: '#6f551d'}}/>
                    <h3> Storage</h3>
                    <p>Free and used space on all your disks and partitions, plus data on disk type (SSD/HDD) and health.</p>
                </div>

                <div>
                    <LayoutDashboard size={40} style={{color: '#6f6f1d'}}/> 
                    <h3>System & Motherboard</h3>
                    <p>Operating System details, active users, motherboard manufacturer, BIOS model, and hardware limits.</p>
                </div>

                <div>
                    <Wifi size={40} style={{color: '#1d6b6f'}}/>
                    <h3> Connectivity</h3>
                    <p>Status of your current network (Wi-Fi or Cable), local IPs (IPv4 and IPv6), and a list of all network interfaces.</p>
                </div>

          </div>


          <div className="engine"> 

            <div>

              <h2><Server/> Node</h2>
              <p>A lightweight local server built with <strong>Express</strong>. It uses the robust <code>systeminformation</code> and <code>os</code> Node libraries to talk directly to your operating system.</p>
              <li> Deep hardware data collection on startup.</li>
              <li> Ultra-fast endpoint for real-time data (temperatures, speeds).</li>
              <li> Serves the static interface files.</li>

            </div>

          </div>

        </div>

    </main>
}

export default Home