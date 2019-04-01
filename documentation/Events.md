# Application Events

Documentation detailing events emitted by either the client or the server. Events emitted by socket.io are not included

### Client events

###### req_register_user

Request user registration

##### req_login_user

Request user login when registration already exists in client

###### req_logout_user

Request logout of user

###### req_users

Request the list of logged in users

###### req_rooms

Request the list of available rooms

###### req_send_message

Request the sending of a new message

<!-- ============ -->

### Server events

###### connection_created

Event sent when a new connection is initially created

###### register_user_success

Request to register user was successful

###### register_user_failed

Request to register user failed, contains error message

###### logout_user_success

Request to logout user was successful

###### logout_user_failed

Request to logout user failed

###### send_message_success

Request to send new message was successful

###### send_message_failed

Request to send new message failed

###### push_new_message

Push a new message to all clients connected to the room the message was posted in

###### push_users

Push the list of logged in users to clients

###### push_rooms

Push the list of rooms available to each client to all connected clients
