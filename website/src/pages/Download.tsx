import { DownloadIcon, ArrowDownToDot, Copy } from "lucide-react"
import WindowsLogo from "../assets/windowsLogo.png"
import MacOsLogo from "../assets/macOsLogo.png"
import LinuxLogo from "../assets/linuxLogo.png"
import Logo from "../assets/logo.png"
import "./Download.css"

const Download = () => {

    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });

    return (
        <main className="Download">
            <div className="home">
                <img src={Logo}/>
                <span><DownloadIcon size={120} /> <h1>Download</h1></span>
            </div>

            <div className="downloads">
                <div>
                    <img src={WindowsLogo} />
                    <div>
                        <h2>Windows</h2>
                        <div><p>64bits</p> <a href="../executables/mpco-win-x64.exe" download="PC Overview.exe"><button><ArrowDownToDot /></button></a></div>
                    </div>
                </div>
                
                <div>
                    <span className="images">
                        <img src={LinuxLogo} style={{'filter': 'brightness(1)'}}/>
                        <p>&</p>
                        <img src={MacOsLogo} />
                    </span>
                    <div>
                        <h2>Linux & Mac</h2>
                        <code>curl -sL https://raw.githubusercontent.com/MiguelDev-GH/My-PC-Overview/main/server/install.sh | sudo bash</code>
                        <Copy className="copyIcon" onClick={(e)=>{
                            navigator.clipboard.writeText("curl -sL https://raw.githubusercontent.com/MiguelDev-GH/My-PC-Overview/main/server/install.sh | sudo bash")

                            e.currentTarget.animate([
                                { 
                                    transform: 'scale(1.4)',
                                    backgroundColor:"black",
                                    color:'white'
                                },
                                { transform: 'scale(1.3)' }
                            ], {
                                duration: 300,        
                                iterations: 1,        
                                easing: 'ease-in-out' 
                            });

                        }}/>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Download