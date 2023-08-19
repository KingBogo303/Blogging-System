import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const [text, setText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    setText((prev) => prev + " " + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const listen = () => SpeechRecognition.startListening();
  const stop = () => SpeechRecognition.stopListening();

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={listen}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{text}</p>
    </div>
  );
};

export const { listen, text } = Dictaphone;

export default Dictaphone;
