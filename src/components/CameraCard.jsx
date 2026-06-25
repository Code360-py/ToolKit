import { useRef, useState } from "react";
import { motion } from "framer-motion";

function CameraCard() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

  const startCamera = async (mode = facingMode) => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
          },
          audio: false,
        });

      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (error) {
      console.error(error);
      alert("Unable to access camera");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const flipCamera = async () => {
    const newMode =
      facingMode === "user"
        ? "environment"
        : "user";

    setFacingMode(newMode);

    await startCamera(newMode);
  };

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageData = canvas.toDataURL(
      "image/png"
    );

    setPhoto(imageData);
  };

  const downloadPhoto = () => {
    if (!photo) return;

    const link = document.createElement("a");

    link.href = photo;
    link.download = `photo-${Date.now()}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="glass-card mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-center mb-4">
        <i className="bi bi-camera-fill me-2"></i>
        Camera Studio
      </h3>

      <div className="d-flex justify-content-center gap-2 flex-wrap mb-3">

        {/* Open Camera */}
        <button
          className="btn btn-success"
          onClick={() => startCamera()}
        >
          <i className="bi bi-camera-video-fill me-2"></i>
          Open
        </button>

        {/* Flip Camera */}
        <button
          className="btn btn-primary flip-btn"
          onClick={flipCamera}
        >
          <i className="bi bi-arrow-repeat me-2"></i>
          Flip
        </button>

        {/* Capture */}
        <button
          className="btn btn-info"
          onClick={takePicture}
        >
          <i className="bi bi-record-circle-fill me-2"></i>
          Capture
        </button>

        {/* Download */}
        <button
          className="btn btn-warning"
          onClick={downloadPhoto}
          disabled={!photo}
        >
          <i className="bi bi-download me-2"></i>
          Save
        </button>

        {/* Close */}
        <button
          className="btn btn-danger"
          onClick={stopCamera}
        >
          <i className="bi bi-camera-video-off-fill me-2"></i>
          Close
        </button>

      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-preview"
      />

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

      {photo && (
        <div className="mt-4">
          <h5 className="text-center mb-3">
            <i className="bi bi-image-fill me-2"></i>
            Captured Photo
          </h5>

          <img
            src={photo}
            alt="Captured"
            className="captured-photo"
          />
        </div>
      )}
    </motion.div>
  );
}

export default CameraCard;
