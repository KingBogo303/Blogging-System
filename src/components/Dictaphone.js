// import React from 'react';
// import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const appId = '<INSERT_SPEECHLY_APP_ID_HERE>';
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

// const Dictaphone = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();
//   const startListening = () => SpeechRecognition.startListening({ continuous: true });

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <>
//       <div>
//         <p>Microphone: {listening ? 'on' : 'off'}</p>
//         <button
//           onTouchStart={startListening}
//           onMouseDown={startListening}
//           onTouchEnd={SpeechRecognition.stopListening}
//           onMouseUp={SpeechRecognition.stopListening}
//         >Hold to talk</button>
//         <p>{transcript}</p>
//       </div>
//       <div>
//         <p>2nd Microphone: {listening ? 'on' : 'off'}</p>
//         <button onClick={SpeechRecognition.startListening}>Start</button>
//         <button onClick={SpeechRecognition.stopListening}>Stop</button>
//         <button onClick={resetTranscript}>Reset</button>
//         <p>{transcript}</p>
//       </div>
//     </>
//   );
// };
// export default Dictaphone;


import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;