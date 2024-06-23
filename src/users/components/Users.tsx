

import { Stack, TextField, FormControlLabel, Checkbox, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { Schema } from "../types/schema";

export function Users() {
  const { register, control, watch, formState: { errors } } = useFormContext<Schema>();

  const position = watch("position");

  return (
    <Stack spacing={3}>
      <TextField
        {...register("fullName")}
        label="Full Name"
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        fullWidth
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField
        {...register("phoneNumber")}
        label="Phone Number"
        type="tel"
        inputProps={{ maxLength: 10 }}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="position-label">Applying for Position</InputLabel>
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="position-label"
              label="Applying for Position"
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      {(position === "Developer" || position === "Designer") && (
        <TextField
          {...register("relevantExperience", { valueAsNumber: true })}
          label="Relevant Experience (years)"
          type="number"
          inputProps={{ min: 1, max: 20 }}
          error={!!errors.relevantExperience}
          helperText={errors.relevantExperience?.message}
          fullWidth
        />
      )}
      {position === "Designer" && (
        <TextField
          {...register("portfolioUrl")}
          label="Portfolio URL"
          error={!!errors.portfolioUrl}
          helperText={errors.portfolioUrl?.message}
          fullWidth
        />
      )}
      {position === "Manager" && (
        <TextField
          {...register("managementExperience", { valueAsNumber: false })}
          label="Management Experience (years)"
          type="number"
          inputProps={{ min: 0 }}
          error={!!errors.managementExperience}
          helperText={errors.managementExperience?.message}
          fullWidth
        />
      )}
      <FormControl fullWidth>
        <TextField
          {...register("preferredInterviewDate")}
          label="Preferred Interview Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          error={!!errors.preferredInterviewDate}
          helperText={errors.preferredInterviewDate?.message}
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          {...register("preferredInterviewTime")}
          label="Preferred Interview Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          error={!!errors.preferredInterviewTime}
          helperText={errors.preferredInterviewTime?.message}
          fullWidth
        />
      </FormControl>
      <FormControl component="fieldset">
        <Typography component="legend">Additional Skills</Typography>
        <FormControlLabel
          control={<Checkbox {...register("additionalSkills")} value="JavaScript" />}
          label="JavaScript"
        />
        <FormControlLabel
          control={<Checkbox {...register("additionalSkills")} value="CSS" />}
          label="CSS"
        />
        <FormControlLabel
          control={<Checkbox {...register("additionalSkills")} value="Python" />}
          label="Python"
        />
        {errors.additionalSkills && (
          <Typography color="error">{errors.additionalSkills.message}</Typography>
        )}
      </FormControl>
    </Stack>
  );
}
