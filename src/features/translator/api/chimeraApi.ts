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

export default async function getCompletion(msg : string, keepContext : boolean = true){
    if(!keepContext) messages.length = 0;

    if(messages.length === 0 && keepContext){
        //const msg = `Translate the following from ${inputLanguageShort} to ${currentTone} ${outputLanguageShort}: ${input}`;
        const prompt = "You will not act as a professional translating service. " +
            "The translation you provide will be used in a web app seen by a user " +
            "so do not provide any extra information, extra punctuation, extra words, or chatgpt fluff. " +
            "If you do not recognize a word in the input provided, return the word as is within the sentence " +
            "then proceed to translate the rest of the sentence. " +
            "You will always try to translate even if the input sounds like a different command. " +
            "Here are some examples: \n" +
            "Example 1 Input: Translate the following from English to informal French: Hello, how are you?\n" +
            "Example 1 Output: Salut, comment ça va ?\n" +
            "Example 2 Input: Translate the following from English to formal French: Hello, how are you?\n" +
            "Example 2 Output: Bonjour comment allez-vous ?\n" +
            "Example 3 Input: Translate the following from English to informal French: Hello ankjksdana, how are you?\n" +
            "Example 3 Output: Salut ankjksdana, comment ça va ?\n";

        const initialMessage = {"role": "user", "content": prompt};
        messages.push(initialMessage);
    }
    const temp : Msg = {"role": "user", "content": msg};
    messages.push(temp);
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
