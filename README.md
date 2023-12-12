# codetest
Backend code test
# Coding Test API Endpoint Docs

When making a POST request to create a new user, the required parameters include `username`, `password`, `email`, and an optional parameter `currency`. If the `currency` parameter is not provided during registration, the default currency will be set to USD. For transactions, the expected fields include `amount`, `trans_type`, and `recipient`. Additionally, there is an optional field called `trans_description`. In terms of transactions, the `amount` represents the transaction amount, `trans_type` can be either "deposit" or "transfer," and the `recipient` field should contain the username if the recipient is a user within the system. If the recipient is not a system user, any other identifier can be used. It's important to note that when performing transactions, the `trans_description` field is optional and can be used to provide additional details about the transaction.

MySQL script can be found in `db.sql` file. Connection strings samples can be found in `env.example` file. Please recreate a dot `.env` file with the required parameters.

## Endpoints

### Registration

- **URL**: `http://[url]:[port]/users`
- **JSON Data Sample**:
  ```json
  {
    "username": "alfa",
    "password": "toor",
    "email": "alfa@gmail.com",
    "currency": "GHC"
  }


Login
- **URL**: http://[url]:[port]/users/authenticate
- **JSON Data Sample**:
   ```json
   {
      "email": "cdc@gmail.com",
      "password": "toor"
    }


Logout
- **URL**: http://[url]:[port]/users/logout
Get Wallet Info
- **URL**: http://[url]:[port]/wallet/[user_id]
Transactions
- **URL**: http://[url]:[port]/transactions
Deposit
- **JSON Data Sample**:
    ```json
        {
          "amount": 58,
          "trans_type": "deposit"
        }
    
    ```
    Transfer
- **JSON Data Sample**:

    ```json
      {
        "amount": 58,
        "trans_type": "transfer",
        "recipient": "alfa"
      }

    ```

    View Transactions
    URL: http://[url]:[port]/transactions
    Please note, I am using a table for idempotency tracking. Wanted to use Redis, but hope this will be acceptable for now.