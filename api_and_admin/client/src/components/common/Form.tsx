// components/common/Form.tsx

import React, { useState } from 'react';
import {
  Box, Button, FormControl, TextField, FormHelperText, Typography,
  TextareaAutosize, Stack, Select, MenuItem, Grid, Chip, IconButton
} from '@pankod/refine-mui';
import { AddCircleOutline, Cancel } from '@mui/icons-material';

import { FormProps } from 'interfaces/common'; // Make sure this path is correct
import CustomBtn from './CustomBtn';

const Form = ({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
  setValue, // Destructure from props
  watch,    // Destructure from props
}: FormProps) => {
  // --- State for Dynamic Fields ---

  // State for the multiple photo upload preview
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  // State for the dynamic features list
  const [currentFeature, setCurrentFeature] = useState('');
  const featuresList = watch('features') || []; // Watch the 'features' array from the form state

  // --- Handlers for Dynamic Fields ---

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // We set the files directly into the form state for processing in onFinishHandler
    setValue('photos', files);

    // Create and set URL previews for the UI
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews(newPreviews);
  };

  const handleAddFeature = () => {
    if (currentFeature.trim() === '') return;
    const updatedFeatures = [...featuresList, currentFeature.trim()];
    setValue('features', updatedFeatures); // Update the form state
    setCurrentFeature(''); // Clear the input
  };

  const handleDeleteFeature = (featureToDelete: string) => {
    const updatedFeatures = featuresList.filter((f: string) => f !== featureToDelete);
    setValue('features', updatedFeatures); // Update the form state
  };

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        {type} a Property
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
        <form
          style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <Grid container spacing={3}>
            {/* === Basic Info === */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>
                  Property Title
                </FormHelperText>
                <TextField fullWidth required id="title" color="info" variant="outlined" {...register("title", { required: true })} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>
                  Property Description
                </FormHelperText>
                <TextareaAutosize minRows={5} required placeholder="Enter Property Description" color="info" style={{ width: '100%', background: 'transparent', fontSize: '16px', borderColor: 'rgba(0, 0, 0, 0.23)', borderRadius: 6, padding: 10, color: '#919191' }} {...register('description', { required: true })} />
              </FormControl>
            </Grid>

            {/* === Listing & Type Details === */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Listing Type</FormHelperText>
                <Select variant='outlined' color='info' displayEmpty required defaultValue="For Sale" {...register('listingType', { required: true })}>
                  <MenuItem value="For Sale">For Sale</MenuItem>
                  <MenuItem value="For Rent">For Rent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Property Type</FormHelperText>
                <Select variant='outlined' color='info' displayEmpty required defaultValue="House" {...register('propertyType', { required: true })}>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Apartment">Apartment</MenuItem>
                    <MenuItem value="Land">Land</MenuItem>
                    <MenuItem value="Commercial">Commercial Property</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Property Subtype (e.g., Detached Duplex)</FormHelperText>
                    <TextField fullWidth id="propertySubtype" color="info" variant="outlined" {...register("propertySubtype")} />
                </FormControl>
            </Grid>

            {/* === Price === */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Property Price (NGN)</FormHelperText>
                <TextField fullWidth required type="number" id="price.amount" color="info" variant="outlined" {...register('price.amount', { required: true, valueAsNumber: true })} />
              </FormControl>
            </Grid>

            {/* === Location === */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Street Address</FormHelperText>
                <TextField fullWidth required id="location.street" color="info" variant="outlined" {...register('location.street', { required: true })} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>City</FormHelperText>
                <TextField fullWidth required id="location.city" defaultValue="Lekki" color="info" variant="outlined" {...register('location.city', { required: true })} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>State</FormHelperText>
                <TextField fullWidth required id="location.state" defaultValue="Lagos" color="info" variant="outlined" {...register('location.state', { required: true })} />
              </FormControl>
            </Grid>

            {/* === Property Details (Beds, Baths, etc.) === */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <FormHelperText>Bedrooms</FormHelperText>
                <TextField type="number" defaultValue={0} id="details.bedrooms" color="info" variant="outlined" {...register('details.bedrooms', { valueAsNumber: true })} />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <FormHelperText>Bathrooms</FormHelperText>
                <TextField type="number" defaultValue={0} id="details.bathrooms" color="info" variant="outlined" {...register('details.bathrooms', { valueAsNumber: true })} />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <FormHelperText>Toilets</FormHelperText>
                <TextField type="number" defaultValue={0} id="details.toilets" color="info" variant="outlined" {...register('details.toilets', { valueAsNumber: true })} />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <FormHelperText>Parking</FormHelperText>
                <TextField type="number" defaultValue={0} id="details.parkingSpaces" color="info" variant="outlined" {...register('details.parkingSpaces', { valueAsNumber: true })} />
              </FormControl>
            </Grid>

            {/* === Area === */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormHelperText>Total Area (sqm)</FormHelperText>
                <TextField type="number" id="area.total" color="info" variant="outlined" {...register('area.total', { valueAsNumber: true })} />
              </FormControl>
            </Grid>

            {/* === Dynamic Features === */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Features (e.g., Swimming Pool, 24/7 Power)</FormHelperText>
                <Stack direction="row" alignItems="center" gap={2}>
                  <TextField
                    fullWidth
                    placeholder="Add a feature"
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                    variant="outlined"
                    color="info"
                  />
                  <IconButton onClick={handleAddFeature} color="primary">
                    <AddCircleOutline />
                  </IconButton>
                </Stack>
                <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                  {featuresList.map((feature: string) => (
                    <Chip
                      key={feature}
                      label={feature}
                      onDelete={() => handleDeleteFeature(feature)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </FormControl>
            </Grid>

            {/* === Media (Photos & Video) === */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Video URL (Optional)</FormHelperText>
                <TextField fullWidth id="videoUrl" placeholder="https://youtube.com/watch?v=..." color="info" variant="outlined" {...register("videoUrl")} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="column" justifyContent="center" gap={1} mb={2}>
                <FormHelperText sx={{ fontWeight: 500, fontSize: 16, margin: '10px 0', color: '#11142D' }}>Property Photos</FormHelperText>
                <Button component="label" sx={{ width: 'fit-content', color: '#2ED480', textTransform: 'capitalize', fontSize: 16 }}>
                  Upload Photos *
                  <input hidden accept="image/*" type="file" multiple onChange={handleImageChange} />
                </Button>
                <Typography fontSize={14} color="#808191" sx={{ wordBreak: 'break-word' }}>
                  {photoPreviews.length > 0 ? `${photoPreviews.length} image(s) selected` : 'No images selected'}
                </Typography>
                {/* Optional: Show image previews */}
                <Stack direction="row" gap={2} mt={1} flexWrap="wrap">
                    {photoPreviews.map((src, index) => (
                        <Box key={index} position="relative" width="100px" height="100px">
                             <img src={src} alt={`preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        </Box>
                    ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <CustomBtn
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#2ED480"
            color="#FCFCFC"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;