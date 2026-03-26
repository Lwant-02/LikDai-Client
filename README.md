# ⚙️ LikDai - Shan Typing Tutor

![LikDai Screenshot](https://res.cloudinary.com/dt28nxrrx/image/upload/v1774509132/screenshot-one_pxboww.png)

**LikDai** is a responsive and intuitive web-based typing tutor designed to help you master typing in the **Shan (Tai Yai) language**, as well as English. It provides a modern learning experience with real-time feedback, performance tracking, and a clean user interface to enhance your typing efficiency and language skills.

The project is built with a modern tech stack and is fully open source.

---

## 🚀 Key Features

-   🎯 **Multi-Language Support**: Practice typing in both **Shan (Tai Yai)** and **English**.
-   🌍 **Internationalization (i18n)**: The user interface is available in multiple languages for a global audience.
-   🔐 **Secure Authentication**:
    -   Sign up and log in with your **Email & Password**.
    -   Log in quickly and securely with **Google OAuth**.
-   🏆 **Leaderboard**: Compete with other users and see how your typing skills rank globally.
-   📜 **Certificate Generation**: Receive a downloadable certificate upon achieving specific typing milestones.
-   ⌨️ **Virtual Keyboard**: An on-screen keyboard to help you visualize key layouts.
-   📊 **Live Performance Stats**: Track your **Words Per Minute (WPM)** and **Accuracy** in real-time.
-   🟡 **Animated Caret**: A smooth, animated caret that moves as you type for a better user experience.
-   🌐 **Grapheme-Aware Logic**: Correctly handles complex scripts like Shan, ensuring each character is processed accurately.
-   🔁 **Multiple Typing Modes**: Choose from different modes to keep your practice sessions interesting:
    -   **Practice Mode**: Default mode for continuous typing.
    -   **Quotes Mode**: Type famous quotes.
    -   **Time Mode**: Test how much you can type in a set amount of time.
    -   **Custom Text**: Paste your own text to practice with.
-   📱 **Progressive Web App (PWA)**: Install LikDai on your desktop or mobile device for offline access and an app-like experience.
-   🎨 **Responsive Design**: A clean and modern UI built with Tailwind CSS that looks great on any device.

---

## 🛠️ Tech Stack & Tools

This project is built using a modern frontend stack to ensure a fast, reliable, and scalable application.

### Core Technologies
-   **Framework**: [React](https://reactjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Bundler**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)

### Key Libraries & Utilities
-   **Global State**: [Zustand](https://github.com/pmndrs/zustand)
-   **Data Visualization**: [Recharts](https://recharts.org/)
-   **Internationalization**: [react-i18next](https://react.i18next.com/)
-   **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)
-   **Grapheme Splitting**: [GraphemeSplitter](https://github.com/orling/grapheme-splitter) for accurate complex script character handling.

### Development Tools
-   **IDE**: [Cursor](https://cursor.sh/)
-   **API Testing**: [Postman](https://www.postman.com/) (for any future API integrations)

---

## 📖 Getting Started

Follow these instructions to get a local copy of the project up and running for development or testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) and a package manager like `npm` or `yarn` installed on your system.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/likdai.git](https://github.com/your-username/likdai.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd LikDai-Client
    ```

3.  **Install the dependencies:**
    ```sh
    npm install
    ```

4.  **Set up environment variables:**
    -   Create a new file named `.env` in the root of your project.
    -   Copy the contents from `.env.example` into your new `.env` file.
    -   Fill in the required environment variables (like API keys, database URLs, etc.).
    ```sh
    # Example .env file
    VITE_BACKEND_URL="http://localhost:8001/api"
    VITE_WEBSITE_URL="http://localhost:3000"
    VITE_GOOGLE_CLIENT_ID="your_google_client_id"
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application should now be running on `http://localhost:3001`.

---

## 🤝 Contributing

This project is fully open source and maintained with the help of the community. We welcome contributions of any kind!

Whether it’s fixing bugs, improving documentation, adding new features, or sharing ideas, your help is greatly appreciated.

### How to Contribute
1.  **Fork** the repository.
2.  Create a new branch (`git checkout -b feature/YourAmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5.  Push to the branch (`git push origin feature/YourAmazingFeature`).
6.  Open a **Pull Request**.

Feel free to open an issue for any bugs or feature requests.

Thank you for being part of this open-source journey! 🚀
