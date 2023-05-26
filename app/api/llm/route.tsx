import { createLLMService } from "usellm";

export const runtime = "edge";

const llmService = createLLMService({
  openaiApiKey: process.env.OPENAI_API_KEY,
  actions: ["chat"],
});

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { result } = await llmService.handle({ body, request });
    return new Response(result, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: error?.status || 400 });
  }
}
