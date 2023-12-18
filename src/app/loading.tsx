import React from "react";
import { RefreshIcon } from "@heroicons/react/solid";

export default function Loading() {
  return (
    <div className="col-span-2 flex items-center justify-center h-32">
      <RefreshIcon className="animate-spin h-8 w-8 text-gray-500" />
    </div>
  );
}
