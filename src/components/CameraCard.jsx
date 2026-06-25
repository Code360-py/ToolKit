import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";

function CameraCard() {
  const [photo, setPhoto] = useState(null);
  const [usingFrontCamera, setUsingFrontCamera] =
    useState(false);

  const requestPermission = async () => {
    try {
      const permissions =
        await Camera.requestPermissions();

      return permissions.camera === "granted";
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const takePicture = async () => {
    try {
      const granted = await requestPermission();

      if (!granted) {
        alert("Camera permission is required.");
        return;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        presentationStyle: "fullscreen",
        direction: usingFrontCamera
          ? "FRONT"
          : "REAR",
      });

      setPhoto(image.dataUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const flipCamera = () => {
    setUsingFrontCamera((prev) => !prev);
  };

  const downloadPhoto = () => {
    if (!photo) return;

    const link = document.createElement("a");

    link.href = photo;
    link.download = `photo-${Date.now()}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearPhoto = () => {
    setPhoto(null);
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

      <div className="d-flex justify-content-center gap-2 flex-wrap mb-4">

        <button
          className="btn btn-success"
          onClick={takePicture}
        >
          <i className="bi bi-camera-fill me-2"></i>
          Take Picture
        </button>

        <button
          className="btn btn-primary flip-btn"
          onClick={flipCamera}
        >
          <i className="bi bi-arrow-repeat me-2"></i>
          {usingFrontCamera
            ? "Front Camera"
            : "Rear Camera"}
        </button>

        <button
          className="btn btn-warning"
          onClick={downloadPhoto}
          disabled={!photo}
        >
          <i className="bi bi-download me-2"></i>
          Save
        </button>

        <button
          className="btn btn-danger"
          onClick={clearPhoto}
          disabled={!photo}
        >
          <i className="bi bi-trash me-2"></i>
          Clear
        </button>

      </div>

      {!photo ? (
        <div className="camera-placeholder text-center">
          <i className="bi bi-camera2 display-1"></i>

          <p className="mt-3">
            Tap "Take Picture" to open camera
          </p>
        </div>
      ) : (
        <div className="text-center">
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
