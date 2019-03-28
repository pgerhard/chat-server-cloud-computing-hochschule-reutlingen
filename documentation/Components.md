# Components

## Frontend Components

### Services

- Chat Service
  - Description: Handle sending of chat messages between client and server
  - Interfaces:
    - SendMessage
    - GetMessages
  - Requires:
    - Socket.io
- User Service
  - Description: Handle logging in of user in client. Can also retrieve all the logged in users from the backend
  - Interfaces
    - RetrieveLoggedInUser: Load the user currently logged into the client
    - LogInUser: Log in a new user
  - Requires:
    - Socket.io

### UI Components

- Chat Component
  - Description: Component to display the Chat Message Component and the list of available chat rooms
  - Provides:
    - Methods to display UI
  - Requires
    - UserService
- Chat Message Component
  - Description: Component to handle the displaying and sending of chat messages
  - Provides:
  - Methods to display UI
  - Requires:
    - ChatService
- Login Component
  - Description: Handle logging in of the user
  - Provides:
    - Methods to display UI
  - Requires:
    - UserService

## Backend Components

- Server
