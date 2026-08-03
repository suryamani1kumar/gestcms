"use client";

import { Paper, Typography, Grid, TextField, MenuItem } from "@mui/material";

interface BasicInfoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function BasicInfo({ formData, setFormData }: BasicInfoProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={3}>
      {/* SKU */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          required
          label="SKU"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          placeholder="GST-RUBY-001"
        />
      </Grid>

      {/* Name */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          required
          label="Gemstone Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ruby"
        />
      </Grid>

      {/* Indian Name */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Indian Name"
          name="indianName"
          value={formData.indianName}
          onChange={handleChange}
          placeholder="Manik"
        />
      </Grid>

      {/* Slug */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          required
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="natural-ruby"
        />
      </Grid>

      {/* Category */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <MenuItem value="">Select Category</MenuItem>
          <MenuItem value="Precious">Precious</MenuItem>
          <MenuItem value="Semi Precious">Semi Precious</MenuItem>
          <MenuItem value="Organic">Organic</MenuItem>
          <MenuItem value="Synthetic">Synthetic</MenuItem>
        </TextField>
      </Grid>

      {/* Sub Category */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Sub Category"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          placeholder="Corundum"
        />
      </Grid>

      {/* Status */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
          <MenuItem value="Archived">Archived</MenuItem>
        </TextField>
      </Grid>

      {/* Description */}
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}
