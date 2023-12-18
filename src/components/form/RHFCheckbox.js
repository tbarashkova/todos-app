"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField } from "../ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function RHFSwitch({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
      )}
    />
  );
}
