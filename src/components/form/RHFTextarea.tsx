"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface RHFTextareaProps {
  title?: string;
  name: string;
  description?: string;
  inputClassName?: string;
  placeholder?: string;
}

export default function RHFTextarea({
  title,
  name,
  description,
  inputClassName,
  placeholder,
  ...other
}: RHFTextareaProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Textarea
              className={inputClassName}
              placeholder={placeholder}
              {...field}
              {...other}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
