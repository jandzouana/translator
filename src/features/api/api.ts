// require('dotenv').config(); // file must be called .env
// const apiKey = process.env.API_KEY;

// TODO: replace
const apiKey = "m6T7mRl9ufRRQQNbkvDW0cRbv_qeip9Of0TvDDw_IEk";
const apiUrl =  'https://chimeragpt.adventblocks.cc/api/v1';
const endpointCompletions = "/chat/completions";
// ['gpt-4', 'gpt-4-0314', 'gpt-4-poe', 'gpt-4-32k', 'gpt-4-32k-poe', 'gpt-3.5-turbo', 'gpt-3.5-turbo-0301',
// 'gpt-3.5-turbo-poe', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k-poe', 'llama-2-13b-chat', 'sage', 'claude-instant',
// 'claude-2-100k', 'claude-instant-100k', 'chat-bison-001']
// babbage, ada, text-davinci-003
const model = "gpt-3.5-turbo-16k";

interface Msg {
    role: string,
    content: string
}

const messages : Array<Msg> = [];

console.log("API Key: " + apiKey);

// const getCompletion = (msg : string, keepContext : boolean = true) : string =>{

export default async function getCompletion(msg : string, keepContext : boolean = true){
    if(!keepContext) messages.length = 0;
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
        const data : any = await response.json();
        console.log(data);
        //
        // .then(response => response.json()).then(data => {
        //console.log(data);
        console.log(`[api] ${data.choices[0].message.content}`);
        return data.choices[0].message.content;
    }
    catch (e: any) {
        console.log(`The following error occurred ${e}`);
        throw new Error(e);
    }
}
