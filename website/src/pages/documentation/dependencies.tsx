const Dependencies = () => {
    return (
        <div className='content'>
            <h1>System Requirements & Dependencies</h1>
            <p>
                Because <strong>PC Overview</strong> is distributed as a standalone, compiled executable (<code>.exe</code>). You only need to have:
                <ul>
                    <li>Node.JS</li>    
                </ul> 
                
                Otherwise you <strong>do not</strong> need to install Python, React, or any complex dependencies to run it. Everything the application needs is already bundled inside.
            </p>

            <h1>What You Need to Run the App</h1>
            <p>
                To successfully launch and use the application, your system only needs the following basics:
            </p>
            <ul>
                <li><strong>Operating System:</strong> Windows (64-bit) to run the provided <code>.exe</code> file.</li>
                <li><strong>Administrative Privileges:</strong> You must run the executable as an Administrator. This is strictly required to allow the application to read low-level hardware sensors (like GPU temperatures and advanced disk SMART data).</li>
                <li><strong>Web Browser:</strong> A modern web browser (like Chrome, Edge, or Firefox). The application will automatically open your default browser to display the dashboard.</li>
                <li><strong>Network Port:</strong> The app runs a local server on port <code>3000</code>. If port 3000 is busy, it will automatically try the next available port (e.g., 3001).</li>
            </ul>

            <h1>Troubleshooting</h1>
            <p>
                If the application opens but fails to display certain metrics (like temperatures or detailed VRAM usage), ensure that you did not accidentally close the terminal window that opened with the app, and verify that you launched the program with <strong>"Run as Administrator"</strong>.
            </p>
        </div>
    );
}

export default Dependencies;