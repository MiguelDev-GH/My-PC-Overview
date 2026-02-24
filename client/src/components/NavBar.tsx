import { Cpu, Gpu, MemoryStick, HardDrive, LayoutDashboard, Wifi, Github } from 'lucide-react'
import "./NavBar.css"

const NavBar = () => {
    return <nav>

        <a href="https://github.com/MiguelDev-GH/My-PC-Overview" target='blank'> <Github/> </a>

        <div className='icons'>
            <a href='#mainboard'><LayoutDashboard/></a>
            <a href='#cpu'><Cpu /></a>
            <a href='#gpu'><Gpu /></a>
            <a href='#disks'><HardDrive /></a>
            <a href='#memory'><MemoryStick /></a>
            <a href='#connection'><Wifi /></a>
        </div>
    </nav>
}

export default NavBar