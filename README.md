# Satya – AI-Powered Misinformation Detection

Satya is an easy-to-use, AI-powered platform designed to empower Indian youth to identify and combat the spread of digital misinformation. By providing quick credibility analysis and evidence-based verdicts, Satya aims to foster a more informed and critical digital citizenry.

**Live Demo (Prototype):** https://satya-bay.vercel.app/

### 📸 Screenshots

| Home Dashboard                               | Analysis Result                              |
| -------------------------------------------- | -------------------------------------------- |
| ![Satya Frontend](/public/image1.png) | ![Satya Detection](/public/image2.png) |

---

## 🚀 Features

-   **Home Dashboard**: Paste news links or raw text directly into the interface to check credibility.
-   **Analysis / Result**: Receive a clear credibility score, a plain-language verdict (e.g., "Likely True," "Misleading"), and evidence snippets from a curated list of trusted sources.
-   **Recommendations / Insights**: Get actionable tips on how to spot common patterns of misinformation and best practices for sharing verified information.
-   **Community / Support (Future)**: An optional feature to connect users with digital literacy experts or awareness groups.

---

## 🛠 Tech Stack

-   **Backend:** FastAPI (Python)
-   **AI Integration:** Google Gemini API with the Agent Development Kit (ADK) and Grounding in trusted sources.
-   **Frontend:** HTML + CSS (using Jinja2 templates for the prototype).
-   **Database (Optional):** MongoDB / Firebase for future scalability.
-   **Deployment:** Cloud Run / Docker.

---

## 💻 Installation & Setup

Follow these steps to set up and run the Satya project on your local machine.

**1. Clone the Repository**

First, clone the project from GitHub to your local computer.

```bash
git clone https://github.com/PrajashPatel/Satya
