# Prompt-AI

[![React](https://img.shields.io/badge/React-18.2.0-whitesmoke?style=flat&logo=react&logoColor=white&logoSize=auto&labelColor=blue)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript&logoColor=blue&logoSize=auto&labelColor=whitesmoke)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.x-blue?style=flat&logo=tailwindcss&logoColor=blue&logoSize=auto&labelColor=black)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-%23589636?style=flat&logo=mongodb&logoColor=%23589636&logoSize=amg&labelColor=whitesmoke)](https://www.mongodb.com/lp/cloud/atlas/try4?utm_content=controlhterms&utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-pl_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624548&adgroup=115749720623&cq_cmp=12212624548&gad_source=1&gclid=Cj0KCQjw5ea1BhC6ARIsAEOG5pxTAlQ4bkZdAZuggDCcisw-xncyF4Lij1j2P8vsXqWClLK9sFuTyoUaAr0REALw_wcB)

Prompt-AI is a Full Stack Web application built with Next.js and MongoDB capable of performing CRUD Operations. Users can manage their profiles and prompts through an intuitive interface. This application uses Google authentication and is designed to be responsive across various screen sizes.

Deplloyed: [Prompts-AI](https://prompts-ai-ghx7.vercel.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Managing Prompts](#managing-prompts)
  - [Profile](#profile)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Google Authentication**: Sign in using Google accounts.
- **CRUD Operations**: Create, read, update, and delete prompts.
- **Responsive Design**: Optimized for medium and small screen sizes.
- **Profile Management**: Users can view and manage their prompts from their profile.
- **Explore**: Explore and visit other user's profile and see their Prompts.
- **Search**: Search or Click on Prompt Tags to view specific topic you are interrested in.
- **Real-Time Updates**: Fetch and update data dynamically with client-side and server-side operations.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **MongoDB**: NoSQL database to store prompts and user data.
- **Mongoose**: MongoDB object modeling tool.
- **NextAuth.js**: Authentication library for Next.js.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Installation

### Prerequisites

- Node.js (v16 or later)
- MongoDB instance (local or hosted)

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/itssodope01/Prompts-AI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Prompts-AI
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following environment variables. Replace the placeholder values with your actual credentials.

   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGODB_URI=your-mongodb-uri
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_URL_INTERNAL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

6. Run database migrations (if needed):
   Ensure your MongoDB schema is up-to-date. This can be done through the application or manually using Mongoose.

## Usage

### Authentication

Users can sign in using Google accounts. Ensure you have configured the Google OAuth credentials correctly in your Google Cloud Console and added the credentials to the `.env.local` file.

### Managing Prompts

- Create a Prompt: Navigate to the prompt creation page and fill out the form.
- Edit a Prompt: On the profile page, click the "Edit" button next to a prompt to modify it.
- Delete a Prompt: Click the "Delete" button next to a prompt to remove it.

### Profile

Users can view and manage their prompts from their profile page. The profile page shows a list of prompts associated with the user's account.

## API Routes

The application includes the following API routes:

- `GET /api/prompt/:id`: Fetch a prompt by its ID.
- `PATCH /api/prompt/:id`: Update a prompt by its ID.
- `DELETE /api/prompt/:id`: Delete a prompt by its ID.
- `GET /api/users/:userId/posts`: Fetch all prompts created by a specific user.
- `POST /api/prompt/new`: Create a new prompt. Example implementation:

  ```javascript
  export const POST = async (req) => {
    try {
      const { userID, prompt, tag } = await req.json();
      await connectToDB();
      const newPrompt = new Prompt({
        creator: userID,
        prompt,
        tag,
      });
      await newPrompt.save();
      return NextResponse.json(
        { message: "Prompt created", prompt: newPrompt },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  };
  ```

## Contributing

If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Open a pull request with a description of the changes you have made.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Acknowledgements

- Next.js Documentation: [Next.js](https://nextjs.org/docs)
- MongoDB Documentation: [MongoDB](https://www.mongodb.com/docs/)
- Mongoose Documentation: [Mongoose](https://mongoosejs.com/docs/guide.html)
- NextAuth.js Documentation: [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- Tailwind CSS Documentation: [Tailwind](https://tailwindcss.com/docs/installation)
