import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuidv4 } from 'uuid';

const CharactersAccordion = ({characters}) => {

  const formatNames = (name) => {
    let arr = name.split(",");
    return arr[1] !== undefined ? `${arr[1]} ${arr[0]}` : arr[0];
  }


  return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      Characters
    </AccordionSummary>
    <AccordionDetails>
      <ul className="characters-list">
        {characters.map((character) => (
          <li key={uuidv4()} className="characters-list-item">
            <h3 className="character-name">{formatNames(character.character.name)}</h3>
            <img src={character.character.images.jpg.image_url} alt="Character Img" />
          </li>
        ))}
      </ul>
    </AccordionDetails>
  </Accordion>;
};

export default CharactersAccordion;
