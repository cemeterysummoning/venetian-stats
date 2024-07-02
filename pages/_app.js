import Header from "@/components/Header";
import Footer from "@/components/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from "@/components/BootstrapClient";
import '../styles/globals.css'

import { Cormorant_Garamond } from 'next/font/google';

const garamond = Cormorant_Garamond({
    weight: '400',
    subsets: ['latin']
}) 
function MyApp({ Component, pageProps }) {
    return (
        <main className={garamond.className}>
            <Header/>
            <Component {...pageProps} />
            <Footer />
            <BootstrapClient />
    </main>
)
}

export default MyApp;