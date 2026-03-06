import { useState } from "react"
import "./Documentation.css"
import Start from "./documentation/start"
import GettingStarted from "./documentation/gettingstarted"

const Documentation = () => {

    const [tab,setTab] = useState("Start")

    return <main className="Documentation">

        <aside>
            <h1 style={{ padding:'20px'}}>Documentation</h1>
            <section>
                <p onClick={()=>setTab("Start")}>About</p>
                <p onClick={()=>setTab("GettingStarted")}>Getting started</p>
            </section>
        </aside>

        <div className="Details">
            {tab === "Start" && <Start/>}
            {tab === "GettingStarted" && <GettingStarted/>}
        </div>

    </main>
}

export default Documentation