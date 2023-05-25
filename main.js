import {config} from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
config();
import readline from 'readline';

const api = new OpenAIApi(new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_KEY
}));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = 'Enter your prompt:';

rl.question(prompt, (input) => {
    api.createChatCompletion(
        {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "user",
                    content: input
                },
                {
                    role: "system",
                    content: "speak as if you were Sana from the k-pop group TWICE."
                }
            ],
            max_tokens: 256,
            temperature: 0,
        }
    ).then((response)=> {
        const text = response.data.choices[0].message.content;
        console.log(text);
    }).catch((error)=> {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
        } else {
            console.log(error.messages);
        }
    });
    
    rl.close();
});