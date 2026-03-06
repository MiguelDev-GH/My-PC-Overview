import {Github, BookOpenText} from "lucide-react"
import { Link } from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {
    return <nav>
        <a href="https://github.com/MiguelDev-GH/My-PC-Overview" target="_blank" className="githubLink"><Github/></a>
        <ul>
            <li><Link to="/"> Home  </Link></li>
            <li><Link to="/download"> Download </Link></li>
            <li><Link to="/documentation"><BookOpenText/></Link></li>
        </ul>
    </nav>
}

export default NavBar