import React, { useState } from 'react';
import axios from 'axios';

const MoodAnalyzer = ({ transcript }) => {
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState('');

  const preprocessTranscript = async (transcript) => {
    const options = {
      method: 'POST',
      url: 'https://grammarbot-neural.p.rapidapi.com/v1/check',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '974c74552bmshc0b651174750c95p12a467jsn412a312698fa', 
        'X-RapidAPI-Host': 'grammarbot-neural.p.rapidapi.com'
      },
      data: {
        text: transcript,
        lang: 'en' 
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
  
      return response.data;
    } catch (error) {
      console.error('Error correcting grammar:', error);
      return transcript;
    }
  };

  const sendMessageToOpenAI = async (message) => {
    const apiKey = 'sk-proj-6LRNG9yERW2EW2R7IQbST3BlbkFJvZ2lyAufPofKCcB0a9LH'; 
    const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';

   
    const prompt = `${message}\n\nMood:`;

    try {
      const response = await axios.post(endpoint, {
        prompt: prompt,
        max_tokens: 1, 
        temperature: 0, 
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      throw error;
    }
  
  };

  const analyzeMood = async () => {
    try {
      const preprocessedTranscript = await preprocessTranscript(transcript);
      setResponse('Transcript processed successfully.');
    } catch (error) {
      console.error('Error analyzing mood:', error);
      setResponse('Error processing transcript. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={analyzeMood}>Analyze Mood</button>
      <p>Mood: {mood}</p>
      <p>Response: {response}</p>
    </div>
  );
};

export default MoodAnalyzer;
