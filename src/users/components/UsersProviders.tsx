

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";

import { Schema, defaultValues, schema } from "../types/schema";
import { Users } from "./Users";

export function UsersProviders() {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const [formData, setFormData] = useState<Schema | null>(null);

  const onSubmit = (data: Schema) => {
    setFormData(data);
  };

  const handleEdit = () => {
    setFormData(null); // Clear formData to show the form again
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5,
        }}
      >
        {formData ? (
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 500 }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {formData.fullName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Applying for Position:</strong> {formData.position}
            </Typography>
            {(formData.position === "Developer" || formData.position === "Designer") && (
              <Typography variant="body1">
                <strong>Relevant Experience:</strong> {formData.relevantExperience} years
              </Typography>
            )}
            {formData.position === "Designer" && (
              <Typography variant="body1">
                <strong>Portfolio URL:</strong> {formData.portfolioUrl}
              </Typography>
            )}
            {formData.position === "Manager" && (
              <Typography variant="body1">
                <strong>Management Experience:</strong> {formData.managementExperience} years
              </Typography>
            )}
            <Typography variant="body1">
              <strong>Preferred Interview Date:</strong> {formData.preferredInterviewDate}
            </Typography>
            <Typography variant="body1">
              <strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}
            </Typography>
            <Typography variant="body1">
              <strong>Additional Skills:</strong> {formData.additionalSkills.join(", ")}
            </Typography>
            <Button onClick={handleEdit} variant="contained" color="primary" fullWidth>
              Edit Form
            </Button>
          </Paper>
        ) : (
          <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 500 }}>
            <Users />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </FormProvider>
  );
}
