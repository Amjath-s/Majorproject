// PersonalDetails.js

import React from 'react';
import './PersonalDetails.css'; // Import CSS file for styling

function PersonalDetails() {
  return (
    <div className="form-container1">
      <h2>Personal Details</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dob" />
        </label>
        <label>
          Age:
          <input type="number" name="age" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PersonalDetails;










