import React, { useState } from "react";

const GetUserDemographics: React.FC = () => {
  const [userDemographics, setUserDemographics] = useState({
    learningStyle: "",
    interests: "",
    languageProficiency: "",
    learningGoals: "",
    timeAvailability: "",
    learningPace: "",
    feedbackPatterns: "",
    culturalContext: "",
    motivationLevel: "",
    challenges: "",
    previousLanguageLearning: "",
    cognitiveSkills: "",
    physicalAbilities: "",
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
        Learning Style Preferences:
        <input
          type="text"
          name="learningStyle"
          value={userDemographics.learningStyle}
          onChange={handleChange}
          placeholder="Enter learning style preferences"
        />
      </label>
      <label>
        Interests and Hobbies:
        <input
          type="text"
          name="interests"
          value={userDemographics.interests}
          onChange={handleChange}
          placeholder="Enter interests and hobbies"
        />
      </label>
      <label>
        Language Proficiency Level:
        <input
          type="text"
          name="languageProficiency"
          value={userDemographics.languageProficiency}
          onChange={handleChange}
          placeholder="Enter language proficiency level"
        />
      </label>
      <label>
        Learning Goals:
        <input
          type="text"
          name="learningGoals"
          value={userDemographics.learningGoals}
          onChange={handleChange}
          placeholder="Enter learning goals"
        />
      </label>
      <label>
        Time Availability:
        <input
          type="text"
          name="timeAvailability"
          value={userDemographics.timeAvailability}
          onChange={handleChange}
          placeholder="Enter time availability"
        />
      </label>
      <label>
        Learning Pace:
        <input
          type="text"
          name="learningPace"
          value={userDemographics.learningPace}
          onChange={handleChange}
          placeholder="Enter learning pace"
        />
      </label>
      <label>
        Feedback Patterns:
        <input
          type="text"
          name="feedbackPatterns"
          value={userDemographics.feedbackPatterns}
          onChange={handleChange}
          placeholder="Enter feedback patterns"
        />
      </label>
      <label>
        Cultural Context:
        <input
          type="text"
          name="culturalContext"
          value={userDemographics.culturalContext}
          onChange={handleChange}
          placeholder="Enter cultural context"
        />
      </label>
      <label>
        Motivation Level:
        <input
          type="text"
          name="motivationLevel"
          value={userDemographics.motivationLevel}
          onChange={handleChange}
          placeholder="Enter motivation level"
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
        Previous Language Learning Experience:
        <input
          type="text"
          name="previousLanguageLearning"
          value={userDemographics.previousLanguageLearning}
          onChange={handleChange}
          placeholder="Enter previous language learning experiences"
        />
      </label>
      <label>
        Cognitive Skills:
        <input
          type="text"
          name="cognitiveSkills"
          value={userDemographics.cognitiveSkills}
          onChange={handleChange}
          placeholder="Enter cognitive skills"
        />
      </label>
      <label>
        Physical Abilities:
        <input
          type="text"
          name="physicalAbilities"
          value={userDemographics.physicalAbilities}
          onChange={handleChange}
          placeholder="Enter physical abilities"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GetUserDemographics;
