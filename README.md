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
The process for adding a stock is as follows:<br/>
The user clicks the "Add New Stock" button. There is a javascript event listener that will locally store the data from the form and push it to the Firebase Realtime Database. There is a javascript event listener that will run when a new stock is added. This listener will make the API call, check to see if the price falls outside the provided range (alert the user if it does not), and populate the front end table.<br/>
There are 3 scenarios when stock(s) will be updated. When a new stock is added, its price will be checked. Every 5 minutes all of the stock prices will be checked and updated in the UI. The user can manually run a stock price check on all listed stocks by clicking the "Update All Stock Prices" button.



## Tradeoffs:
I chose to use firebase as my datastore which leads to an interesting trade off. Since there is only one datastore overall at this time, the state is saved across all browsers/users.
This is beneficial because a user can have their data be conistent across all browsers.
This has the potential downside that all users are able to add and remove entries to this shared datastore.


## Potential Enhancements:

### Usability:
  Row Specific Delete:<br/>
    User should be able to delete one row in the table and its corresponding data in the database.<br/>
      This would be accomplished by adding a delete button for each row.<br/>
      I would also need to add an html attribute on each row that contains the uuid of the stored firebase object to know which document to delete on the backend.<br/>

  Row Specific Check Price Update:<br/>
    User should be able to update stock information for one row in the table and its corresponding data in the database.<br/>
      This would be accomplished by adding a update button for each row.<br/>
      I would also need to add an html attribute on each row that contains the uuid of the stored firebase object to know which document to update on the backend.<br/>
  
  Adding Pagination:<br/>
    In it's current state, the table will just become longer and longer when new stocks are added.<br/>
    This can be resolved by adding pagination to the table.<br/>

### Security:

  Adding Authentication:<br/>
    After adding authentication, each user should have their own stockAlert list. Currently there is only one global stockAlert list based on documents in the Firebase Realtime Database.<br/>
    In order to implement this, a user id would need to be added to the model for storing data to associate the data with a specific authenticated user.<br/>

### Scalability:

  Unexpected UI Updates Due To Multiple Browser Instances:<br/>
    Each browser instance has a local interval for calling the ckeckPrice function (which updates the database), other browser instances will have their UI updated as a result of this. The remedy to this would be for each user to have their own firebase reference (or portion) of the database. This would isolate users and remedy this quirk.

  Rate Limiting:<br/>
    Creating a backend would allow me to implement rate limiting. In its current state a user has no limit to how often they can make api calls or store data to the datastore.
