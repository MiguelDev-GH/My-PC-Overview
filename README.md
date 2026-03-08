# My PC Overview

**My PC Overview** is a powerful and intuitive application designed to provide a comprehensive look at your computer's hardware and software specifications in real-time. Built with a modern tech stack, it offers a clean dashboard to monitor everything from CPU temperatures to storage health.

## Installation and initialization

To the installation you can check the PC-Overview website [here](https://migueldev-gh.github.io/My-PC-Overview/#/download).

Check website documentation to see details about initialization, [here](https://migueldev-gh.github.io/My-PC-Overview/#/documentation).

## 🚀 Features

- **Real-time Monitoring**: Live updates temperature, RAM usage, and VRAM usage.
- **Detailed Hardware Insights**: 
  - **CPU**: Brand, manufacturer, socket, cores, and thread counts.
  - **GPU**: Model, VRAM, driver version, and real-time performance metrics (Clock, Fan speed, Temperature).
  - **Memory (RAM)**: Detailed slot information, frequency, and total usage.
  - **Storage**: Capacity, health, usage percentages, and partition details for all connected disks.
- **Software & System Info**: OS distribution, kernel version, hostname, and active user details.
- **Network Overview**: Quick access to IP addresses (IPv4/IPv6) and active connection types (Wi-Fi/Ethernet).
- **Advanced Mode**: A deep dive into all raw system data for power users.

## 🛠️ Built With

### Front

- **[React](https://reactjs.org/)**: Powers the responsive and dynamic user interface.
- **[Lucide React](https://lucide.dev/)**: Provides clean and modern iconography for better visual clarity.

### Back
  
- **[Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)**: A robust backend that serves system data through a custom API.
- **[systeminformation](https://systeminformation.io/)**: The core library used to fetch detailed and reliable system data.

### Why these tools?
- **Speed & Efficiency**: Node.js and React ensure the application remains snappy even with frequent data updates.
- **Reliability**: `systeminformation` is one of the most comprehensive libraries for hardware data, supporting a wide range of platforms.
- **User Experience**: Lucide icons and React components create a seamless, professional-looking dashboard.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Miguel Chagas Maciel
