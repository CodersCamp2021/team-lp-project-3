# Rating

> ## **PUT** `/rate`

Creates new rating or updates existing one.

### **Request parameters**

| Parameter |  Type  |
| --------- | :----: |
| userId | ObjectId |
| gameId  | ObjectId |
| rating  | int |

### Example request:

```
{
    "userId": "6230d1efc7cf775edc5edd2d",
    "gameId": "6221f7b42c5227347bac7594",
    "rating": 1
}
```

### Example response:

- Success - `Code: 200`

```
{
    "message": "Rating updated."
}
```

- Failure - `Code: 400`

```
{
    "error": "Game not found."
}
```

> ## **GET** `/rate`

Returns the rating given by the user for a given game.

### **Request parameters**

| Parameter |  Type  |
| --------- | :----: |
| userId | ObjectId |
| gameId  | ObjectId |

### Example request:

```
{
    "userId": "6230d1efc7cf775edc5edd2d",
    "gameId": "6221f7b42c5227347bac7594",
}
```

### Example response:

- Success - `Code: 200`

```
{
    "rating": 1
}
```

- Failure - `Code: 400`

```
{
    "error": "User not found."
}
```

> ## **GET** `/rate/count`

Returns how many people liked / disliked the game.

### **Request parameters**

| Parameter |  Type  |
| --------- | :----: |
| gameId  | ObjectId |

### Example request:

```
{
    "gameId": "6221f7b42c5227347bac7594"
}
```

### Example response:

- Success - `Code: 200`

```
{
    "likes": 192,
    "dislikes": 37
}
```

- Failure - `Code: 400`

```
{
    "likes": 0,
    "dislikes": 0
}
```