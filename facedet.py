import cv2
from deepface import DeepFace

cap = cv2.VideoCapture(0)
previous_emotion = None

while True:
    ret, frame = cap.read()
    if not ret:
        break

    try:
        # Analyze emotion in the frame
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        
        # Check if result is a list (multiple faces) or dictionary (single face)
        if isinstance(result, list):
            emotion_label = result[0]['dominant_emotion']
        else:
            emotion_label = result['dominant_emotion']
        
        # Check if the emotion has changed before drawing the rectangle
        if emotion_label != previous_emotion:
            # Draw rectangle with emotion label if changed
            cv2.putText(frame, emotion_label, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            previous_emotion = emotion_label

    except Exception as e:
        print("Error analyzing emotion:", e)

    # Show the video feed with emotion label
    cv2.imshow('Emotion Detection', frame)

    # Press 'q' to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()