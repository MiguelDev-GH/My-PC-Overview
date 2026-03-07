import React from 'react';

const Errors = () => {
    return (
        <div className='content'>
            <h1>Common Errors & Limitations</h1>
            <p>
                While <strong>PC Overview</strong> is designed to be a comprehensive monitoring tool, 
                certain hardware configurations or operating system restrictions may prevent 
                some data from being displayed. Below are the most common scenarios.
            </p>

            <h1>1. Permission Denied (Accessing Sensors)</h1>
            <p>
                This is the most frequent cause for missing data such as <strong>CPU Temperatures</strong> or 
                <strong> GPU Fan Speeds</strong>.
            </p>
            <ul>
                <li><strong>Windows:</strong> Many hardware sensors require the application to be "Run as Administrator."</li>
                <li><strong>Linux:</strong> The library often needs <code>sudo</code> to read from <code>/dev/cpu</code> or to execute <code>dmidecode</code>.</li>
                <li><strong>Solution:</strong> Close the terminal and relaunch the executable with elevated privileges.</li>
            </ul>

            <h1>2. Partial API Data</h1>
            <p>
                The <code>systeminformation</code> API relies on the underlying OS tools (WMI on Windows, sysfs on Linux). 
                If the OS doesn't provide the data, the API will return <code>null</code> or <code>N/A</code>.
            </p>
            <ul>
                <li><strong>Virtual Machines:</strong> If running inside a VM, the app may not see physical hardware details (like GPU model or RAM serial numbers) because the hypervisor abstracts them.</li>
                <li><strong>Hardware Compatibility:</strong> Older hardware or brand-new components might not yet have full sensor support in the current version of the library.</li>
            </ul>

            <h1>3. Network Connection Errors</h1>
            <p>
                Since the React frontend communicates with a local Node.js server, firewall settings or port conflicts can block the data stream.
            </p>
            <ul>
                <li><strong>"Failed to Fetch":</strong> This error usually means the backend server (the terminal window) was closed or the defined port is being blocked by a firewall.</li>
                <li><strong>Port Already in Use:</strong> If you try to launch the app on a port already taken by another service, the server will fail to start.</li>
            </ul>

            <h1>4. Real-time Update Lags</h1>
            <p>
                The application polls for "Quick Updates" every <strong>1500ms</strong>.
            </p>
            <ul>
                <li>If your system is under 100% CPU load, the background process might take longer to respond, causing the UI gauges to stutter or delay.</li>
            </ul>
        </div>
    );
}

export default Errors;