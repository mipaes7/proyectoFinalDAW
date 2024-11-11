import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuidv4 } from 'uuid';

const CharactersAccordion = ({characters}) => {
  return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      Characters
    </AccordionSummary>
    <AccordionDetails>
      <ul>
        {characters.map((character) => (
          <li key={uuidv4()}>
            <h3>{character.character.name}</h3>
            <img src={character.character.images.jpg.image_url} alt="Character Img" />
          </li>
        ))}
      </ul>
    </AccordionDetails>
  </Accordion>;
};

export default CharactersAccordion;
