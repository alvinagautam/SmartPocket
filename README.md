SmartPocket – Smart Expense Tracker for Students

SmartPocket is a browser-based expense tracking web application designed especially for college students.
It helps users record, organize, and analyze their daily income and expenses in a simple, fast, and private way — without any signup or backend.

The application is built entirely using HTML, CSS, and Vanilla JavaScript and runs fully on the client side using DOM manipulation and LocalStorage.

🧩 Problem Statement

Many college students struggle to track small but frequent daily expenses such as food, travel, books, and personal spending.
As a result, money is often spent without clearly knowing where it went.

SmartPocket solves this problem by providing:

A clean and intuitive interface to add income and expenses

Easy tracking of daily, weekly, and monthly spending

Automatic calculation of balance

Complete privacy with local data storage

✨ Features Implemented

Add Income & Expenses

Categorized transactions (Food, Travel, Education, Entertainment, etc.)

Monthly transaction tracking

Filters:

Today

This Week

All Transactions

Automatic calculation of:

Total Income

Total Expense

Current Balance

Delete transactions with confirmation

Light & Dark theme toggle

Data persistence using LocalStorage

Fully responsive UI (mobile, tablet, desktop)

Landing page with smooth scrolling and animations

Random motivational finance quotes on the home page

🧠 DOM Concepts Used

This project makes extensive use of JavaScript DOM manipulation, including:

document.createElement()

innerHTML

appendChild()

classList.add() / classList.remove() / classList.toggle()

addEventListener() for:

Click

Submit

Scroll

Keypress

Dynamic rendering of transaction cards

Conditional rendering:

Empty state

Filters

Monthly view

Styling changes through JavaScript

IntersectionObserver for scroll-based animations

Smooth navigation using scrollIntoView()

🗂 State Management

The application uses JavaScript variables to manage state:

transactions[] → Stores all income & expense records

currentMonth & currentYear → Used for month-based filtering

currentFilter → All / Today / This Week

currentTheme → Light or Dark mode

All transactions and theme preferences are stored in LocalStorage, ensuring data is preserved even after refreshing the page.

▶ How to Run the Project

Download or clone this repository

Open index.html in any modern web browser

Click Start or Continue as Guest

You will be redirected to app.html

Start adding and tracking your expenses

✅ No installation
✅ No backend
✅ No signup required

⚠ Known Limitations

No backend or cloud sync (data is device-specific)

No user authentication

Data cannot be shared between devices

These limitations are intentional, as the project is designed to be a fully client-side DOM-based web application.

📹 Demo Video

A demo video showcasing all features, UI interactions, and DOM updates has been provided as part of the project submission.

🧑‍💻 Developer

Developed as a Web Development Final Project using:

HTML

CSS

Vanilla JavaScript

DOM APIs

LocalStorage
