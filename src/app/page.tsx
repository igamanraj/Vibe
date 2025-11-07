"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";

const Page = () => {

  const [value, setValue] = useState("");

  const trpc  = useTRPC();
  const { data : messages} = useQuery(trpc.messages.getMany.queryOptions())
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess : () => {
      toast.success("Message created");
    }
  }))
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)}/>
      <button 
      disabled={createMessage.isPending} 
      onClick={() => createMessage.mutate({value : value})} 
      className="bg-blue-500 text-white px-4 py-2 rounded">Invoke Background Job</button>
      {JSON.stringify(messages,null,2)}
    </div>
  );
};
export default Page;
