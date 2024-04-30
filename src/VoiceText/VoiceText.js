import React, { useState } from "react";
import "./VoiceText.scss";
import useSpeechToText from "../hooks/useSpeechToText";
import CurrentDateComponent from "../components/CurrentDateComponent";

const VoiceText = () => {
  const [textInput, setTextInput] = useState('');
  const { islistening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true });

  const startStopListening = () => {
    islistening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
    stopListening();
  };

  return (
    <div className="page">
      <CurrentDateComponent />
      <button onClick={startStopListening}>
        {islistening ? 'Stop Listening' : 'Speak'}
      </button>
      <textarea
        className="voiceText__inputBox"
        disabled={islistening}
        value={islistening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
        onChange={(e) => { setTextInput(e.target.value); }}
      />
    </div>
  );
};

export default VoiceText;



