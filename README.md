# Security Content Repository

### Backend Setup

- Install python 3.9.x
- `python -m pip install -r requirement.txt` on root directory to install python dependency
- Go to `backend` directory and run `python -m venv venv` to create virtual directory
- Then go to `.\venv\Scripts\` and run `.\Activate.ps1` if you're on Windows or other activate scripts in the directory according to your OS
- Navigate back to `.\backend` directory and run `python manage.py migrate sqa` to run database migrations if not already ran before.
- Run `python .\manage.py runserver` to start the backend server
- Browse `localhost:8000` or `localhost:8000/swagger` for API documentations

### Frontend Setup
- Install latest node and npm 
- Go to `.\frontend` and run `npm install` to install dependency
- Then run `npm start` to start the frontend server
- Browse `localhost:3000` to start using the appliction.

### Backend Architecture
- Build with django rest API framework
- Database communication maintained by DJango ORM
- Default database is `sqlite` database for portability. Located at `backend\db.sqlite3`
- Databaes can be changed to other SQL database servers by modifying `DATABASE` config in `backend\backend\settings.py` file accordingly. No further code change is needed.

### Tenant
- This is a multi tenant application. Each user is mapped with a `tenantId`.
- One Tenant are pre provided now. Further tenant can be added through `swagger` or postman. TenantId needs to be provided during new user creation in `/account/sign-up` endpoint.
- Default provided Tenant Id is 2, you can see that also in the Tenant table

### Authentication

- Default creds is `username: admin, password: Edldf#dfld!`
- Additional users can be created using `/account/sign-up` endpoint in the `localhost:8000/swagger` or through postman
-  JWT Access and Refresh token is generated during login using `/token` endpoint.
- JWT are kept in the localstorage of the client for making further request. It can be improved by setting the token using Cookies in the future.


### Application Features
- **Login:** User can login using any of the pre registerred account. After login user will be presented with respective tenant data.
- **Question:** New questions can be added with predefined Category from the questions section on the left menu. Category can only be added through API now. All created questions with category and status will shown in a list. User can delete any question from the list. Modification will be gaurded using authorization accordinly in the future development.
- **Answers:** User can answer any of the non answered question for the tenant. Status will reflected in the status respectively. User can delete any answer from the list. Modification will be gaurded using authorization accordinly in the future development.
- **Search:** User can search both the questions and answers from list. Matched items will be shown accordingly.


