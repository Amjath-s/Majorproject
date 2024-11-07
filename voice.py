import speech_recognition as sr

def recognize_word(expected_word):
    # Initialize recognizer
    recognizer = sr.Recognizer()

    # Use the microphone as the audio source
    with sr.Microphone() as source:
        print("Say Apple")

        # Adjust for ambient noises
        recognizer.adjust_for_ambient_noise(source)
        
        try:
            # Listen to the audio and convert it to text
            audio = recognizer.listen(source)
            recognized_text = recognizer.recognize_google(audio)
            print(f"You said: {recognized_text}")
            
            # Check if the recognized word matches the expected word
            if recognized_text.lower() == expected_word.lower():
                print("The word is correct!")
            else:
                print("The word is incorrect.")
        
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand the audio.")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")

# Define the word to be recognized
expected_word = "Apple"  # You can change this to any word you want

recognize_word(expected_word)