import {CompletionMessage} from "@/shared/constants/interfaces";


//export default async function getCompletion(msg : string, keepContext : boolean = true, initialMessage : CompletionMessage | null = null){


import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;
const model = "gpt-3.5-turbo-16k";
const openai = new OpenAI({ apiKey: apiKey });
export default async function getCompletion() {
    // const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     model: "gpt-3.5-turbo",
    // });
    //

    // console.log(completion.choices[0]);
}
