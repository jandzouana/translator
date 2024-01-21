import {CompletionMessage} from "@/shared/constants/interfaces";
const apiKey = process.env.OPENAI_API_KEY;
console.log("API: " + apiKey);
import { createTag } from '@/shared/utils/util';
const apiUrl =  'https://api.openai.com/v1';
const endpointCompletions = "/chat/completions";

const model = "gpt-3.5-turbo";// "gpt-3.5-turbo-16k";
const tag = createTag("api");
interface Msg {
    role: string,
    content: string
}

const messages : Array<Msg> = [];

// console.log(tag + "API Key: " + apiKey);

export default async function getCompletion(msg : string, keepContext : boolean = true, initialMessage : CompletionMessage | null = null){
    if(!keepContext) messages.length = 0;
    if(messages.length === 0 && initialMessage){
        messages.push(initialMessage);
    }
    const temp : Msg = {"role": "user", "content": msg};
    messages.push(temp);
    console.log(tag + "Messages: ", messages);
    try {
        const response = await fetch(`${apiUrl}${endpointCompletions}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                'model': model,
                messages: messages
            })
        });

        if (!response.ok) {
            // If the response status is not in the range of 200 to 299, it's considered an error
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data : any = await response.json();
        console.log(data);
        //
        // .then(response => response.json()).then(data => {
        //console.log(data);
        console.log(`${tag}${data.choices[0].message.content}`);
        return data.choices[0].message.content;
    }
    catch (e: any) {
        console.log(tag + `The following error occurred ${e.message}`);
        throw new Error(e.message);
    }
}
