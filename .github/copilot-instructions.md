# TrendPulse Assistant Instructions

When working on this project (TrendPulse), strictly adhere to these professional standards derived from the `instructa/ai-prompts` knowledge base.

## 🎨 Design Philosophy (Bloomberg Terminal)
-   **Colors:** Background must be `#000000` (Pure Black). Accents use `#39FF14` (Neon Green), `#00F3FF` (Cyan), and `#FF3131` (Alert Red).
-   **UI Density:** Prefer high-information density over "airy" whitespace. Use monospaced fonts for all data points.
-   **Feedback:** Every interactive element must have a glowing hover effect. Use micro-animations for data updates.

## 🛠️ Coding Standards
-   **Minimalism:** Only produce output relevant to the task. Avoid unnecessary verbosity.
-   **Verification:** Always verify data from the GitHub API before rendering. Handle rate limits (429 errors) gracefully with UI notifications.
-   **Security:** Never hardcode API keys. Tokens must only be stored in `localStorage`.

## 📂 Structure
-   `index.html`: Entry point.
-   `style.css`: All styling (Vanilla CSS preferred).
-   `app.js`: Core logic.
-   `utils.js`: Helper functions for math and formatting.
