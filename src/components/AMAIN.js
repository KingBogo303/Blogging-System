import useSpeechRecognition from "./Dictaphone";

const Main = () => {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button onclick={startListening}>Start Listening</button>
          </div>
          <div>
            <button onclick={stopListening}>Stop Listening</button>
          </div>
          {isListening ? <div>Your browser is currently listening</div> : null}
          {text}
        </>
      ) : (
        <h1>Your browser has no speech recognition support</h1>
      )}
    </div>
  );
};
export default Main;
