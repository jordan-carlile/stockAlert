# stockAlert
Alerts you when your chosen stocks fall above or below your specified range

## Built With
* Firebase Realtime Database
* IEX Cloud API
* JQuery
* Twitter Bootstrap

Hosted with github pages, [live link](https://jordan-carlile.github.io/stockAlert/) . If you want to run it locally just clone and open in your browser.

## Design Decisions:
I chose not to use a framework for this project as it seemed like a fairly simple project to build using jquery.
I chose to have all my actions be event driven, when a button is clicked then fire some action.
The process for adding a stock is as follows:



## Tradeoffs:
I chose to use firebase as my datastore which leads to an interesting trade off. Since there is only one datastore overall at this time, the state is saved across all browsers/users.
This is beneficial because a user can have their data be conistent across all browsers.
This has the potential downside that all users are able to add and remove entries to this shared datastore.


## Potential Enhancements:

### Usability:
  Row Specific Delete:
    User should be able to delete one row in the table and its corresponding data in the database.
      This would be accomplished by adding a delete button for each row.
      I would also need to add an html attribute on each row that contains the uuid of the stored firebase object to know which document to delete on the backend.

  Row Specific Check Price Update:
    User should be able to update stock information for one row in the table and its corresponding data in the database.
      This would be accomplished by adding a update button for each row.
      I would also need to add an html attribute on each row that contains the uuid of the stored firebase object to know which document to update on the backend.
  
  Adding Pagination:
    - In it's current state, the table will just become longer and longer when new stocks are added.
    - This can be resolved by adding pagination to the table.

### Security:

  Adding Authentication:
    * After adding authentication, each user should have their own stockAlert list. Currently there is only one global stockAlert list based on documents in the Firebase Realtime Database
    * In order to implement this, a user id would need to be added to the model for storing data to associate the data with a specific authenticated user.

### Scalability:

  #### Reducing Redundent Data:
    * Currently each active client will be making api calls and interacting with the datastore directly, If there ware more users this could result in redundent data.

  #### Rate Limiting:
    * Creating a backend would also allow me to implement rate limiting. In its current state a user has no limit to how often they can make api calls or store data to the datastore.
