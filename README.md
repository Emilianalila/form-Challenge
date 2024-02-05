form1:

#Step 1

Create a new project with the following files
- index.html
- app.js

Create a form with the following fields
- Input with first name
- Input with last name
- Text area for comments
- Checkbox to subscribe to a newsletter
- Input for an email
- Submit button

  # Step 2

- Disable the submit button initially
- The button should only be enabled if:
- First name and last name have at least 1 letter in the text box
- Hide the input for an email initially
- The input for email should be displayed if
- The checkbox is checked
    
  # Step 3

  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  https://jsonplaceholder.typicode.com/

- After clicking submit
- Make a POST request to https://jsonplaceholder.typicode.com/users
- The request object should follow this structure { firstName, lastName, isSubscribed, email, comment }
- The email property should only be sent IF they have checked the box to subscribe
- If the request is successful
- Display a success message that disappears after 2 seconds (e.g. ‘Thanks for your submission <FirstName>’
- Clear all form fields
- If the request is NOT successful
- Display a failure message (e.g. ‘Oops something went wrong’)
- Do NOT clear all fields
        
            
                
                
    
