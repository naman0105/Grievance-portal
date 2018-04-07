# Grievance-portal
This website is made for small size companies. Using this website the employee can complain anonymously. The complain will go to one of the supervisors in an random order, which then will be resolved in a given time period.

The admin module contains functionality to create the hierchy of the organization and to import excel sheets to it to fill the data in the firebase.
The main-website is hosted at :: https://ggrpdebugtest.firebaseapp.com/ or https://naman0105.github.io/Grievance-portal/Main-Website/
The admin-panel is hosted at :: https://naman0105.github.io/Grievance-portal/Admin-Panel

I am using firebase real time database to store the data and firebase otp authentication to authenticate the employee. 

Steps to use the application
1. first fill out the excel sheets according to the field in the level node given in the picture below.
2. create levels in the admin panel.
3. feed excel sheets for each level.
4. Excel sheets should be of the same format as given in the Example folder.
5. open main-website
6. click on 'login for first time'(if you have not given the password field in the excel sheets).
7. authenticate phone number.
8. you are logged inn, you can register a complain and according to the hierarchy checkout the account of the supervisor.


Given below is the structure of the firebase realtime database.

![firebase structure](https://github.com/naman0105/Grievance-portal/blob/master/2018-03-24%20(1).png)

