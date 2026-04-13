# TrendPulse ⚡

> [!IMPORTANT]
> **Disclaimer:** TrendPulse is a third-party analytics tool and is **NOT** affiliated, associated, or endorsed by GitHub, Inc. It operates independently via the public GitHub REST API.

**The Bloomberg Terminal for GitHub.** Detect "Zero-Day" breakout repositories before they hit the global trending page.

---

## 🚀 The Vision
Most trending lists show you what is *already* popular. **TrendPulse** uses a custom **Star Velocity Algorithm** to find repositories with massive upward momentum early in their lifecycle. It’s for developers who want to catch the wave before the mainstream.

## 🛠️ Performance Features
-   **Velocity Metrics:** Ranks projects by `Stars / Time²` (Acceleration).
-   **Shadow Radar:** Specifically flags repos with <500 stars that are spiking.
-   **Domain Filtering:** Filter by topic/language (Python, Rust, JavaScript, etc.) to find trends in specific niches.
-   **Pulse Badges:** Real-time 👑, 🔥, and 🚀 indicators for the top-performing breakout repos.
-   **Bloomberg UI:** A high-density, dark-mode dashboard with neon accents.
-   **Local-First:** Runs entirely in your browser using your own GitHub PAT (5,000 req/hr limit).

## 🖥️ Preview
*(Placeholder for stunning terminal-style screenshot)*

## 🚦 Quick Start
1.  **Clone the Repo:**
    ```bash
    git clone https://github.com/shivank/trendpulse.git
    cd trendpulse
    ```
2.  **Open `index.html`** in your browser.
3.  **Enter your GitHub Token** in the Settings modal (stored locally).
4.  **Watch the Radar.**

## 🧠 The Algorithm: Star Acceleration
Instead of just counting stars ($S$), we look at the rate of change over time ($T$):
$$ \text{Velocity} = \frac{\Delta S}{\Delta T} $$
$$ \text{Pulse Factor} = \text{Velocity} \times \text{Acceleration} $$

## 🤝 Contributing
This is an open-source project. Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/shivank/trendpulse/issues).

## ⚖️ License
Distributed under the **MIT License**. See `LICENSE` for more information.

---
*Built with transparency and speed in mind.*
