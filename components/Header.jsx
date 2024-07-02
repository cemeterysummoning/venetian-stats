import BootstrapClient from "./BootstrapClient";
import Image from "next/image";
import logoImg from '../public/logo.png'

function Header() {
    return ( 
        <header>
      <div class="navbar shadow-sm" style={{
        backgroundColor: "#FFFFFF"
      }}>
        <div class="container d-flex justify-content-between">
          <a href="/" class="navbar-brand d-flex align-items-center">
          <Image src={logoImg} width="100" height="100" style={
            {
              padding: 10,
            }
          }/>
          </a>
          <a href="/" class="navbar-brand d-flex align-items-center">
          <h4>Venetian Statistics</h4>
          </a>
        </div>
      </div>
    </header>
     );
}

export default Header;