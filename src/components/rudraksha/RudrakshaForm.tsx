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

// import BasicInfo from "./BasicInfo";
// import SEOInfo from "./SEO";
// import Media from "./Media";
// import Astrology from "./Astrology";
// import Inventory from "./Inventory";

export default function RudrakshaForm({
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
  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      seo: { ...prev.seo, [e.target.name]: e.target.value },
    }));
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
          {/* <BasicInfo formData={formData} setFormData={setFormData} /> */}
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

        <AccordionDetails>
          {/* <Astrology formData={formData} setFormData={setFormData} /> */}
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
          {/* <Inventory formData={formData} setFormData={setFormData} /> */}
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
          <div className="w-full">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Meta Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={handleChange}
                  placeholder="metaTitle"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Meta Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={handleChange}
                  placeholder="metaDescription"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Button
        sx={{ mt: 3 }}
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Rudraksha"}
      </Button>
    </form>
  );
}
