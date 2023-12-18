import TodosCard from "@/components/TodosCard";
import CreateTodoForm from "@/components/CreateTodoForm";
import CreateTodoCard from "@/components/CreateTodoCard";

export default function Home() {
  return (
    <main className="min-h-screen p-12 md:p-24">
      <div className="grid grid-cols-2 gap-5 items-center">
        <CreateTodoCard>
          <CreateTodoForm />
        </CreateTodoCard>
        <TodosCard />
      </div>
    </main>
  );
}
