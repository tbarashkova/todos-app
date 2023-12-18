"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTodos } from "@/context/TodosProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RHFCheckbox from "@/components/form/RHFCheckbox";
import TodoDialog from "@/components/TodoDialog";

const schema = yup
  .object({
    completed: yup.boolean(),
  })
  .required();

const TodoCard = ({ todo }) => {
  const { dispatch } = useTodos();
  const [open, setOpen] = useState(false); //to open view todo dialog

  const form = useForm({
    defaultValues: {
      completed: todo?.completed || false,
    },
    resolver: yupResolver(schema),
  });

  const handleDelete = () => {
    dispatch({ type: "DELETE_TODO", payload: { id: todo.id } });
  };

  const handleToggleComplete = (data) => {
    // Dispatch an action to toggle the 'completed' status of the TODO
    if (data?.completed === false) {
      dispatch({
        type: "TOGGLE_COMPLETE",
        payload: {
          id: todo.id,
          completed: data.completed,
        },
      });
    } else {
      dispatch({
        type: "TOGGLE_COMPLETE",
        payload: {
          id: todo.id,
          completed: data.completed,
          successTime: new Date(),
        },
      });
    }
  };

  useEffect(() => {
    // If the 'completed' field changes, submit the form
    form.handleSubmit(handleToggleComplete)();
    console.log("form has been submitted");
  }, [form.watch("completed")]); // Watch for changes in the 'completed' field

  // console.log("values", form.watch());
  // console.log("errors", form.formState.errors);

  return (
    <>
      <TodoDialog open={open} setOpen={setOpen} todo={todo} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleToggleComplete)}>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-center">{todo.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground flex flex-col lg:flex-row gap-4 lg:justify-between items-center">
              <div className="flex items-center gap-2 lg:justify-between">
                <RHFCheckbox name="completed" />
                <p>{todo.description}</p>
              </div>
              <div className="flex flex-col w-full lg:w-fit lg:flex-row items-center gap-2 before:lg:justify-between">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setOpen(true)}
                >
                  View
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </>
  );
};

export default TodoCard;
