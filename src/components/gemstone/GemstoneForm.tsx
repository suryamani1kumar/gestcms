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
import SEOInfo from "./SEO";
import Media from "./Media";
import Astrology from "./Astrology";
import Inventory from "./Inventory";

export default function GemstoneForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: () => void;
  loading: boolean;
}) {
  const [expanded, setExpanded] = useState<string>("basic");

  const handleAccordion =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
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
          <Media formData={formData} setFormData={setFormData} />
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

        <AccordionDetails>
          <Astrology formData={formData} setFormData={setFormData} />
        </AccordionDetails>
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

        <AccordionDetails>
          <Inventory formData={formData} setFormData={setFormData} />
        </AccordionDetails>
      </Accordion>

      {/* SEO */}
      <Accordion
        expanded={expanded === "seo"}
        onChange={handleAccordion("seo")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>SEO</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <SEOInfo formData={formData} setFormData={setFormData} />
        </AccordionDetails>
      </Accordion>

      <Button
        sx={{ mt: 3 }}
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Gemstone"}
      </Button>
    </form>
  );
}
