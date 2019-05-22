# Using cloud services

1. In order to protect your service, ensure data confidentiality and integrity by using TLS channels between client and server; no end-to-end encryption required!
2. Enhance your registration dialog with a password field. The user credentials should be stored persistently and securely in a Cloud SQL database. During the login process, the provided credentials should be validated against the data stored in the database.
3. Additionally, add an upload button to the registration dialog to let users provide a profile picture and a preferred language. Use the IBM Watson “Language Translator” service to display chat messages in the selected language.
4. Having deployed and tested your enhanced chat server, add a “Vulnerability Advisor” stage to your delivery pipeline and put the results in your presentation.
   1. Since "Vulnerability Advisor" stage could not be integrated, used Mozilla Observatory instead
