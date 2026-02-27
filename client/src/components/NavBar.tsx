import { Cpu, Gpu, MemoryStick, HardDrive, LayoutDashboard, Wifi, Github, Menu, Info } from 'lucide-react'
import "./NavBar.css"
import React, { useEffect, useState } from 'react'

const NavBar = () => {

    const[ativo,setAtivo] = useState(false)
    const[mobile,setMobile] = useState(window.innerWidth < 1250)

    function menuActive() {setAtivo(!ativo)}

    useEffect(()=>{
        const handleResize = () => {
            const isMobile = window.innerWidth < 1250
            setMobile(isMobile)
            if (!isMobile) setAtivo(false)
                
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    },[])

    return <nav>

        {ativo && <div className='overlay' style={{
            opacity: (ativo && mobile) ? 1 : 0,
        } as React.CSSProperties} onClick={()=>setAtivo(false)} ></div>}
            
            
        {!mobile && <a href="https://github.com/MiguelDev-GH/My-PC-Overview" target='blank'> <Github/> </a>}

        <Menu className='menuButton' onClick={menuActive}/>

        <div className='icons' style={{
            right: mobile ? (ativo ? "80px" : "-100%"): undefined,
        }}>
 
            <a className='mainboard' href='#mainboard' onClick={()=>setAtivo(false)}><LayoutDashboard/> <p>Mainboard</p></a>
            <a className='cpu' href='#cpu' onClick={()=>setAtivo(false)}><Cpu /><p>CPU</p></a>
            <a className='gpu' href='#gpu' onClick={()=>setAtivo(false)}><Gpu /><p>GPU</p></a>
            <a className='disks' href='#disks' onClick={()=>setAtivo(false)}><HardDrive /> <p>Disks</p></a>
            <a className='memory' href='#memory' onClick={()=>setAtivo(false)}><MemoryStick /> <p>Memory</p></a>
            <a className='connection' href='#connection' onClick={()=>setAtivo(false)}><Wifi /> <p>Connection</p></a>
            <a className='advanced' href='#advanced' onClick={()=>setAtivo(false)}><Info /> <p>Advanced</p></a>
            {mobile && <a href="https://github.com/MiguelDev-GH/My-PC-Overview" target='blank' className='github'> <Github/> </a>}
        </div>
    </nav>
}

export default NavBar