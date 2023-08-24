const apiKey = process.env.API_KEY;
import { createTag } from '../../../shared/utils/util';
const apiUrl =  'https://chimeragpt.adventblocks.cc/api/v1';
const endpointCompletions = "/chat/completions";
// ['gpt-4', 'gpt-4-0314', 'gpt-4-poe', 'gpt-4-32k', 'gpt-4-32k-poe', 'gpt-3.5-turbo', 'gpt-3.5-turbo-0301',
// 'gpt-3.5-turbo-poe', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k-poe', 'llama-2-13b-chat', 'sage', 'claude-instant',
// 'claude-2-100k', 'claude-instant-100k', 'chat-bison-001']
// babbage, ada, text-davinci-003
const model = "gpt-3.5-turbo-16k";
const tag = createTag("api");
interface Msg {
    role: string,
    content: string
}

const messages : Array<Msg> = [];

// console.log(tag + "API Key: " + apiKey);

// const getCompletion = (msg : string, keepContext : boolean = true) : string =>{

export default async function getCompletion(msg : string, keepContext : boolean = true, initialMessage = null){
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
