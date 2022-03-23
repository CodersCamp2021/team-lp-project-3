# Games

> ## **POST** `/games`

Creates new game.

### **Request parameters**

| Parameter              |   Type   |
| ---------------------- | :------: |
| title                  |  string  |
| category               |  string  |
| description            |  string  |
| platform               | string[] |
| developer              |  string  |
| releaseDate (optional) |   date   |
| cover (optional)       |  string  |

### Example request:

```
{
	"title": "CS:GO",
	"category": "Shooter",
	"description": "FPS game",
	"platform": ["PC", "PS4", "XBOX ONE"],
	"developer": "Valve",
	"releaseDate": "2015-12-12",
	"cover": "https://images.igdb.com/igdb/image/upload/t_cover_big/co271e.jpg"
}
```

### Example response:

- Success - `Code: 200`

```
{
	"message": "Successfully created game with id 6221ed4c0937d3359e1f53aa"
}
```

- Failure - `Code: 400`

```
{
	"message": "Game called CS:GO already exists"
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
		"platform": ["PC"],
		"developer": "Valve",
		"releaseDate": "2015-12-12T00:00:00.000Z",
		"cover": "https://images.igdb.com/igdb/image/upload/t_cover_big/co271e.jpg",
		"rating": 0,
		"ratedBy": []
		"__v": 0
	},
	{
		"_id": "622130075a4dc7551a3ebe99",
		"title": "Minecraft",
		"category": "Sandbox",
		"description": "Family friendly game",
		"platform": ["PC", "XBOX ONE"],
		"developer": "Mojang",
		"releaseDate": "2011-12-12T00:00:00.000Z",
		"cover": "https://images.igdb.com/igdb/image/upload/t_cover_big/co271e.jpg",
		"rating": 2,
		"ratedBy": [ObjectId("621eb71fac4e3d58a5c6c668")]
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
	"platform": ["PC"],
	"developer": "Valve",
	"releaseDate": "2015-12-12T00:00:00.000Z",
	"cover": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3r51.jpg",
	"rating": 1,
	"ratedBy": [
		ObjectId("621eb71fac4e3d58a5c6c668"),
		ObjectId("62212cb188774cbc391a3950"),
	]
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

| Parameter   |   Type   |
| ----------- | :------: |
| title       |  string  |
| category    |  string  |
| description |  string  |
| platform    | string[] |
| developer   |  string  |
| releaseDate |   date   |
| cover       |  string  |

### Example request:

**PUT**:`http://placeholder.com/games/62212e715a4dc7551a3ebe94`

```
{
    "title": "CS:Global Offensive",
    "platform": ["PS5"]
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
	"platform": ["PS5"],
	"developer": "Valve",
	"releaseDate": "2015-12-12T00:00:00.000Z",
	"cover": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1yvf.jpg",
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
	"message": "Successfully deleted game with id 62212e715a4dc7551a3ebe94"
}
```

- Failure - `Code: 400`

```
{
	"message": "Game with id: 62212e715a4dc7551a3ebe94 does not exists"
}
```
