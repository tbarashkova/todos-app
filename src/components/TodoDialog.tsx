"use client";
import { useEffect, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { Toaster, toast } from "sonner";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RHFTextarea from "@/components/form/RHFTextarea";
import RHFInput from "@/components/form/RHFInput";
import RHFDateTimePicker from "@/components/form/RHFDateTimePicker";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodos } from "@/context/TodosProvider";
import { Todo } from "@/context/TodosProvider";

interface EditTodo extends Todo {
  createdTime: Date;
}

interface TodoFormValues {
  id?: string;
  name: string;
  description: string;
  estimatedTime: Date;
  comment: string;
  updatedTime?: Date;
}

interface TodoDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  todo: EditTodo;
}

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
      .required("Required field. Please add date task must be done"),
    comment: yup
      .string()
      .max(
        400,
        "The name of your todo is too long. Max number of characters is 400."
      )
      .required("Required field. Please add comment of your task"),
  })
  .required();

export default function TodoDialog({ open, setOpen, todo }: TodoDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = useTodos();
  const { id } = todo;

  const form = useForm({
    defaultValues: {
      name: todo?.name || "",
      description: todo?.description || "",
      estimatedTime: new Date(todo?.estimatedTime) || "",
      comment: todo?.comment || "",
    },
    resolver: yupResolver(schema),
  });

  //to reset form so updated defaultValues are shown when user edits todo again
  useEffect(() => {
    form.reset({
      name: todo?.name || "",
      description: todo?.description || "",
      estimatedTime: new Date(todo?.estimatedTime || ""),
      comment: todo?.comment || "",
    });
  }, [todo]);

  const handleUpdate: SubmitHandler<TodoFormValues> = (data: any) => {
    data.id = id;
    data.updatedTime = new Date();
    dispatch({ type: "UPDATE_TODO", payload: data });
    toast.success("Todo is successfully updated");
    setIsEditing(false);
  };

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <>
      <Toaster richColors />
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[525px]">
          {isEditing ? (
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleUpdate)}>
                <RHFInput
                  name="name"
                  placeholder="E.g. Buy groceries"
                  title="Name"
                />
                <RHFInput
                  name="description"
                  placeholder="E.g. Need to buy milk and eggs at Lidl"
                  title="Description"
                />
                <RHFDateTimePicker
                  name="estimatedTime"
                  title="Deadline"
                  isDateTime={true}
                />
                <RHFTextarea
                  name="comment"
                  placeholder="E.g. Might pick cheese as well"
                  title="Comment"
                />
                <div className="flex items-center gap-2 justify-end">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </FormProvider>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {todo.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center">
                <h2 className="font-semibold">{todo.description}</h2>
                <p className="text-sm">{todo.comment}</p>
                <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                  <div>
                    Created:
                    <span className="ms-2">
                      {/* eslint-disable-next-line */}
                      {format(new Date(todo.createdTime), "dd.MM.yyyy HH:mm")}
                    </span>
                  </div>
                  <div>
                    Deadline:
                    <span className="ms-2">
                      {format(new Date(todo.estimatedTime), "dd.MM.yyyy HH:mm")}
                    </span>
                  </div>
                  {todo?.updatedTime ? (
                    <div>
                      Updated:
                      <span className="ms-2">
                        {format(
                          new Date(todo?.updatedTime),
                          "dd.MM.yyyy HH:mm"
                        )}
                      </span>
                    </div>
                  ) : null}
                  {todo?.successTime ? (
                    <div>
                      Completed:
                      <span className="ms-2">
                        {format(
                          new Date(todo?.successTime),
                          "dd.MM.yyyy HH:mm"
                        )}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center w-full gap-2 justify-end">
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
