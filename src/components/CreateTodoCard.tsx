"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodos } from "@/context/TodosProvider";

const schema = yup
  .object({
    name: yup
      .string()
      .max(
        100,
        "The name of your todo is too long. Max number of characters is 100."
      )
      .required("Required field. Please add name of your task"),
    description: yup
      .string()
      .max(
        300,
        "The description of your todo is too long. Max number of characters is 300."
      )
      .required("Required field. Please add description of your task"),
    estimatedTime: yup
      .date()
      .min(new Date(), "Must be future date")
      .required("Required field. Please add date todo must be done"),
    comment: yup
      .string()
      .max(
        400,
        "The name of your todo is too long. Max number of characters is 400."
      ),
  })
  .required();

const CreateTodoCard: any = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useTodos();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      estimatedTime: new Date(),
      comment: "",
    },
    resolver: yupResolver(schema),
  });

  function handleAdd(data: any) {
    data.id = uuidv4();
    data.createdTime = new Date();
    data.completed = false;
    dispatch({ type: "ADD_TODO", payload: data });
    toast.success("Todo is successfully created");
    form.reset();
  }

  return (
    <>
      <Toaster richColors />
      <div className="col-span-2">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleAdd)}>
            <Card className="grid md:grid-cols-6 gap-2 text-muted-foreground justify-center p-6">
              <CardHeader className="md:col-span-6">
                <CardTitle className="text-center capitalize">
                  Create a todo
                </CardTitle>
              </CardHeader>
              <>{children}</>
              <div className="md:col-span-2 md:col-start-5 flex md:justify-end">
                <Button
                  variant="default"
                  type="submit"
                  className="w-full md:w-fit"
                >
                  Add
                </Button>
              </div>
            </Card>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default CreateTodoCard;
