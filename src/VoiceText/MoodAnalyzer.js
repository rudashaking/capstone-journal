import React, { useState } from 'react';
import axios from 'axios';


const MoodAnalyzer = ({ transcript }) => {
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState('');

  const preprocessTranscript = async (transcript) => {
    try {
      
      const response = await axios.post('https://api.grammarbot.io/v2/check', {
        api_key: '',
        text: transcript,
      });

      
      if (response.data.matches.length > 0) {
      
        const correctedTranscript = response.data.matches.reduce((acc, match) => {
          return acc.replace(match.context.text, match.replacements[0].value);
        }, transcript);
        return correctedTranscript;
      } else {
        return transcript; 
      }
    } catch (error) {
      console.error('Error correcting grammar:', error);
      return transcript; 
    }
  };


  const sendMessageToOpenAI = async (message) => {
    const apiKey = 'sk-proj-6LRNG9yERW2EW2R7IQbST3BlbkFJvZ2lyAufPofKCcB0a9LH'; 
    const endpoint = 'https://api.openai.com/v1/engines/davinci/completions'; 

    try {
      const response = await axios.post(endpoint, {
        prompt: message,
        max_tokens: 150,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      return response.data.choices[0].text.trim(); // Return generated text
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      throw error; // You can handle the error accordingly in your application
    }
  };

  const analyzeMood = async () => {
    try {
      // Preprocess transcript to correct grammar errors
      const preprocessedTranscript = preprocessTranscript(transcript);

      // Send preprocessed transcript to OpenAI for mood analysis
      const openaiResponse = await sendMessageToOpenAI(preprocessedTranscript);
      const mood = openaiResponse.data.mood; // Extract mood from OpenAI response

      setMood(mood);

      if (mood) {
        // Handle mood accordingly
      } else {
        setResponse('Please provide more information.');
      }
    } catch (error) {
      console.error('Error analyzing mood:', error);
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
