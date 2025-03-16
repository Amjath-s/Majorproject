
from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit
import base64
import cv2
import numpy as np
from flask_cors import CORS
import cv2
import numpy as np
from deepface import DeepFace
import difflib


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins for development

# Placeholder function for stress detection


def process_frame(frame):
     try:
        # Convert frame to grayscale
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Perform face analysis using DeepFace (Emotion Recognition)
        analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)

        # Extract detected emotion
        emotion = analysis[0]['dominant_emotion']

        # Map emotions to stress levels (0-100 scale)
        stress_mapping = {
            "angry": 80,
            "fear": 90,
            "sad": 70,
            "disgust": 85,
            "happy": 20,
            "surprise": 50,
            "neutral": 0
        }

        # Get stress level based on emotion
        stress_levels = stress_mapping.get(emotion, 0)  # Default to 50 if emotion is unknown
        return stress_levels
     

        # return {"stress": stress_levels, "emotion": emotion}
        # return{"stressLevel":stress_level}
     

     except Exception as e:
        print("Error processing frame:", str(e))
        return {"stress": 50, "emotion": "neutral"}

    # process_frames(frame)


  


# Handle WebSocket connection
@socketio.on("connect")
def handle_connect():
    print("Client connected")

# Handle WebSocket disconnection
@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")

# Handle incoming frames from the frontend
@socketio.on("frame")
def handle_frame(frameData):
    print("Received frame from client")

    # Decode the base64 image
    header, encoded = frameData.split(",", 1)
    binary_data = base64.b64decode(encoded)
    np_data = np.frombuffer(binary_data, dtype=np.uint8)
    frame = cv2.imdecode(np_data, cv2.IMREAD_COLOR)

    # Process the frame (e.g., using a stress detection model)
    stress_level = process_frame(frame)

    # Send the stress level back to the frontend
    emit("stressLevel", {"stressLevel": stress_level})
   



# spechgame
def check_pronunciation(target_word, spoken_word):
    similarity = difflib.SequenceMatcher(None, target_word, spoken_word).ratio()
    return similarity > 0.8  # 80% accuracy threshold

@socketio.on("check_pronunciation")
def handle_speech(data):
    target_word = data["word"]
    spoken_word = data["speech"]

    correct = check_pronunciation(target_word, spoken_word)
    socketio.emit("result", {"correct": correct})

   

if __name__=='__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
