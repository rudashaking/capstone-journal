import { useEffect, useState, useRef} from "react"


const useSpeechToText = () => {
const [islistening, setislistening] = useState(false)
const [transcript, setTranscript] = useState("")
const recognitionRef = useRef(null)

useEffect(()=>{
    if(!('webkitSpeechRecognition' in window)){
        console.error("web speech api is not supported.")
        return;
    }
    recognitionRef.current = new window.webkitSpeechRecognition()
   
    const recognition = recognitionRef.current
    recognition.interimResults =  true
    recognition.lang = "en-Us"
    recognition.continuous = false
   

    if ("webkitSpeechGrammarList" in window){
        const grammar = "#JSGF V1.0; grammar punctutaion; public <punc> =|+ |- |: |; |, |= || |/ | |( |)| |[| ]| @|# |% |!| ^| &| ~"
        const SpeechRecognitionList = new window.webkitSpeechGrammarList()
        SpeechRecognitionList.addFromString(grammar,1)
        recognition.grammars =SpeechRecognitionList
    }
    recognition.onresult = (e)=>{
        let text = ""
        e.results.forEach(result => {
            text += result[0].transcript;
        });
            setTranscript(text)
    }
    recognition.onerror =(e)=>{
        console.error("speech recogintiton error:", e.error)
    }
recognition.onEnd =()=>{
    setislistening(false)
    setTranscript("")
}
return()=>{
    recognition.stop()
}
},[])

const startListening =() => {
    if (recognitionRef.current && !islistening){
        recognitionRef.current.start()
        setislistening(true)
    }

}
const stopListening =() => {
    if (recognitionRef.current && !islistening){
        recognitionRef.current.stop()
        setislistening(false)
    }
}

  return (
    islistening,
    transcript,
    startListening,
    stopListening
  )
}

export default useSpeechToText

// import { useEffect, useState, useRef } from "react";

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

// const useSpeechToText = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (!SpeechRecognition) {
//       console.error("Web Speech API is not supported.");
//       return;
//     }

//     recognitionRef.current = new SpeechRecognition();
//     const recognition = recognitionRef.current;
//     recognition.interimResults = true;
//     recognition.lang = "en-US"; 
//     recognition.continuous = false; 

//     if (SpeechGrammarList) {
//       const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = | + | - | : | ; | , | = | | | / | \\ | ( | ) | [ | ] | @ | # | % | ! | ^ | & | ~";
//       const speechRecognitionList = new SpeechGrammarList();
//       speechRecognitionList.addFromString(grammar, 1);
//       recognition.grammars = speechRecognitionList;
//     }

//     recognition.onresult = (e) => {
//       let text = "";
//       for (let i = 0; i < e.results.length; i++) {
//         text += e.results[i][0].transcript;
//       }
//       setTranscript(text);
//     };

//     recognition.onerror = (e) => {
//       console.error("Speech recognition error:", e.error);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       setTranscript("");
//     };

//     return () => {
//       recognition.stop();
//     };
//   }, []);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   return {
//     isListening,
//     transcript,
//     startListening,
//     stopListening,
//   };
// };

// export default useSpeechToText;
