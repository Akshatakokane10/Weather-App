# ☀️ Weather-App

A clean, single-page application built with **HTML**, **CSS**, and **JavaScript** to display the **current weather** and **5-day forecast** for any city worldwide, using the **OpenWeatherMap API**.

---

## 📄 Project Description

The **Weather-App** is designed to provide users with an elegant and fast way to check real-time weather updates. It features a minimalist dark-themed UI with smooth animations and accurate data fetched from the OpenWeatherMap API.

### ✨ Core Features

- 🌤 **Current Weather:** Displays temperature, feels-like temperature, humidity, wind speed, and atmospheric pressure.  
- 🔍 **City Search:** Allows users to search weather details by city name.  
- 📅 **5-Day Forecast:** Summarizes upcoming daily forecasts with weather icons and temperature ranges.  
- 💾 **Persistence:** Automatically saves and loads the last searched city using local storage.  
- ⚙️ **Error Handling:** Displays clear messages when a city is not found or there’s a connection issue.  
- 📱 **Responsive Design:** Works smoothly on both desktop and mobile devices.

---

## 🚀 Setup and Run Instructions

Follow these simple steps to set up and run the Weather-App locally.

### ✅ Prerequisites

1. Any modern **web browser** (e.g., Chrome, Edge, Firefox).  
2. A free **API key** from [OpenWeatherMap](https://openweathermap.org/api).

---
### 🧩 Step 1: Clone the Repository

``bash
git clone https://github.com/YOUR_USERNAME/Weather-App.git
cd Weather-App

🔑 Step 2: Add Your API Key

Open the script.js file in a text editor.
Find the line near the top:

const API_KEY = 'YOUR_API_KEY_HERE';
Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key (for example: 1e756ab0f0286b12c80df46025cc39f3).

🌐 Step 3: Run the Application

Since this is a client-side project, you can run it directly.

Option 1 (Quickest):
Double-click the index.html file to open it in your browser.

Option 2 (Recommended for Development):
Use a local server such as the Live Server extension in VS Code to host the app locally and avoid CORS issues.

🧪 Testing
This project uses manual testing via the browser interface.

| Test Case                | Action                                                                | Expected Result                                         |
| ------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------- |
| **1. Load Test**         | Open `index.html`                                                     | Displays weather for the default or last searched city. |
| **2. Successful Search** | Enter a valid city (e.g., *London*, *Tokyo*, *Pune*) and click Search | Weather data and forecast update correctly.             |
| **3. Error Handling**    | Enter an invalid city (e.g., *asdfgh*)                                | Displays an error message “City not found”.             |
| **4. Responsive Design** | Open on mobile view                                                   | Layout adapts properly for smaller screens.             |

💡 Assumptions and Design Choices

| Category           | Choice / Assumption                                       | Rationale                                                          |
| ------------------ | --------------------------------------------------------- | ------------------------------------------------------------------ |
| **API**            | Used OpenWeatherMap for both current and forecast data.   | Free, reliable, and provides comprehensive weather data.           |
| **Styling**        | Dark theme with clean layout.                             | Enhances readability and fits the modern design aesthetic.         |
| **Tech Stack**     | Pure HTML, CSS, and JavaScript.                           | Simple and framework-free for learning and easy setup.             |
| **Forecast Logic** | Aggregates 3-hour OWM forecast data into daily summaries. | Required since OWM’s free tier provides data in 3-hour intervals.  |
| **Icons**          | Font Awesome for weather icons.                           | Lightweight and easy to map with OpenWeatherMap’s condition codes. |


