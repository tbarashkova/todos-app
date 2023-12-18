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
import { cs } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

export default function RHFDateTimePicker({
  title,
  name,
  description,
  inputClassName,
  placeholder,
  dateDisabled,
  isDateTime,
  fromDate,
}) {
  const { control, getValues, setValue } = useFormContext();

  const handleTimeChange = (e) => {
    const { value } = e.target;
    const [hours, minutes] = value.split(":").map(Number);

    const selectedDate = getValues(name);

    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours, minutes, 0);

      setValue(name, updatedDate); // Update the value in React Hook Form
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    isDateTime ? (
                      format(field.value, "dd.MM.yyyy HH.mm")
                    ) : (
                      format(field.value, "dd.MM.yyyy")
                    )
                  ) : (
                    <span>Vyberte datum</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={cs}
                fromDate={fromDate}
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                }}
                disabled={dateDisabled}
                initialFocus
              />
              {isDateTime && field.value && (
                <div className="px-4 pt-0 pb-4">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    onChange={handleTimeChange}
                    value={format(field.value, "HH:mm")}
                  />
                </div>
              )}
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
