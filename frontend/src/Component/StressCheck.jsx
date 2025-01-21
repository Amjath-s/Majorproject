// // Date: 03/08/2021

// // import { useEffect } from "react";

// import { video } from "framer-motion/client";
// import { useEffect, useRef,useState} from "react";
// import {io} from "socket.io-client";

// function StressCheck()
// {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [stressLevel, setStressLevel] = useState(null);
//   const [stream, setStream] = useState(null);
//   const socket = io("http://localhost:5000"); // Replace with your Flask backend URL

//   useEffect(() => {
//     // Access the webcam and display the video stream
//     const startVideo = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         // videoRef.current.srcObject = stream;
//          videoRef.current.srcObject = videoStream;
//          setStream(videoStream);
//       } catch (error) {
//         console.error("Error accessing webcam:", error);
//       }
//     };

//     startVideo();
    

//     // Capture frames at intervals and send them to the backend
//     const interval = setInterval(() => {
//       captureFrame();
//     }, 2000); // Capture a frame every 1 second

//     // return () => {
//     //   clearInterval(interval);
//     //   socket.disconnect(); // Clean up WebSocket connection
//     // };
//   },[]);

//   useEffect(() => {
//     // Listen for stress level updates from the backend
//     socket.on("stressLevel", (data) => {
//       setStressLevel(data.stressLevel);
//     });


//     // Handle WebSocket errors
//     socket.on("error", (error) => {
//       console.error("WebSocket error:", error);
//     });
//   }, []);

// const endstress = () => {
//   // Stop all video tracks
//   if (stream) {
//     stream.getTracks().forEach((track) => track.stop());
//     setStream(null);
//   }

//   // Remove video source
//   if (videoRef.current) {
//     videoRef.current.srcObject = null;
//   }

//   // Disconnect socket
//   if (socket.current) {
//     socket.current.disconnect();
//   }


//   // Reset state
//   setStressLevel(null);

// };












//   const captureFrame = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     // Draw the current video frame onto the canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert the canvas image to base64
//     const frameData = canvas.toDataURL("image/jpeg");

//     // Send the frame to the backend
//     socket.emit("frame", frameData);
//   };

//   return (
//     <div className="App">
//       <h1>Real-Time Stress Detection</h1>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         width="640"
//         height="480"
//       />
//       <canvas
//         ref={canvasRef}
//         width="640"
//         height="480"
//         style={{ display: "none" }}
//       />
//       {stressLevel !== null && (
//         <div>
//           <h2>Stress Level: {stressLevel}</h2>
//         </div>
//       )}
//       <div>
//         <button onClick={endstress}>
//             end
//         </button>
//       </div>
//     </div>
//   );
// }
// export default StressCheck;






import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function StressCheck() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stressLevel, setStressLevel] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const [stream, setStream] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = io("http://localhost:5000"); // Replace with your Flask backend URL

    const startVideo = async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = videoStream;
        setStream(videoStream);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideo();

    const interval = setInterval(() => {
      captureFrame();
    }, 2000);

    return () => {
      clearInterval(interval);
      socketRef.current.disconnect(); // Cleanup WebSocket connection
    };
  }, []);

  useEffect(() => {
    // Listen for stress level updates from backend
    socketRef.current.on("stressLevel", (data) => {
      setStressLevel(data.stressLevel);
    });
    socketRef.current.on("Emotion", (data) => {
      setEmotion(data.emotion);
    });

    // Handle WebSocket errors
    socketRef.current.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }, []);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    // const context = canvas.getContext("2d");
      if (!canvas || !video) {
        console.error("Canvas or Video element not found!");
        return;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Could not get 2D context from canvas!");
        return;
      }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameData = canvas.toDataURL("image/jpeg");

    socketRef.current.emit("frame", frameData);
  };

  const endStress = () => {
    // Stop all video tracks
    if (videoRef.current && videoRef.current.srcObject) {
      let stream = videoRef.current.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach((track) => track.stop()); // Stop each track
      videoRef.current.srcObject = null; // Remove video source
    }

    // Stop the WebSocket connection
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Reset state variables
    setStressLevel(null);

    // OPTIONAL: Inform the user to manually revoke camera permission
    alert(
      "Camera access stopped. To revoke permissions completely:\n\n" +
        "🔹 Chrome: Click 🔒 in address bar → 'Site settings' → Set Camera to 'Block'.\n" +
        "🔹 Firefox: Go to 'Settings' → 'Privacy & Security' → 'Permissions' → Block Camera.\n" +
        "🔹 Safari: Go to 'Preferences' → 'Websites' → Block Camera.\n"
    );
  };


  return (
    <div className="App">
      <h1>Real-Time Stress Detection</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
      {stressLevel !== null && (
        <div>
          <h2>Stress Level: {stressLevel}</h2>
        </div>
      )}
      <div>
        <button onClick={endStress}>End</button>
      </div>
    </div>
  );
}

export default StressCheck;
