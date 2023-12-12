# codetest
Backend code test
post request to user params are 
  username
  password
  email
  currency(optional)

  currency type(USD or EUR) can be passed during registration. Default will USD if no currency passed

  transactions 
   expected fields amount,trans_type,recipient
    optional fields trans_description

    recipient should be username if sending to user on the system or any other if not on the system
    trans_type can be either deposit or transfer