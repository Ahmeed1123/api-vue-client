# Vue API Frontend Project

A modern frontend project built with **Vue 3** and **TypeScript**, designed to be fast, responsive, and maintainable.

## 🛠 Technologies Used

This project is built using the latest technologies for 2025:

- **Core Framework:** [Vue 3](https://vuejs.org/) (Composition API & Script Setup)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Shadcn-vue](https://www.shadcn-vue.com/) / [Reka UI](https://reka-ui.com/)
- **Icons:** [Hugeicons](https://hugeicons.com/)
- **Animations:**
  - `motion-v`
  - `gsap`
  - `@formkit/auto-animate`
- **Form Handling & Validation:** [Vee-Validate](https://vee-validate.logaretm.com/v4/) & [Zod](https://zod.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Notifications:** [Vue Sonner](https://vue-sonner.vercel.app/)

## 🚀 Installation & Setup

Follow these steps to set up and run the project locally.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18 or later)
- A package manager like `npm`, `pnpm`, or `yarn`.

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd resources/vue-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # OR
   yarn install
   # OR
   pnpm install
   ```

3. **Environment Configuration:**
   Ensure a `.env` file exists if necessary, or copy `.env.example` and adjust the variables to match your API configuration.

## ⚠️ Important Configuration

**Before running the frontend, you must ensure the backend is running correctly:**

1. **Start Laravel Server:**
   Run this command in the Laravel root directory:
   ```bash
   php artisan serve --host=localhost --port=8000
   ```
   **Verify:** Ensure the backend is accessible at: `http://localhost:8000/`

2. **Frontend Port:**
   The Vue app must run on port **3000** for CORS/API communication to work properly.


## 💻 Running Commands

- **Development Mode:**
  To run the project locally with Hot Module Replacement (HMR):
  ```bash
  npm run dev -- --port 3000
  ```
  The URL will be: `http://localhost:3000`

- **Type Check:**
  To verify TypeScript types:
  ```bash
  vue-tsc -b
  ```

- **Build for Production:**
  To generate the production build for deployment:
  ```bash
  npm run build
  ```

## 📅 Project Info

- **Year:** 2025
- **Version:** 1.0.0
