import React from 'react';
import './HealthDetails.css';
import { useNavigate } from 'react-router-dom';



function HealthDetails() {
    
     const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents page refresh
        navigate('/test1'); // Redirects to the Summary page
      };
  return (
    <div className="form-container2">
      <h2>Health Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
        Has your child been diagnosed with any specific medical or learning conditions? If so, what are they?:
          <input type="text" name="medicalConditions" placeholder="e.g., Asthma, Allergies" />
        </label>
        <label>
        Does your child have any known allergies (food, medications, environmental):
          <input type="text" name="allergies" placeholder="e.g., gluten-free, dairy, pencillin" />
        </label>
        <label>
        Are there any medications your child takes regularly? If yes, please specify:
          <input type="text" name="medications"  />
        </label>
        <label>
        Has your child had any significant health issues, hospitalizations, or surgeries? If yes, please describe:
        <input type="text" name="healthissues"  />

         {/* <textarea name="additionalNotes" placeholder="Any other relevant health information"></textarea>*/}
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HealthDetails;
