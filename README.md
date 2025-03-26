# University Library Project (Modified)

This is a slightly modified version of the [University Library JSM](https://github.com/adrianhajdin/university-library-jsm/tree/main) project. I followed along with the original tutorial by Adrian Hajdin and made a couple of key enhancements:

- **Functional Profile Page:** Users now have access to a functional profile page showing their borrowed books.
- **Onboarding Emails via Node Mailer:** Instead of using Resend, this version uses Node Mailer. This means you don’t need your own domain to send onboarding emails, which I did not have access to. For my own deployed version, I used GMail.

The project is deployed on Vercel and is designed to be simple to set up, extend, and deploy.
## Tech Stack

- Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Resend
- Tailwind CSS
  
---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Open-source Authentication: Personalized onboarding flow with email notifications.
- Home Page: Highlighted books and newly added books with 3D effects.
- Library Page: Advanced filtering, search, and pagination for book discovery.
- Book Detail Pages: Availability tracking, book summaries, videos, and suggestions for similar books.
- Profile Page: Manage accounts, track borrowed books, and download receipts.
- Onboarding Workflows: Automated welcome emails when users sign up, with follow-ups based on inactivity or activity dates.
- Borrow Book Reminder: Customized email notifications sent before, on, and after the due date, reminding users to return books or avoid charges.
- Borrow Book Receipt: Automatically generates a customized PDF receipt when a book is successfully borrowed.
- Analytics Dashboard: Statistics, new users, books, borrow requests, and more.
- All Users Page: View and manage users, including approving or revoking access.
- Book Management Forms: Add new books and edit existing entries.
- Book Details Page: Detailed book information for administrators.
- Borrow Records: Complete borrow history with pagination and search.
- Role Management: Change user roles to invite more admins, with email notifications sent upon role updates.
- Advanced Functionalities: Caching, rate-limiting, DDoS protection, and custom notifications.
- Database Management: Postgres with Neon for scalable and collaborative database handling.
- Real-time Media Processing: ImageKit for image and video optimization and transformations.
- Efficient Caching: Upstash Redis for caching, workflows, and triggers.
- Database ORM: Drizzle ORM for simplified and efficient database interactions.
- Modern UI/UX: Built with TailwindCSS, ShadCN, and other cutting-edge tools.
- Technology Stack: Next.js with TypeScript for scalable development, and NextAuth for robust authentication.
- Seamless Email Handling: Nodemailer for automated email communications, including notifications and updates.

---

## Demo

You can view the live demo of the project here:
[[https://university-library-eight-eosin.vercel.app/](https://university-library-eight-eosin.vercel.app/)]

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jeremyflim/university-library.git
   ```

2. **Install Dependencies**

   Navigate to the project. Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

---

## Configuration

Create a `.env` file in the root directory and add the following environment variables. Adjust the values as needed:

```env
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

NEXT_PUBLIC_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

QSTASH_URL=
QSTASH_TOKEN=

MAIL_USER=
MAIL_PASSWORD=
```

Run `npx auth secret` to generate AUTH_SECRET

---

## Running Locally

To start the development server, run:

```bash
npm run dev
```

This will launch the project locally at [http://localhost:3000](http://localhost:3000).

---

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your changes to your GitHub repository.
2. Import your repository into Vercel.
3. Set the required environment variables in the Vercel dashboard.
4. Deploy your project.

For more detailed instructions, please refer to the [Vercel documentation](https://vercel.com/docs).
