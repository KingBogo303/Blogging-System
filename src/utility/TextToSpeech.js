import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [speaking, setSpeaking] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    setSpeaking(true);

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    setSpeaking(false);

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    setSpeaking(false);

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginBlock: "3px",
      }}
    >
      <button
        disabled={speaking}
        className="btn btn-secondary rounded-circle"
        title={isPaused ? "Resume" : "Play"}
        onClick={handlePlay}
      >
        {" "}
        <i className="bi bi-play-fill" />
      </button>
      <button
        title="pause"
        className="btn btn-secondary rounded-circle"
        onClick={handlePause}
      >
        <i className="bi bi-pause-fill"></i>
      </button>
      <button
        title="stop"
        disabled={!speaking}
        className="btn btn-secondary rounded-circle"
        onClick={handleStop}
      >
        <i className="bi bi-stop-circle"></i>
      </button>
    </div>
  );
};

export default TextToSpeech;
