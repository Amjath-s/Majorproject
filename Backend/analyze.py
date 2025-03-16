
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# import cv2
# import numpy as np
# import mediapipe as mp

# # Initialize Mediapipe Face Detection
# mp_face_detection = mp.solutions.face_detection
# face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

# # Open webcam
# cap = cv2.VideoCapture(0)

# if not cap.isOpened():
#     print("Error: Could not access webcam")
#     exit()

# print("Webcam accessed successfully")

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         print("Error: Could not read frame")
#         break

#     print("Frame captured")

#     # Convert to RGB for Mediapipe
#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = face_detection.process(rgb_frame)

#     print("Frame processed")

#     # Process face detections
#     if results.detections:
#         print(f"Faces detected: {len(results.detections)}")
#         for detection in results.detections:
#             bboxC = detection.location_data.relative_bounding_box
#             ih, iw, _ = frame.shape
#             x, y, w, h = int(bboxC.xmin * iw), int(bboxC.ymin * ih), int(bboxC.width * iw), int(bboxC.height * ih)
#             cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

#             # Simulate stress level
#             stress_level = np.random.randint(10, 100)
#             print(f"Stress Level: {stress_level}")

#             # Display stress level on frame
#             cv2.putText(
#                 frame,
#                 f"Stress: {stress_level}%",
#                 (x, y - 10),
#                 cv2.FONT_HERSHEY_SIMPLEX,
#                 0.8,
#                 (0, 255, 0),
#                 2,
#                 cv2.LINE_AA,
#             )
#     else:
#         print("No face detected")

#     # Draw a test rectangle and text for rendering confirmation
#     cv2.rectangle(frame, (50, 50), (200, 200), (255, 0, 0), 2)
#     cv2.putText(
#         frame,
#         "Rendering Test",
#         (50, 250),
#         cv2.FONT_HERSHEY_SIMPLEX,
#         1,
#         (0, 255, 0),
#         2,
#         cv2.LINE_AA,
#     )

#     # Show video feed
#     cv2.imshow("Stress Analyzer", frame)

#     if cv2.waitKey(1) & 0xFF == ord("q"):
#         break

# cap.release()
# cv2.destroyAllWindows()



# import cv2
# import sys
# import json
# import numpy as np
# import mediapipe as mp

# mp_face_detection = mp.solutions.face_detection
# face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

# cap = cv2.VideoCapture(0)

# if not cap.isOpened():
#     print("Error: Could not access webcam")
#     exit()

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = face_detection.process(rgb_frame)

#     stress_level = 0
#     if results.detections:
#         stress_level = np.random.randint(10, 100)  # Simulate stress data

#     # Output stress data as JSON
#     print(json.dumps({"stress": stress_level}))
#     sys.stdout.flush()

# cap.release()
# cv2.destroyAllWindows()
