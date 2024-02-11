
import axios from 'axios';
import { NextResponse } from 'next/server';

const apiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPEN_AI 

async function getChatResponse(conversation, question) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
        temperature: 0.0,
        messages: conversation.concat({ role: 'user', content: question }),
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      return 'No response received from the model.';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Internal Server Error';
  }
}

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const conversation = [
    { 'role': 'system', 'content': ' I want you to extract the destination from here these inputs' },
    { 'role': 'user', 'content': 'I want to fly from Houston to Paris one way? todays date is 02 10 2024' },
    { 'role': 'assistant', 'content': 'France,Paris' },
    { 'role': 'user', 'content': 'I want to go from Tampa to India with one carryone and i want it to be a return flight. I will leave on march 12 and return after 2 weeks.' },
    { 'role': 'assistant', 'content': 'India, New Delhi' },
    { 'role': 'user', 'content': 'I want to go somewhere tropical?' },
    { 'role': 'assistant', 'content': 'N/A' },
    { 'role': 'user', 'content': '' },
    { 'role': 'assistant', 'content': 'N/A' },
    { 'role': 'user', 'content': 'I wanna go to France' },
    { 'role': 'assistant', 'content': 'N/A' },
    { 'role': 'user', 'content': 'I fly from to japan' },
    { 'role': 'assistant', 'content': 'N/A' },
    { 'role': 'user', 'content': 'japan to korea with 1 extra adult and 1 toddler' },
    { 'role': 'assistant', 'content': 'Korea,Soul' },
    { 'role': 'user', 'content': 'Find me the lowest price flight option between Atlanta and New York between the dates of November 11th and 19th' },
    { 'role': 'assistant', 'content': 'New york, New york city' },
  ];

  const {myPrompt} = await req.json(); //['i wanna go france from italy'];
//   const question = questions[0];

  const chatResponse = await getChatResponse(conversation, myPrompt);

  return NextResponse.json({
    success: true,
    data: chatResponse,
  });
}
