"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BasicInfo from "./BasicInfo";
// import Media from "./Media";
// import PhysicalProperties from "./PhysicalProperties";
// import Quality from "./Quality";
// import Astrology from "./Astrology";
// import Pricing from "./Pricing";
// import Inventory from "./Inventory";
// import Shipping from "./Shipping";
// import SEO from "./SEO";
// import Display from "./Display";
// import Attributes from "./Attributes";

export default function GemstoneForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [expanded, setExpanded] = useState<string>("basic");

  const handleAccordion =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* Basic Info */}
      <Accordion
        expanded={expanded === "basic"}
        onChange={handleAccordion("basic")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Basic Information</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <BasicInfo formData={formData} setFormData={setFormData} />
        </AccordionDetails>
      </Accordion>

      {/* Media */}
      <Accordion
        expanded={expanded === "media"}
        onChange={handleAccordion("media")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Media</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {/* <Media formData={formData} setFormData={setFormData} /> */}
        </AccordionDetails>
      </Accordion>

      {/* Physical Properties */}
      <Accordion
        expanded={expanded === "physical"}
        onChange={handleAccordion("physical")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Physical Properties</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <PhysicalProperties /> */}</AccordionDetails>
      </Accordion>

      {/* Quality */}
      <Accordion
        expanded={expanded === "quality"}
        onChange={handleAccordion("quality")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Quality</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <Quality /> */}</AccordionDetails>
      </Accordion>

      {/* Astrology */}
      <Accordion
        expanded={expanded === "astrology"}
        onChange={handleAccordion("astrology")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Astrology</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <Astrology /> */}</AccordionDetails>
      </Accordion>

      {/* Pricing */}
      <Accordion
        expanded={expanded === "pricing"}
        onChange={handleAccordion("pricing")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Pricing</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <Pricing /> */}</AccordionDetails>
      </Accordion>

      {/* Inventory */}
      <Accordion
        expanded={expanded === "inventory"}
        onChange={handleAccordion("inventory")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Inventory</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <Inventory /> */}</AccordionDetails>
      </Accordion>

      {/* Shipping */}
      <Accordion
        expanded={expanded === "shipping"}
        onChange={handleAccordion("shipping")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Shipping</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <Shipping /> */}</AccordionDetails>
      </Accordion>

      {/* SEO */}
      <Accordion
        expanded={expanded === "seo"}
        onChange={handleAccordion("seo")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>SEO</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <SEO /> */}</AccordionDetails>
      </Accordion>

      {/* Display */}
      <Accordion
        expanded={expanded === "display"}
        onChange={handleAccordion("display")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Display Settings</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <Display /> */}</AccordionDetails>
      </Accordion>

      {/* Attributes */}
      <Accordion
        expanded={expanded === "attributes"}
        onChange={handleAccordion("attributes")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Custom Attributes</Typography>
        </AccordionSummary>

        <AccordionDetails>{/* <Attributes /> */}</AccordionDetails>
      </Accordion>

      <Button sx={{ mt: 3 }} type="submit" variant="contained" size="large">
        Save Gemstone
      </Button>
    </form>
  );
}
