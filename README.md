# Time Slot Booker

This is a full-stack application that allows users to book time slots, ensuring there are no conflicts with existing
bookings in the system or with events in the
user's Google Calendar. The project was developed as a technical assessment for a Full Stack Developer position.

## ✨ Key Features

* **Google OAuth 2.0 Authentication:** Secure user login and authorization via Google accounts.
* **Booking Management:** A complete interface to create, view, and cancel time slot bookings.
* **Dual Conflict Resolution:** Prevents double bookings by checking against:
    1. All existing bookings in the local database.
    2. Events in the user's primary Google Calendar.
* **Dark Mode:** A theme selector for a personalized user experience.
* **Toast Notifications:** Provides clear feedback on the status of API requests.

## 🛠️ Tech Stack

* **Backend:**
    * **Framework:** NestJS https://nestjs.com/
    * **Database:** PostgreSQL https://www.postgresql.org/ with Prisma https://www.prisma.io/
    * **Authentication:** JWT-based with Google OAuth 2.0
* Frontend:
    * **Framework:** React https://react.dev/ with Vite https://vitejs.dev/
    * **Routing:** TanStack Router https://tanstack.com/router/
    * **Styling:** Tailwind CSS https://tailwindcss.com/ with shadcn/ui https://ui.shadcn.com/
    * **State Management:** Zustand https://zustand-demo.pmnd.rs/ & TanStack Query https://tanstack.com/query/

## App functionality walkthrough

Here's a small video that introduces the application functionality and expected behavior: [designli-tech-test-walkthrough.mp4](https://drive.google.com/file/d/1RvmaGip_f4LvoKrlHhsBW4Fv8qWGG5LH/view?usp=sharing)
