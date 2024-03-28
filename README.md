# Tutorverse Web Application

## Overview
Tutorverse is a web application designed for college students to connect with peers who are experts in various skills. Built using Node.js, Express, EJS, JWT, and PostgreSQL, the application facilitates an interactive platform where students can find and interact with tutors within their college. The database is hosted on AivenDB, and the application is deployed on Heroku.

## Live Demo

Experience Tutorverse in action: [Tutorverse Live](https://tutor-verse-bf8239c97f1d.herokuapp.com/)


## Features

- **Peer Tutoring:** Students can search for tutors in their college who are experts in specific skills.
- **Become a Tutor:** Students can apply to become tutors. Their applications are verified by faculty members, after which their profiles become searchable if accepted.
- **Skill Management:** Students and tutors can list the skills they are proficient in, enhancing their profiles and helping in better matchmaking.
- **Faculty Involvement:** Faculty members can verify tutor applications and monitor the tutoring activities within their departments.
- **Ratings and Feedback:** Students can rate and provide feedback for the tutors, ensuring a quality learning experience.

## How It Works

1. **Registration and Login:** Both students and faculty need to register and log in to access the application's features.
2. **Applying as a Tutor:** Students wishing to become tutors can apply through the platform, providing details of their skills and experience.
3. **Verification Process:** Faculty members review tutor applications and verify or reject them based on set criteria.
4. **Searching Tutors:** Students can search for tutors by skill, view their profiles, and request tutoring sessions.
5. **Skill Listing:** Users can add or update the list of skills in their profiles, showcasing their expertise.

## Future Enhancements

- Support for tutors to be associated with multiple skills.
- Advanced search and filter options to enhance the user experience.
- Integration with academic records to automate some aspects of the verification process.

## Technical Stack

- **Frontend:** EJS
- **Backend:** Node.js, Express
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** PostgreSQL (Hosted on AivenDB)
- **Deployment:** Heroku

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CoderLovely08/TutorVerse.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TutorVerse
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the `.env` file based on `.env.sample` provided in the repository.
5. Start the server:
   ```bash
   npm start
   ```
6. Database schema
 - To view the database schema, please visit the following link: [Tutoring System DB Schema](https://drawsql.app/teams/lovelys-team/diagrams/tutoring-system).
## Contribution

Contributions are welcome! If you have suggestions or want to improve the application, please fork the repository and submit a pull request with your changes.

## License

Tutorverse is licensed under the MIT License. See the LICENSE file for more details.