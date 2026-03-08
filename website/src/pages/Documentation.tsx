import { useState } from "react"
import "./Documentation.css"
import Start from "./documentation/start"
import GettingStarted from "./documentation/gettingstarted"
import Errors from "./documentation/errors"
import Instalation from "./documentation/instalation"

const Documentation = () => {

    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });

    const [tab,setTab] = useState("Start")

    return <main className="Documentation">

        <aside>
            <h1 style={{ padding:'20px'}}>Documentation</h1>
            <section>
                <p onClick={()=>setTab("Start")} style={{
                    backgroundColor: tab === "Start" ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)',
                    borderBottomColor: tab === "Start" ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.3)',
                    borderRadius: tab === "Start" ? '5px' : '5px 5px 0 0'
                    }}>About</p>

                <p onClick={()=>setTab("GettingStarted")} style={{
                    backgroundColor: tab === "GettingStarted" ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)',
                    borderBottomColor: tab === "GettingStarted" ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.3)',
                    borderRadius: tab === "GettingStarted" ? '5px' : '5px 5px 0 0'
                    }}>Getting started</p>

                <p onClick={()=>setTab("Instalation")} style={{
                    backgroundColor: tab === "Instalation" ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)',
                    borderBottomColor: tab === "Instalation" ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.3)',
                    borderRadius: tab === "Instalation" ? '5px' : '5px 5px 0 0'
                    }}>Instalation</p>

                <p onClick={()=>setTab("Errors")} style={{
                    backgroundColor: tab === "Errors" ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)',
                    borderBottomColor: tab === "Errors" ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.3)',
                    borderRadius: tab === "Errors" ? '5px' : '5px 5px 0 0'
                    }}>Possible errors</p>
            </section>
        </aside>

        <div className="Details">
            {tab === "Start" && <Start/>}
            {tab === "GettingStarted" && <GettingStarted/>}
            {tab === "Instalation" && <Instalation/>}
            {tab === "Errors" && <Errors/>}
        </div>

    </main>
}

export default Documentation