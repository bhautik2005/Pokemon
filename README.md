# React + Vite
 

Pokémon Deck

A sleek, modern web application for browsing and searching Pokémon. Built with React and styled with Tailwind CSS, this project features a dynamic user interface with smooth animations and robust error handling.

(Note: Replace this with an actual screenshot or GIF of your application.)

✨ Features

Dynamic Pokémon Fetching: Loads a list of 300 Pokémon from the PokéAPI on initial load.

Live Search: Instantly filter the Pokémon list in real-time by typing in the search bar.

Responsive Design: A fully responsive grid layout that adapts to desktop, tablet, and mobile screens.

Modern UI/UX:

A beautiful dark theme with a subtle animated aurora background.

Gradient text for the main heading.

3D perspective on the card grid, allowing for interactive 3D card effects (implemented in the Card component).

Robust Error Handling:

Global Error State: Displays a user-friendly error message with a "Try Again" button if the initial data fetch fails.

Component-Level Error Boundary: Each Pokémon card is wrapped in an ErrorBoundary. If a single card fails to render (e.g., due to malformed API data), it will be replaced by an error message with a "Retry" button, preventing the entire application from crashing.

Loading State: Shows a clean loading spinner while fetching the Pokémon data to inform the user of background activity.

[!image](https://github.com/bhautik2005/Pokemon/blob/a99a796bb2623dea5d2e6c1415418639fba40dfe/Screenshot%202025-07-12%20105257-imageonline.co-merged.png)
🛠️ Technologies Used

React: A JavaScript library for building user interfaces.

React Hooks: (useState, useEffect) for state management and side effects in functional components.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

PokéAPI: The free and open-source Pokémon RESTful API used for all data.

🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites

You need to have Node.js and npm (or Yarn) installed on your machine.

Installation

Clone the repository:

Generated sh
git clone https://github.com/your-username/pokemon-deck.git


Navigate to the project directory:

Generated sh
cd pokemon-deck
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Sh
IGNORE_WHEN_COPYING_END

Install dependencies:

Generated sh
npm install
# or
yarn install
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Sh
IGNORE_WHEN_COPYING_END

Start the development server:

Generated sh
npm start
# or
yarn start
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Sh
IGNORE_WHEN_COPYING_END

The application should now be running on http://localhost:3000.

📂 Project Structure

The main logic is contained within the src directory.

Generated code
src/
├── components/
│   ├── main.js        # The main application component shown above
│   └── card.js        # The component for rendering a single Pokémon card (dependency)
├── App.js             # Main app component that renders <main />
└── index.js           # Entry point of the React application
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
Key Components

main.js:

Manages the application's global state (pokemon list, loading status, errors, and search query).

Handles fetching all Pokémon data from the PokéAPI.

Filters the Pokémon based on the user's search input.

Renders the main layout, header, search bar, and the grid of Pokémon cards.

Includes the ErrorBoundary class component.

card.js (Required Dependency):

This component is responsible for displaying the details of a single Pokémon.

It receives the Pokémon data and its index as props (data, index).

This is likely where any 3D hover effects or specific card styling would be implemented.

ErrorBoundary.js:

A simple React class component designed to catch JavaScript errors in its child component tree.

When an error is caught, it displays a fallback UI with a "Retry" button, which allows the user to attempt to re-render the child component. This is used to gracefully handle potential rendering issues with individual cards.

🙏 Credits

This project would not be possible without the incredible PokéAPI for providing all the Pokémon data.
