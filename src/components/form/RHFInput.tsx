"use client"
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
import { cn } from "@/lib/utils";
import { PatternFormat, NumericFormat } from "react-number-format";

export default function RHFInput({
  title,
  name,
  description,
  inputClassName,
  placeholder,
  className,
  type = "text",
  required = false,
  endAdorment,
  pattern,
  thousandSeparator = " ",
  allowLeadingZeros,
  suffix,
  prefix,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {endAdorment && (
            <div className="absolute right-0 pr-3 h-full flex justify-center items-center">
              <span className="text-muted-foreground text-sm">
                {endAdorment}
              </span>
            </div>
          )}
          <FormLabel>
            {title}
            {required && <span className="text-destructive">&nbsp;*</span>}
          </FormLabel>
          <FormControl>
            {type === "number" ? (
              <NumericFormat
                suffix={suffix}
                prefix={prefix}
                thousandSeparator={thousandSeparator}
                allowLeadingZeros={allowLeadingZeros}
                className={cn(
                  "flex h-10  w-full rounded-md border border-input bg-transparent px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50",
                  inputClassName,
                  endAdorment && "pr-10"
                )}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
              />
            ) : pattern ? (
              <PatternFormat
                format={pattern}
                className={cn(
                  "flex h-10  w-full rounded-md border border-input bg-transparent px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50",
                  inputClassName,
                  endAdorment && "pr-10"
                )}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                {...other}
                className={cn(inputClassName, endAdorment && "pr-10")}
              />
            )}
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
