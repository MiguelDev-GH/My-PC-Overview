const GettingStarted = () => {
    return (
        <div className='content'>
            <h1>Getting Started</h1>
            <p>
                This guide will help you set up and run <strong>PC Overview</strong> for the first time. 
                The application is designed to be portable and efficient, providing real-time hardware metrics.
            </p>

            <h1>Installation</h1>
            <p>
                The application is distributed as an executable file (<code>.exe</code>) generated via PKG. 
                Follow the steps below:
            </p>
            <ul>
                <li>Download the latest version of the executable.</li>
                <li>Place the file in a folder of your choice.</li>
                <li>Ensure the network port you intend to use is open in your firewall.</li>
            </ul>

            <h1>Running the Application</h1>
            <p>
                When you run the file, the Node.js server will initialize, and a terminal window will appear with the following information:
            </p>
            <ul>
                <li><strong>Port Selection:</strong> The user defines the communication port upon launching the application.</li>
                <li><strong>Server Status:</strong> A message confirming the server is running at <code>http://localhost:[YOUR_PORT]</code>.</li>
                <li><strong>System Access:</strong> The server will immediately begin accessing system components to gather data.</li>
                <li><strong>Warning:</strong> It is critical <strong>not to close the terminal window</strong>, as it serves as the engine providing data to the web interface.</li>
            </ul>

            <h1>First Access</h1>
            <p>
                With the server running, open your browser and go to the address shown in the terminal (e.g., <code>http://localhost:3067</code>). 
                The React application will load system details via the internal API. 
                On the first run, it may take a few seconds to collect all initial hardware data.
            </p>

            <h1>Troubleshooting & Permissions</h1>
            <p>
                If you encounter an error screen or missing information:
            </p>
            <ul>
                <li><strong>Server Check:</strong> Verify if the terminal window is still open and active.</li>
                <li><strong>Admin Rights:</strong> Ensure you run the application with <strong>Administrator privileges</strong> (Windows) or <strong>sudo</strong> (Linux). This is required for <code>systeminformation</code> to access hardware sensors like GPU and CPU temperatures.</li>
                <li><strong>Linux Specifics:</strong> Some hardware details may remain hidden on Linux if the user lacks direct access to <code>/dev/</code> or <code>/sys/</code> directories.</li>
                <li><strong>Network:</strong> Refresh the page if the connection times out or the local network fluctuates.</li>
            </ul>
        </div>
    );
}

export default GettingStarted;