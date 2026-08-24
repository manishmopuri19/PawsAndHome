# PawsAndHome

A community platform to help people report, rescue, and adopt stray animals. PawsAndHome connects members of the public with NGOs and volunteers so stray animals get faster help, proper care, and permanent homes.

## Why this exists (Motive & Importance)

Stray animals often suffer from injury, illness, hunger, and neglect. Many well-intentioned people want to help but don't have an easy channel to report animals or coordinate with shelters and adoption volunteers. PawsAndHome reduces friction by providing:

- A simple public front-end for reporting stray animals and sharing details/photos.
- A backend API for managing pets, adoption requests, stray reports, and documents.
- Dashboards for users and NGOs to review reports, manage adoption workflows, and communicate.
- Tools for connecting potential adopters with animals that need homes.

By making reporting and adoption easier and more transparent, the project helps reduce animal suffering, speeds up rescues, and increases the number of successful adoptions.

## Features

- User authentication (sign-up / sign-in)
- Create / list pet profiles (photos, description, status)
- Report stray animals (location, description, photos)
- Submit and manage adoption requests
- User dashboard and NGO dashboard for managing posts, requests, and documents
- Document uploads (e.g., vet records, adoption forms) integrated with a cloud storage provider
- Contact form for inquiries and support
- Static front-end pages for browsing pets, reporting, and NGO interactions

(Controller and model names in the backend show the above features: authController, petController, docController, userDashboardController, models such as pets.js, strayReport.js, adoptionRequests.js, documents.js, users.js, and routers for auth, pets, contact, docs, users.)

## Stack

- Language(s): JavaScript, HTML, CSS
- Backend: Node.js / Express (Rest API)
- Frontend: Static HTML/CSS pages (FrontEnd folder)
- Notable components: Cloudinary integration for uploads, Redis config present, MongoDB (database config), JWT-based auth (inferred from auth files)

## Project structure (top-level)

```
BackEnd/              # Node.js backend (API, models, controllers, routers)
  src/
    app.js
    index.js
    config/           # database, cloudinary, redis configuration
    controllers/      # authController.js, petController.js, docController.js, etc.
    model/            # pets.js, users.js, strayReport.js, adoptionRequests.js, documents.js
    routers/          # authRouter.js, petRouter.js, docRouter.js, contactRouter.js, userRouter.js
FrontEnd/             # Static front-end pages (HTML, CSS, simple JS)
  index.html
  home.html
  pets.html
  reportstray.html
  dashboard.html
  ngodashboard.html
  contact.html
  createpost.css
  style.css
README.md              # this file
package.json           # root package file
package-lock.json
node_modules/
```

How it fits together:
- The FrontEnd folder contains static pages that call the backend API endpoints to list pets, submit stray reports, create posts, and contact the service.
- The BackEnd exposes REST endpoints (routers) that call controllers which use models to read/write data to the database, handle authentication, file uploads (cloudinary), and cache/session (redis).

## How to run (development)

Backend
1. Open a terminal and go to the backend folder:
   ```
   cd BackEnd
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file (example variables used by the code):
   ```
   PORT=5000
   MONGO_URI=<your-mongo-connection-string>
   JWT_SECRET=<secret-for-jwt>
   CLOUDINARY_CLOUD_NAME=<cloud-name>
   CLOUDINARY_API_KEY=<api-key>
   CLOUDINARY_API_SECRET=<api-secret>
   REDIS_URL=<redis-connection-url>
   ```
4. Start the server:
   ```
   npm start
   ```
   or (if using nodemon during development)
   ```
   npm run dev
   ```
5. Check the server logs for the host/port (usually http://localhost:5000).

Frontend
- The frontend is static HTML/CSS. You can open `FrontEnd/index.html` in your browser directly, or serve it using a simple static server:
  ```
  # from the repository root
  npx serve FrontEnd
  ```
  or
  ```
  cd FrontEnd
  python -m http.server 8080
  ```

Notes
- API endpoints are defined under `BackEnd/src/routers/`. Typical route prefixes you can expect:
  - `/api/auth` – authentication (register/login)
  - `/api/pets` – create/list/update pets
  - `/api/strays` or `/api/report` – report stray animals
  - `/api/adoption` – create/manage adoption requests
  - `/api/docs` – upload/manage documents
  - `/api/contact` – contact submissions
  - Confirm exact routes by inspecting the router files in `BackEnd/src/routers/`.

## Environment & 3rd-party services

- MongoDB (data persistence)
- Cloudinary (file/image uploads) — see `BackEnd/src/config/cloudinary.js`
- Redis (session/cache) — see `BackEnd/src/config/redisconfig.js`
- Provide API keys & connection strings in `.env` and never commit secrets to the repo.

## Contribution

Contributions are welcome. Suggested workflow:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Implement and test locally.
4. Submit a pull request with a clear description and screenshots if applicable.

Guidelines:
- Keep commits focused and well-described.
- Add tests or manual testing steps for new functionality.
- Follow existing code style and file organization.

## Security & privacy

- Do not commit secrets or API keys. Use `.env` and add it to `.gitignore`.
- Validate user-supplied content (file uploads, text) in the backend.
- Store minimal personal data and handle it responsibly.

## Roadmap / Ideas

- Add a single-page React front-end to replace static HTML for better UX.
- Improve search/filtering for pets (by location, type, age).
- Add notifications (email / SMS) for adoption request status updates.
- Add moderation tools for NGOs to vet reports before publishing.

## Contact

If you have questions or want to help:
- Open an issue describing what you'd like to work on.
- Use the contact form in the FrontEnd / BackEnd contact route to send messages to the maintainers (or add a GitHub Discussions / Issues page).

---

Thank you for working on PawsAndHome — it’s a meaningful project that can make a real difference for animals and communities. If you want, I can also:
- Convert this README into a commit to add it to the repo, or
- Expand any section (installation examples, API reference, contribution checklist).
