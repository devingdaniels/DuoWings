import React, { useState } from "react";

const GetUserDemographics: React.FC = () => {
  const [userDemographics, setUserDemographics] = useState({
    nativeLanguage: "",
    desiredLanguage: "",
    interests: "",
    learningGoals: "",
    desiredLanguageProficiency: "",
    culturalContext: "",
    challenges: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDemographics({
      ...userDemographics,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userDemographics);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Native language:
        <input
          type="text"
          name="nativeLanguage"
          value={userDemographics.nativeLanguage}
          onChange={handleChange}
          placeholder="What is your native language?"
        />
      </label>
      <label>
        What language do you want to learn?
        <input
          type="text"
          name="languageProficiency"
          value={userDemographics.desiredLanguage}
          onChange={handleChange}
          placeholder="What language do you want to learn?"
        />
      </label>
      <label>
        Interests:
        <input
          type="text"
          name="interests"
          value={userDemographics.interests}
          onChange={handleChange}
          placeholder="What are your interests?"
        />
      </label>
      <label>
        learningGoals:
        <input
          type="text"
          name="learningGoals"
          value={userDemographics.learningGoals}
          onChange={handleChange}
          placeholder="learningGoals"
        />
      </label>
      <label>
        desiredLanguageProficiency
        <input
          type="text"
          name="culturalContext"
          value={userDemographics.desiredLanguageProficiency}
          onChange={handleChange}
          placeholder="desiredLanguageProficiency"
        />
      </label>
      <label>
        Challenges:
        <input
          type="text"
          name="challenges"
          value={userDemographics.challenges}
          onChange={handleChange}
          placeholder="Enter challenges faced"
        />
      </label>
      <label>
        culturalContext:
        <input
          type="text"
          name="challenges"
          value={userDemographics.culturalContext}
          onChange={handleChange}
          placeholder="culturalContext"
        />
      </label>
      <label>
        Challenges:
        <input
          type="text"
          name="challenges"
          value={userDemographics.challenges}
          onChange={handleChange}
          placeholder="Enter challenges faced"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GetUserDemographics;
