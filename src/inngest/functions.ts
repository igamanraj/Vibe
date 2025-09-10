import {  gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event}) => {
    
     // Create a new agent with a system prompt (you can add optional tools, too)
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert next.js developer. you write readable, maintainable code. You are write simple next.js & react snippets.",
      model: gemini({ model: "gemini-1.5-flash", }),
    });

    const { output } = await summarizer.run(
  `Write the following snippet: ${event.data.value}`
);


    return { output };
  },
);