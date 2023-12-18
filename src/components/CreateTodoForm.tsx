import React from "react";
import RHFInput from "@/components/form/RHFInput";
import RHFTextarea from "@/components/form/RHFTextarea";
import RHFDateTimePicker from "@/components/form/RHFDateTimePicker";

const CreateTodoForm = () => {
  return (
    <>
      <div className="md:col-span-2">
        <RHFInput name="name" placeholder="E.g. Buy groceries" title="Name" />
      </div>
      <div className="md:col-span-2">
        <RHFInput
          name="description"
          placeholder="E.g. Need to buy milk and eggs at Lidl"
          title="Description"
        />
      </div>
      <div className="md:col-span-2">
        <RHFDateTimePicker
          name="estimatedTime"
          title="Deadline"
          isDateTime={true}
        />
      </div>
      <div className="md:col-span-6">
        <RHFTextarea
          name="comment"
          placeholder="E.g. Might pick cheese as well"
          title="Comment"
        />
      </div>
    </>
  );
};

export default CreateTodoForm;
