
import { chatbotResponses } from './data';
import { generateLocalResponse } from './localChatbot';

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const SYSTEM_PROMPT = `
You are a professional property assistant for a real estate company in Islamabad, Pakistan.
Provide helpful, concise, and accurate information about real estate topics including:
- Property buying and selling processes
- Rental procedures and advice
- Investment opportunities in different areas
- Current property rates in various sectors (F, E, G, I sectors)
- Market trends and forecasts
- Legal requirements for property transactions
- Financing options and mortgage advice

Always be polite, professional, and provide factual information. If you don't know something specific, 
acknowledge it and provide general guidance instead.
`;

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    // In a real implementation, this should use an API key from environment variables
    // For now, we'll use the existing chatbot responses while simulating an API call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Fallback to local response generation when API fails
    return generateLocalResponse(userMessage, chatbotResponses);
  }
};
