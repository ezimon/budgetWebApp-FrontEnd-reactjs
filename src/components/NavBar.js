import React from 'react'
import './navbar.css'
// import handImg from "../assets/hand.png";
// import billsImg from "../assets/bills.png";
import walletImg from "../assets/wallet.png";
// import statsImg from "../assets/stat.png"
import statsImg from "../assets/stats.png"
import ingresoImg from "../assets/ingr.png"
import egresoImg from "../assets/egr.png"


export const NavBar = ({setRoute}) => {
    return (
        <div className="navBar shadow-4">
        <button label="egreso" className="navBtn shadow-3 grow"
          onClick={() => setRoute("egreso")}>
          <img className="navImg" alt="s" src={egresoImg} />
        </button>
        <button label="stats" className="navBtnR shadow-3 grow"
          onClick={() => setRoute("stats")}>
          <img className="navImg" alt="s" src={statsImg} />
        </button>
        <button label="wallet" className="navBtn shadow-3 grow"
          onClick={() => setRoute("wallet")}>
          <img className="navImg" alt="s" src={walletImg} />
        </button>
        <button label="ingreso" className="navBtnR shadow-3 grow"
        onClick={() => setRoute("ingreso")}>
          <img className="navImg" alt="s" src={ingresoImg} />
        </button>
      </div>
    )
}
