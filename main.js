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
    api.createCompletion(
        {
            model: 'text-davinci-003',
            max_tokens: 100,
            temperature: 0,
            prompt: input,
        }
    ).then((response)=>{
        const text = response.data.choices[0].text;
        console.log(text);
    }).catch((error)=>{
        console.log(error);
    });
    
    rl.close();
});