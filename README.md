# Generative AI Chatbot

This project is a generative AI chatbot built with React, TypeScript, and the OpenAI API.

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up your OpenAI API key**
   - Sign up for an OpenAI account at https://platform.openai.com/signup
   - Generate an API key at https://platform.openai.com/account/api-keys
   - Create a `.env` file in the root directory of the project
   - Add your API key to the `.env` file:
     ```
     VITE_OPENAI_API_KEY=your_actual_api_key_here
     ```
   - Replace `your_actual_api_key_here` with your real OpenAI API key

4. **Start the development server**
   ```
   npm run dev
   ```

5. **Open the application**
   - Navigate to `http://localhost:5173` in your web browser

## Important Notes

- Never commit your `.env` file to version control
- Ensure `.env` is listed in your `.gitignore` file
- Keep your API key secret and don't share it publicly

## Troubleshooting

If you encounter an "Incorrect API key provided" error, double-check that you've correctly set up your `.env` file with a valid OpenAI API key.