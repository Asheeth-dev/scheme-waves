# Sahaay

Sahaay helps families in India find financial support for cancer treatment. It asks a short set of questions about the patient and their circumstances, then matches the answers against a list of government schemes, NGOs, and hospital help desks.

The questionnaire is available in English, Hindi, and Kannada. You can answer by speaking or by selecting and entering answers on screen. At the end, Sahaay shows a report that can be printed or shared.

## Using Sahaay

1. Choose English, हिन्दी, or ಕನ್ನಡ from the language selector.
2. Start the check and answer the questions. Use voice input where your browser supports it, or answer using the on-screen controls.
3. Review the schemes and support organizations matched to your answers. Print the report or share it on WhatsApp if helpful.

Your answers are used in the current session and are not sent to an account or saved by the app. Your language choice is remembered on this device. Eligibility matches are a starting point, not an approval: check each program's current rules and application process with the organization responsible for it.

## Run it locally

You’ll need [Bun](https://bun.sh/) installed. From the project folder, run:

```sh
bun install
bun run dev
```

Open the local address printed in the terminal. To create a production build or check the code style, run:

```sh
bun run build
bun run lint
```

## What’s included

- A voice-assisted questionnaire with translated questions and answer choices in English, Hindi, and Kannada.
- A rule-based eligibility matcher and locally bundled reference data: 47 government schemes, 20 NGOs, and 15 help desks.
- A results report with print and WhatsApp sharing options.

The questionnaire and choices change with the selected language. Some landing-page and report text is currently in English.

## Built with

React, TypeScript, TanStack Start, and Tailwind CSS. The eligibility matcher and reference data run in the app; no account is needed to try it.