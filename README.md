# CodersCamp 2021 - Team: Łukasz Powązka

## Project 3: Node.js

**Mentor**: [Łukasz Powązka](https://github.com/lukiq)

**Team members**:

- [Patryk Brodziak](https://github.com/patrykbrodziak1)
- [Jakub Czerwiński](https://github.com/kubaczerwinski77)
- [Huber Grobelny](https://github.com/Burbinox)
- [Maciej Jankowski](https://github.com/macjank)
- [Krzysztof Prońko](https://github.com/Ruud1990)
- [Paweł Stępień](https://github.com/pastepi)

# API usage

## Introduction

Welcome to our API documentation. Here you can find all endpoints we provide, described in detail so that you can quickly and easily find what you need.

## HTTP status codes summary

- `400` - your request is incorrect, probably you have passed inproper argument. Check them out and try again.
- `404` - not found, you are trying to reach resource that does not exist.
- `500` - internal server error, let us know, we are probably already working on it.

# User

> ## **POST** `/register`

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

> ## **POST** `/login`

Authenticates user and assigns a JWT Token.

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
[JWT Token]
```

- Failure - `Code: 404`

```
{
    message: 'User with this email does not exist.'
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


# Games

> ## **POST** `/games`

Creates new game.

### **Request parameters**

| Parameter   |  Type  |
| ----------- | :----: |
| title       | string |
| category    | string |
| description | string |
| platform    | string |
| developer   | string |
| releaseDate |  date  |

### Example request:

```
{
    "title": "CS:GO",
    "category": "Shooter",
    "description": "FPS game",
    "platform": "PC",
    "developer": "Valve",
    "releaseDate": "2015-12-12"
}
```

### Example response:

- Success - `Code: 200`

```
{
      message: `Successfully created game with id 62212e715a4dc7551a3ebe94`,
    }
```

- Failure - `Code: 400`

```
{
	"message": "Game title already exist"
}
```

> ## **GET** `/games`

Gets all games saved in database.

### Example response:

- Success - `Code: 200`

```
[
	{
		"_id": "62212e715a4dc7551a3ebe94",
		"title": "CS:GO",
		"category": "Shooter",
		"description": "FPS game",
		"platform": "PC",
		"developer": "Valve",
		"releaseDate": "2015-12-12T00:00:00.000Z",
		"__v": 0
	},
	{
		"_id": "622130075a4dc7551a3ebe99",
		"title": "Minecraft",
		"category": "Sandbox",
		"description": "Family friendly game",
		"platform": "PC",
		"developer": "Mojang",
		"releaseDate": "2011-12-12T00:00:00.000Z",
		"__v": 0
	}
]
```

- Failure - `Code: 500`

```
{
	"message": "Internal Server Error"
}
```

> ## **GET** `/games/:gameId`

Gets information about game that matches `gameId` from URL params.

### **Request parameters**

| Parameter |     Type      |
| --------- | :-----------: |
| gameId    | URL Parameter |

### Example request:

**GET**:`http://placeholder.com/games/62212e715a4dc7551a3ebe94`

### Example response:

- Success - `Code: 200`

```
{
	"_id": "62212e715a4dc7551a3ebe94",
	"title": "CS:GO",
	"category": "Shooter",
	"description": "FPS game",
	"platform": "PC",
	"developer": "Valve",
	"releaseDate": "2015-12-12T00:00:00.000Z",
	"__v": 0
}
```

- Failure - `Code: 400`

```
{
	"message": "Game with id: 62212e715a4dc7551a3ebe94 does not exists"
}
```

> ## **PUT** `/games/:gameId`

Updates information about game that matches `gameId` from URL params with data passed in request **body**.

### **Request parameters (optional)**

| Parameter   |  Type  |
| ----------- | :----: |
| title       | string |
| category    | string |
| description | string |
| platform    | string |
| developer   | string |
| releaseDate |  date  |

### Example request:

**PUT**:`http://placeholder.com/games/62212e715a4dc7551a3ebe94`

```
{
    "title": "CS:Global Offensive",
    "platform": "PS5"
}
```

### Example response:

- Success - `Code: 200`

```
{
	"_id": "62212e715a4dc7551a3ebe94",
	"title": "CS:Global Offensive",
	"category": "Shooter",
	"description": "FPS game",
	"platform": "PC",
	"developer": "PS5",
	"releaseDate": "2015-12-12T00:00:00.000Z",
	"__v": 0
}
```

- Failure - `Code: 400`

```
{
	"message": "Game with id: 62212e715a4dc7551a3ebe94 does not exists"
}
```

> ## **DELETE** `/games/:gameId`

Deletes game that matches `gameId` from URL params.

### **Request parameters (optional)**

| Parameter |    Type    |
| --------- | :--------: |
| gameId    | URL Params |

### Example request:

**DELETE**:`http://placeholder.com/games/62212e715a4dc7551a3ebe94`

### Example response:

- Success - `Code: 200`

```
{
      message: `Successfully deleted game with id 62212e715a4dc7551a3ebe94`,
    }
```

- Failure - `Code: 400`

```
{
	"message": "Game with id: 62212e715a4dc7551a3ebe94 does not exists"
}
```
