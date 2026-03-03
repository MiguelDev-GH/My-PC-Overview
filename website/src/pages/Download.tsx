import { DownloadIcon } from "lucide-react"
import WindowsLogo from "../assets/windowsLogo.png"
import MacOsLogo from "../assets/macOsLogo.png"
import LinuxLogo from "../assets/linuxLogo.png"
import "./Download.css"

const Download = () => {
    return (
        <main className="Download">
            <div className="home">
                <DownloadIcon size={120} /> <h1>Download</h1>
            </div>

            <div className="downloads">
                <div>
                    <img src={WindowsLogo} />
                    <div>
                        <h2>Windows</h2>
                        <p>64bits</p>
                        <p>32bits</p>
                    </div>
                </div>
                <div>
                    <img src={LinuxLogo} style={{'filter': 'brightness(1)'}}/>
                    <div>
                        <h2>Linux</h2>
                        <p>64bits</p>
                        <p>32bits</p>
                        <p>arm</p>
                    </div>
                </div>
                <div>
                    <img src={MacOsLogo} />
                    <div>
                        <h2>Mac</h2>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Download