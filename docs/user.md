# User

> ## **POST** `/user/register`

Registers a new user in the DB.

### **Request parameters**

| Parameter |  Type  |
| --------- | :----: |
| firstName | string |
| lastName  | string |
| username  | string |
| email     | string |
| password  | string |

### Example request:

```
{
    "firstName": "John",
    "lastName": "Doe",
    "username": "JohnUndefined",
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

### Example response:

- Success - `Code: 200`

```
{
    {
    "firstName": "John",
    "lastName": "Doe",
    "username": "JohnUndefined",
    "email": "john.doe@gmail.com",
    "password": "[HashedPassword]",
    "type": "user",
    "ratings": [],
    "_id": "[MongooseId]",
    "createdOn": "2022-03-03T21:01:37.531Z",
    "__v": 0
   }
}
```

- Failure - `Code: 400`

```
{
    "errors": [
        {
            "value": "test132",
            "msg": "Username already in use.",
            "param": "username",
            "location": "body"
        },
        {
            "value": "k.testetestse@gmail.com",
            "msg": "E-mail already in use.",
            "param": "email",
            "location": "body"
        }
    ]
}
```

> ## **POST** `/user/login`

Creates a session with user for 24 hours.

### **Request parameters**

| Parameter |  Type  |
| --------- | :----: |
| email     | string |
| password  | string |

### Example request:

```
{
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

### Example response:

- Success - `Code: 200`

```
{
    "message": "Logged in successfully."
}
```

- Failure - `Code: 404`

```
{
    "error": "User with this email does not exist."
}
```

> ## **POST** `/user/logout`

Removes a session created with user. To access some data you need to log in again.

### Example response:

- Success - `Code: 200`

```
{
    "message": "Logged out successfully."
}
```

> ## **PUT** `/user/changeEmail/:userId`

Allows user to change email.

### **Request parameters**

| Parameter |  Type  |
| --------- | :----: |
| email     | string |
| password  | string |

### Example request:

```
{
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

### Example response:

- Success - `Code: 200`

```
{
    message: 'E-mail successfully updated.'
}
```

- Failure - `Code: 400`

```
{
    message: 'Email has been taken.'
}
```

> ## **PUT** `/user/changePassword/:userId`

Allows user to change password.

### **Request parameters**

| Parameter            |  Type  |
| -------------------- | :----: |
| password             | string |
| newPassword          | string |
| passwordConfirmation | string |

### Example request:

```
{
    "password": "password",
    "newPassword": "testPass"
    "passwordConfirmation": "testPass"
}
```

### Example response:

- Success - `Code: 200`

```
{
    message: 'E-mail successfully updated.'
}
```

- Failure - `Code: 400`

```
{
    "errors":
    [
        {
            "value": "password",
            "msg": "Password confirmation does not match password.",
            "param": "passwordConfirmation",
            "location": "body"
        }
    ]
}
```
