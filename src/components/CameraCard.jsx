import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from "@capacitor/camera";

function CameraCard() {
  const [photo, setPhoto] = useState(null);
  const [cameraDirection, setCameraDirection] =
    useState(CameraDirection.Rear);

  const takePicture = async () => {
    try {
      const permissions =
        await Camera.requestPermissions();

      if (permissions.camera !== "granted") {
        alert("Camera permission required");
        return;
      }

      const image = await Camera.getPhoto({
        quality: 95,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        direction: cameraDirection,
        saveToGallery: true,
      });

      setPhoto(image.dataUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to capture image");
    }
  };

  const flipCamera = () => {
    setCameraDirection((prev) =>
      prev === CameraDirection.Rear
        ? CameraDirection.Front
        : CameraDirection.Rear
    );
  };

  const clearPhoto = () => {
    setPhoto(null);
  };

  return (
    <motion.div
      className="glass-card mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
          {cameraDirection === CameraDirection.Rear
            ? "Rear Camera"
            : "Front Camera"}
        </button>

        <button
          className="btn btn-danger"
          onClick={clearPhoto}
          disabled={!photo}
        >
          <i className="bi bi-trash-fill me-2"></i>
          Clear
        </button>
      </div>

      {!photo ? (
        <div className="camera-placeholder text-center">
          <i className="bi bi-camera2 display-1"></i>

          <p className="mt-3">
            Capture a photo to preview it here
          </p>

          <small className="text-muted">
            Photos are automatically saved to gallery
          </small>
        </div>
      ) : (
        <div className="text-center">
          <img
            src={photo}
            alt="Captured"
            className="captured-photo"
          />

          <div className="mt-3">
            <span className="badge bg-success">
              Saved to Gallery
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CameraCard;
