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

