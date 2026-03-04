# My PC Overview

**My PC Overview** is a powerful and intuitive application designed to provide a comprehensive look at your computer's hardware and software specifications in real-time. Built with a modern tech stack, it offers a clean dashboard to monitor everything from CPU temperatures to storage health.

## 🚀 Features

- **Real-time Monitoring**: Live updates for CPU speed, temperature, RAM usage, and VRAM usage.
- **Detailed Hardware Insights**: 
  - **CPU**: Brand, manufacturer, socket, cores, and thread counts.
  - **GPU**: Model, VRAM, driver version, and real-time performance metrics (Clock, Fan speed, Temperature).
  - **Memory (RAM)**: Detailed slot information, frequency, and total usage.
  - **Storage**: Capacity, health, usage percentages, and partition details for all connected disks.
- **Software & System Info**: OS distribution, kernel version, hostname, and active user details.
- **Network Overview**: Quick access to IP addresses (IPv4/IPv6) and active connection types (Wi-Fi/Ethernet).
- **Advanced Mode**: A deep dive into all raw system data for power users.

## 🛠️ Built With

- **[React](https://reactjs.org/)**: Powers the responsive and dynamic user interface.
- **[Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)**: A robust backend that serves system data through a custom API.
- **[systeminformation](https://systeminformation.io/)**: The core library used to fetch detailed and reliable system data.
- **[Lucide React](https://lucide.dev/)**: Provides clean and modern iconography for better visual clarity.

### Why these tools?
- **Speed & Efficiency**: Node.js and React ensure the application remains snappy even with frequent data updates.
- **Reliability**: `systeminformation` is one of the most comprehensive libraries for hardware data, supporting a wide range of platforms.
- **User Experience**: Lucide icons and React components create a seamless, professional-looking dashboard.

## 🚦 Getting Started

To run **My PC Overview** on your local machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/my-pc-overview.git
   cd my-pc-overview
   ```

2. **Setup the Server**:
   Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

3. **Run the Application**:
   Start the server:
   ```bash
   npm start
   ```

4. **Access the Dashboard**:
   Once started, open your browser and go to:
   `http://localhost:3067`

*Note: Do not close the terminal window while using the application, as it acts as the data provider for the dashboard.*

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Miguel Chagas Maciel
