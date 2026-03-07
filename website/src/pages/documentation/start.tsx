const Start = () => {
    return (
        <div className='content'>
            <h1>PC Overview</h1>
            <p>
                Welcome to the <strong>PC Overview</strong> documentation. This application is a real-time hardware monitoring 
                solution that bridges the gap between low-level system metrics and a modern web interface. 
                By utilizing a compiled executable, the application provides a seamless experience for monitoring your 
                computer's health without complex manual configurations.
            </p>

            <h1>How it Works</h1>
            <p>
                The project architecture is divided into two main layers: the <strong>Local Server</strong> and the <strong>Web Interface</strong>. 
                When you run the distributed <code>.exe</code> file (generated via PKG), a Node.js server initializes locally 
                on your machine. This server uses the <code>systeminformation</code> library to poll hardware data directly from 
                your OS.
            </p>

            <h1>Core Components</h1>
            <p>
                The application monitors four primary categories of hardware:
            </p>
            <ul>
                <li><strong>CPU:</strong> Real-time tracking of clock speed, temperature, and core utilization.</li>
                <li><strong>GPU:</strong> Monitoring VRAM usage, controller names, and vendor-specific driver versions.</li>
                <li><strong>Memory (RAM):</strong> Detailed breakdown of memory slots, form factors, and current usage percentage.</li>
                <li><strong>Storage & Network:</strong> Insight into physical disk partitions, filesystem health, and active network interfaces (IPv4/IPv6).</li>
            </ul>

            <h1>Initialization & Data Flow</h1>
            <p>
                Once the server starts, the React frontend begins fetching data through 
                two specific endpoints:
            </p>
            <ul>
                <li><code>/api/osDetails</code>: Fetched once upon startup to retrieve static information like hardware models, BIOS versions, and OS specs.</li>
                <li><code>/api/update</code>: Polled every 1500ms to provide "Quick Updates" on dynamic data like CPU temperature and RAM consumption.</li>
            </ul>

            <h1>System Requirements</h1>
            <p>
                To ensure accurate data reporting, please run the application with administrative privileges. 
                This allows <code>systeminformation</code> to access restricted hardware sensors, particularly for 
                GPU temperatures and advanced disk SMART data. 
                <strong> Note: Do not close the terminal window while using the web interface, as this will terminate the data stream.</strong>
            </p>
        </div>
    );
}

export default Start;