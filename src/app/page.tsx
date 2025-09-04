"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc  = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess : () => {
      toast.success("Background Job Invoked");
    }
  }))
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <button disabled={invoke.isPending} onClick={() => invoke.mutate({text : "Test"})} className="bg-blue-500 text-white px-4 py-2 rounded">Invoke Background Job</button>
    </div>
  );
};
export default Page;
