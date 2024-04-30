User
# Insightful

Insightful is an AI-powered journaling application designed to enhance self-reflection and mindfulness through intelligent prompts, mood-based quotes, personalized music suggestions, and more.

## Overview

In today's fast-paced world, maintaining a consistent journaling habit can be challenging. Insightful addresses these challenges by leveraging AI to deliver tailored prompts, inspirational quotes, and mood-enhancing music suggestions, fostering a deeper and more rewarding journaling experience.

## User Profile

- **Journal Enthusiasts:**
  - Seeking a convenient and engaging platform for journaling.
  - Interested in exploring their thoughts, emotions, and experiences through guided prompts.
  - Appreciate personalized content recommendations to enhance their journaling sessions.

## Features

- **AI-Powered Prompts:**
  - Receive personalized journaling prompts based on mood, time of day, and previous entries.
  - Engage in thoughtful reflection and self-discovery through intelligent question generation.

- **Mood-Based Quotes:**
  - Discover inspirational quotes tailored to the user's current mood and journaling content.
  - Find motivation and encouragement from a curated collection of quotes relevant to their emotional state.

- **Music Suggestions:**
  - Enhance the journaling experience with curated music playlists matched to the user's mood and preferences.
  - Enjoy seamless integration with popular music streaming services for easy access to mood-enhancing tunes.

- **Reminder System:**
  - Receive timely reminders to journal, ensuring consistency and accountability in the practice.
  - Stay motivated and committed to self-reflection with customizable reminder settings.

- **Daily Prompts:**
  - Access daily journaling prompts to kickstart creativity and introspection each day.
  - Cultivate a habit of regular journaling with fresh and engaging prompts delivered daily.

- **Memorable Entries Archive:**
  - Easily revisit and reflect on previous journal entries through a searchable archive.
  - Track personal growth and progress over time by reviewing past reflections and insights.

- **Calendar Page:**
  - Keep track of previous entries with a calendar page that marks each entry's date.
  - Revisit entries and add additional input, separated by current date markers.
  - Automatically create a new journal entry for the current date.

- **Free Version:**
  - Enjoy a free version with limitations, including up to 3 journals in different colors.
  - Each journal can contain up to 200 entries.

- **Authentication with Avatar:**
  - Securely log in to your account with authentication.
  - Personalize your login experience with profile avatars.

- **AI Interactive Avatar with Dialog Window:**
  - Enhance your journaling experience with an AI-powered interactive avatar.
  - The avatar serves as your AI companion, providing personalized recommendations and insights.
  - Clicking on the avatar triggers a dialog window, where you can interact with the AI, ask questions, or receive guidance.
  - This feature adds a dynamic and engaging element to the journaling process, fostering a deeper connection with the AI assistant.

   **Disclaimer Prompt:**
  - Upon starting the journaling experience, users will be presented with a disclaimer prompt informing them that the provided prompts and suggestions are not to be considered medical, legal, or professional advice. Users will be encouraged to consult appropriate professionals for specific advice tailored to their individual needs.


## Tech Stack

### Frontend:
- JavaScript
- React
- Material-UI for UI components
- whisper.ai
- chatgpt.api

### Backend:
- Node.js
- Express.js

- Create mock endpoints for user authentication, journal entry management, data retrieval, and other key features.
 ( Enable rapid development and testing of frontend components without dependence on a fully implemented backend.)



### AI Integration:
- Natural Language Processing (NLP) libraries for generating prompts and quotes
- Music recommendation APIs for personalized music suggestions

## Nice-to-Haves

- **Expanded Suggestions:**
  - In addition to journaling prompts, explore expanded suggestions such as movies, foods, activities, and more to further enhance your self-reflection and mindfulness journey.
  - Discover new ways to engage with your thoughts, emotions, and experiences through a diverse range of suggestions tailored to your preferences.

- **Local Resources with Map Library:**
  - Access a map library within the application to discover local resources for mindfulness and well-being.
  - Explore nearby parks, meditation centers, yoga studios, and other places conducive to self-reflection and relaxation.

- **Gamified Experiences:**
  - Take a break from journaling with gamified experiences inspired by interactive storytelling games.
  - Engage in made-up scenarios where you can interact by selecting response options.
  - Enjoy post-game retrospective output to reflect on your choices and insights gained from the experience.

- **Breathing Exercise Walkthrough Feature:**
  - Access guided breathing exercises within the application to promote relaxation and mindfulness.
  - Follow step-by-step instructions for various breathing techniques to help reduce stress and increase focus.

- **Simple Yoga Walkthrough Video Library:**
  - Explore a library of simple yoga walkthrough videos to incorporate mindfulness and movement into your routine.
  - Access beginner-friendly yoga sessions to help improve flexibility, strength, and overall well-being.

  ## Suggested Resources and Reasons

### Backend:
- **Node.js:** Node.js is a popular choice for building server-side applications due to its non-blocking, event-driven architecture, which makes it efficient for handling asynchronous operations commonly found in web servers.
- **Express.js:** Express.js is a minimalist web framework for Node.js, providing a robust set of features for building web applications and APIs with minimal overhead and a clean, expressive syntax.
- **MongoDB:** MongoDB is a scalable NoSQL database that offers flexibility and performance for storing unstructured or semi-structured data like journal entries and user data.
- **Mongoose:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward way to model application data with schema validation, middleware support, and other helpful features.

### Frontend:
- **React:** React is a declarative and component-based JavaScript library for building user interfaces, enabling developers to create reusable UI components and efficiently manage state changes in complex applications.
- **Material-UI:** Material-UI is a React UI framework that follows Google's Material Design guidelines, offering pre-designed components and styles for creating visually appealing and responsive user interfaces.

### AI Integration:
- **Natural Language Processing (NLP) libraries:** NLP libraries like NLTK (Natural Language Toolkit) or spaCy provide tools and algorithms for text analysis, enabling the generation of personalized journaling prompts and quotes based on user input and preferences.
- **Music recommendation APIs:** APIs like Spotify's Web API or Last.fm API offer access to vast music libraries and recommendation algorithms, allowing for the integration of personalized music suggestions based on user preferences and mood.
- **Whisper for Listening and Transcribing:** Whisper is a tool for listening to audio input and transcribing speech to text, which can be utilized to capture spoken journal entries or provide voice-controlled interactions with the application.

### Local Resources with Map Library:
- **Google Maps API:** Google Maps API provides powerful mapping and location-based services, allowing users to discover nearby parks, meditation centers, yoga studios, and other places conducive to self-reflection and relaxation within the application.

### Gamified Experiences:
- **React-based game frameworks:** React-based game frameworks like React Phaser or React Three Fiber offer tools and components for building interactive gaming experiences within the application, providing users with a break from journaling and an engaging way to unwind.
- **Storytelling game frameworks:** Storytelling game frameworks like Ink by Inkle or Twine enable the creation of interactive stories with branching narratives, offering users immersive and personalized gaming experiences.

### Breathing Exercise Walkthrough Feature:
- **Guided breathing exercise libraries:** Guided breathing exercise libraries like breathing libraries pre-built components and animations for implementing guided breathing exercises within the application, promoting relaxation and mindfulness among users.

### Simple Yoga Walkthrough Video Library:
- **Video streaming libraries:** Video streaming libraries like React Player or Plyr offer customizable components for embedding and streaming yoga walkthrough videos within the application, providing users with beginner-friendly yoga sessions to improve flexibility, strength, and overall well-being.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/insightful.git