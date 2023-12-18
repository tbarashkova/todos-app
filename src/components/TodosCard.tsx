"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodos } from "@/context/TodosProvider";
import TodoCard from "@/components/TodoCard";
import Loading from "@/app/loading";

const TodosCard: any = () => {
  const { todos } = useTodos();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // To simulate data fetching delay
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const activeTodos = todos.filter((todo) => todo.completed === false);
  const completedTodos = todos.filter((todo) => todo.completed === true);

  // console.log("todos", todos);
  // return;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="col-span-2 flex flex-col md:flex-row gap-5">
      {/* Todos column */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-center capitalize">Todo</CardTitle>
        </CardHeader>
        {activeTodos.length > 0 ? (
          <CardContent className="text-muted-foreground flex flex-col gap-4">
            {activeTodos?.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </CardContent>
        ) : null}
      </Card>

      {/* Completed todos column */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-center capitalize">Done</CardTitle>
        </CardHeader>
        {completedTodos.length > 0 ? (
          <CardContent className="text-muted-foreground flex flex-col gap-4">
            {completedTodos?.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
};

export default TodosCard;
