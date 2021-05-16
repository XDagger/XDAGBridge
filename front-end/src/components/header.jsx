import logo from "../images/logo.png";
import TypeWriter from "./typewriter";

export default function Header() {
    return(
        <div className="intro section">
            <div className="container">
                <p>XDAG bridge with Ethereum</p>
                <div className="units-row units-split wrap ">
                    <div className="unit-20 topLeft">
                        <img src={logo} alt="" />
                    </div>
                    <div className="unit-80">
                        <h1>YOU CAN<br />
                            <TypeWriter />
                        </h1>
                    </div>

                </div>
                <div>
                    <p>
                        XDAG is a novel application of Directed Acyclic Graph (DAG) technology that solves the issues currently facing blockchain technology. XDAG offer bleeding edge technology to offer a decentralised solution to the problems facing other cryptocurrencies. XDAG has no pre-mine or ICO, and is a true community-driven project aligned by a common goal and innovative development team.
                    </p>
                </div>
            </div>
        </div>
    )
}
