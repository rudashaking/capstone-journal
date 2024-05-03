import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';

const VoiceIn = ({ onResult }) => {
  const [transcription, setTranscription] = useState('');
  const [listening, setListening] = useState(false);
  const recognition = useRef(null);
  const silenceTimeout = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = false;
    recognition.current.lang = 'en-US';

    recognition.current.onstart = () => {
      setListening(true);
      clearTimeout(silenceTimeout.current);
      silenceTimeout.current = setTimeout(() => {
        stopListening();
      }, 4000);
    };

    recognition.current.onresult = (event) => {
      clearTimeout(silenceTimeout.current);
      silenceTimeout.current = setTimeout(() => {
        stopListening();
      }, 4000);
    
      let newFinalTranscript = '';
    
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          newFinalTranscript += transcript + ' '; // Concatenate the new transcription
        }
      }
    
      setTranscription(prevTranscription => prevTranscription + newFinalTranscript); // Append the new transcription
      onResult(prevTranscription => prevTranscription + newFinalTranscript); // Pass the transcription to the parent component
    };
    
    recognition.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      stopListening();
    };

    recognition.current.onend = () => {
      setListening(false);
    };

    recognition.current.start();
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    clearTimeout(silenceTimeout.current);
  };

  return (
    <div className="controls">
      <Button onClick={listening ? stopListening : startListening} variant="contained" color="primary">
        {listening ? 'Stop Listening' : 'Start Listening'}
      </Button>
    </div>
  );
};

export default VoiceIn;
