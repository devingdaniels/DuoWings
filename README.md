# AI Spanish Tutor & Enhanced Vocab Learning with Quizlet

![AI Spanish Tutor](./screenshot.png)

Welcome to the AI Spanish Tutor web application, an enhanced version of Quizlet designed to help you learn Spanish vocabulary effectively through the power of AI. This application is built using Node.js, React with Vite, and leverages AI technology to provide personalized learning experiences for mastering Spanish vocabulary.

## Features

- **Personalized Vocabulary Learning**: The AI Spanish Tutor analyzes your learning patterns and adapts the vocabulary learning experience to match your progress and preferences.
- **Interactive Flashcards**: Study Spanish words and their meanings using interactive flashcards. The app provides an intuitive interface for flipping and reviewing cards.
- **AI-Powered Quizzes**: Test your knowledge with AI-generated quizzes that challenge you based on your performance. The AI adapts question difficulty to ensure you're consistently challenged and engaged.
- **Speech Recognition**: Practice your pronunciation by speaking Spanish words. The built-in speech recognition technology provides instant feedback on your pronunciation accuracy.
- **Progress Tracking**: Keep track of your learning progress with detailed statistics and visualizations. Monitor your improvements over time and set goals for yourself.
- **Responsive Design**: Enjoy a seamless learning experience across various devices, including desktops, tablets, and smartphones.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/ai-spanish-tutor.git`
2. Navigate to the project directory: `cd ai-spanish-tutor`
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your web browser and go to `http://localhost:3000` to access the AI Spanish Tutor application.

## Usage

1. Create an account or log in using your existing credentials.
2. Explore the available vocabulary sets or create your own.
3. Start learning by studying flashcards and practicing pronunciation.
4. Take AI-generated quizzes to test your knowledge and improve your skills.
5. Monitor your progress through the dashboard and adjust your learning strategy as needed.

## Technologies Used

- Node.js
- React (with Vite)
- AI and Natural Language Processing (NLP) technology
- Speech Recognition API
- Responsive Web Design

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request to the [GitHub repository](https://github.com/your-username/ai-spanish-tutor).

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy learning and mastering Spanish vocabulary with the AI Spanish Tutor! If you have any questions or need assistance, feel free to contact us at support@aispanishtutor.com.

Learning:

When creating a new user, I am creating a token using JWT. If I store the token in localStorage, then I can easily get int in my frontend when I call my backend API, which in turns uses middleware to extract the token and verify. Explain whether or not this is a good way to protect routes and/or if there is a better way?

Storing JWT tokens in `localStorage` for authentication in your frontend and using them to protect routes can work, but it's not the most secure approach and can lead to vulnerabilities if not implemented carefully. There are better alternatives that provide enhanced security. Let's explore the pros and cons of using `localStorage` for storing JWT tokens and discuss a more secure approach.

**Using `localStorage` for Storing JWT Tokens:**

Pros:

1. **Ease of Use:** It's straightforward to set and retrieve data from `localStorage` in the browser.

Cons:

1. **Security Concerns:** `localStorage` is vulnerable to cross-site scripting (XSS) attacks. If an attacker manages to inject malicious scripts into your application, they can potentially access and steal the JWT tokens stored in `localStorage`.
2. **No Built-in Expiry:** JWT tokens usually have an expiration time. With `localStorage`, you would need to manually handle token expiration and renewal, which can be error-prone.
3. **Limited to Same-Origin:** Data stored in `localStorage` is limited to the same origin (protocol, domain, and port). This can be a limitation if you have subdomains or need to share authentication across multiple frontend applications.

**A More Secure Approach: Using HttpOnly Cookies:**

To enhance security and address the concerns associated with storing tokens in `localStorage`, consider using HttpOnly cookies for storing JWT tokens. Here's how it works:

1. When a user logs in, your backend generates a JWT token and sets it as an HttpOnly cookie in the user's browser. HttpOnly cookies cannot be accessed via JavaScript, making them less vulnerable to XSS attacks.
2. The token is automatically included in subsequent requests to your backend API, providing seamless authentication without exposing the token to frontend code.

Pros of Using HttpOnly Cookies:

1. **Enhanced Security:** HttpOnly cookies mitigate XSS vulnerabilities, as malicious scripts cannot access them.
2. **Built-in Expiry and Renewal:** Cookies can have an expiration time, and you can set up mechanisms for token renewal and refreshing without user intervention.
3. **Domain and Subdomain Flexibility:** Cookies can be configured to work across subdomains, allowing for seamless authentication across different parts of your application.

Cons:

1. **CSRF Vulnerabilities:** While HttpOnly cookies provide security benefits, they are still vulnerable to Cross-Site Request Forgery (CSRF) attacks. Implementing anti-CSRF measures is important to mitigate this risk.

In summary, while storing JWT tokens in `localStorage` can work, it's not the most secure option due to XSS vulnerabilities. Using HttpOnly cookies is a more secure approach for managing authentication tokens, as they provide better protection against certain types of attacks. However, remember to implement additional security measures, such as anti-CSRF tokens, to further safeguard your application.
