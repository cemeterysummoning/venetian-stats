import BootstrapClient from "./BootstrapClient";
import Image from "next/image";
import logoImg from '../public/logo.png'
import Link from "next/link";

function Header() {
    return ( 
        <header>
      <div className="navbar shadow-sm" style={{
        backgroundColor: "#FFFFFF"
      }}>
        <div className="container d-flex justify-content-between">
          <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image src={logoImg} width="100" height="100" style={
            {
              padding: 10,
            }
          }/>
          </Link>
          <Link href="/" className="navbar-brand d-flex align-items-center">
          <h4>Venetian Statistics</h4>
          </Link>
        </div>
      </div>
    </header>
     );
}

export default Header;