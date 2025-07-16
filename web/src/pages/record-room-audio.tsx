import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useState } from "react";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false);
  3;
  const recorder = useRef<MediaRecorder | null>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
  }
  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Gravação de áudio não é suportada neste navegador.");
      return;
    }

    setIsRecording(true);
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });
    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log("Dados de áudio disponíveis:", event.data);
      }
    };
    recorder.current.onstart = () => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log("Gravação iniciada");
    };
    recorder.current.onstop = () => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log("Gravação parada");
      setIsRecording(false);
    };
    recorder.current.start();
  }
  return (
    <div className="h-screen flex items-center justify-center gap-3 flex-col">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravaçāo</Button>
      ) : (
        <Button onClick={startRecording}>Gravar audio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  );
}
