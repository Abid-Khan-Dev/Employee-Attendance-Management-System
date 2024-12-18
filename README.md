# Employee Attendance Management System

The **Employee Attendance Management System** is a web-based application designed to help organizations manage employee attendance efficiently. The system provides separate dashboards for employees and administrators, allowing each to manage their tasks effectively.

## Features

### General Features:
- **User Authentication**: Secure login and logout for employees and administrators.
- **Responsive Design**: A mobile-friendly layout built using Bootstrap.
- **Real-Time Attendance Tracking**: Employees can mark attendance daily, and admins can track it in real-time.

### **For Employees**:
- **Employee Login**: Secure login for employees to access the attendance system.
- **Mark Attendance**: Employees can mark their attendance for each working day.
- **View Attendance Records**: Employees can view their own attendance history.
- **Dashboard**: A simple dashboard displaying the current day’s attendance status.

### **For Admins**:
- **Admin Login**: Admins can log in with special credentials to access the admin dashboard.
- **Manage Employees**: Admins can add, update, or delete employee records.
- **Attendance Reports**: Admins can view detailed attendance records for each employee.
- **Dashboard**: A comprehensive overview of all employees and their attendance data.


## Dependencies

This project requires the following dependencies:

- **express**: Web framework for building the backend API.
- **mongoose**: MongoDB object modeling for Node.js.
- **passport** & **passport-local**: Authentication middleware for user login.
- **bcrypt** & **bcryptjs**: For securely hashing passwords.
- **dotenv**: Loads environment variables from the `.env` file.
- **ejs**: Templating engine for rendering views.
- **express-session**: For managing user sessions.
- **connect-flash**: For flash messages during user interactions.


## Installation

### Prerequisites:
- [Node.js](https://nodejs.org/) (for running the backend)
- [MongoDB](https://www.mongodb.com/) (for storing employee and attendance data)
- [npm](https://www.npmjs.com/) (for installing project dependencies)

### Steps to Set Up Locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Abid-Khan-Dev/Employee-Attendance-Management-System.git
    ```

2. **Navigate into the project directory**:
    ```bash
    cd Employee-Attendance-Management-System
    ```

3. **Install dependencies**:
    Run the following command to install all necessary dependencies:
    ```bash
    npm install
    ```

4. **Set up your environment**:
    - Create a `.env` file in the root directory (this file will store your environment variables like database connection string, JWT secret, etc.).
    - Example `.env` file:
    ```bash
    PORT=5000
    JWT_SECRET=secretkey@123
    MONGO_URI=mongodb://localhost:27017/eams
    SESSION_SECRET=sessionkey@123
    ```

5. **Start the application**:
    To run the app locally, use the following command:
    ```bash
    npm start
    ```

6. **Access the app**:
    Open a browser and go to `http://localhost:5000` to access the app.

---

## Usage

- **For Employees**:
  - Log in using your credentials.
  - Mark your attendance daily using the button on the dashboard.
  - View your attendance history with a detailed record of each day's status.

- **For Admins**:
  - Log in with admin credentials to manage employee data.
  - View and manage attendance records for all employees.
  - Generate reports for attendance tracking and analysis.

---

## Contributing

We welcome contributions to improve the project! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Bootstrap for the responsive design.
- [MongoDB](https://www.mongodb.com/) for the database.
- [Express.js](https://expressjs.com/) for building the backend API.
- [Passport.js](http://www.passportjs.org/) for user authentication.

---

Feel free to reach out if you have any questions or need help with setting up the project. Happy coding!
