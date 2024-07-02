import Image from "next/image";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Head from "next/head";

export default function Home() {
  return (
   <>
   <Head>
    <title>Venetian Statistics</title>
   </Head>
     <div className="content">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <h5>U18 Novice</h5>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            <Button variant="outlined" href='./u18-novice' sx={{color: "#d6a02a", borderColor: "#d6a02a", }}>
              Standings
            </Button>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header">
            <h5>U18 Championship</h5>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            <Button variant="outlined" href="./u18-championship" sx={{color: "#d6a02a", borderColor: "#d6a02a", }}>
                Standings
              </Button>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header">
            <h5>Senior Novice</h5>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            <Button variant="outlined" href="senior-novice" sx={{color: "#d6a02a", borderColor: "#d6a02a", }}>
                Standings
              </Button>
          </AccordionDetails>
        </Accordion>
              
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header">
            <h5>Senior Championship</h5>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            <Button variant="outlined" href="senior-championship" sx={{color: "#d6a02a", borderColor: "#d6a02a", }}>
                Standings
              </Button>
          </AccordionDetails>
        </Accordion>
              
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header">
            <h5>U18 International</h5>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            <Button variant="outlined" href="u18-international" sx={{color: "#d6a02a", borderColor: "#d6a02a", }}>
                Standings
              </Button>
          </AccordionDetails>
        </Accordion>
              
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6-content"
          id="panel6-header">
            <h5>International Championship</h5>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            <Button variant="outlined" href="international-championship" sx={{color: "#d6a02a", borderColor: "#d6a02a", }}>
                Standings
              </Button>
          </AccordionDetails>
        </Accordion>
     </div>
   </>
  );
}