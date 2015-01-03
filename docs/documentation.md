# Documentation

## Permitted HTTP methods

| Method   | Description                       |
|----------|-----------------------------------|
| `GET`    | Get a resource or a resource list |
| `POST`   | Create a resource                 |
| `PUT`    | Update a resource                 |
| `DELETE` | Delete a resource                 |

## Response Codes

| Code  | Description |
|-------|----------------------------------------------------------------|
| `200` | Success                                                        |
| `201` | Success - New resource created                                 |
| `204` | Success - No new data to response                              |
| `400` | Bad request - The request can not evaluated                    |
| `401` | Unauthorized - The user is not authenticated for this resource |
| `404` | Not Found - The resource has not exists                        |
| `422` | Unprocessable Entity - validate errors                         |
| `429` | Limit exceed - Try again later                                 |
| `500` | Server error                                                   |
| `503` | Service not available                                          |  

More info: [RFC2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

## Request examples

### To create a new resource
* ** Request: `POST /resource` **
```js
{
	"resource": {
		"title": "A new resource"
	}
}
```
* ** Response: `201` **
```js
{
	"resource": {
		"_id": "123456789",
		"title": "A new resource"
	}
}
```

### To update an existing resource
* ** Request: `PUT /resource/:id` **
```js
{
	"resource": {
		"_id": "123456789",
		"title": "resource updated"
	}
}
```
* ** Response: `204`**
```js
{
	"resource": {
		"_id": "123456789",
		"title": "resource updated"
	}
}
```

### To get all the resources
* ** Request: `GET /resource` **

* ** Response: `200`**
```js
{
	[
		"resource": {
			"_id": "123456789",
			"title": "resource updated"
		},
		"resource": {
			"_id": "012345678",
			"title": "Another resource"
		},
		...
	]
}
```

### To get a specific resource
* ** Request: `GET /resource/012345678` **
* ** Response: `200`**
```js
{
	"resource": {
		"_id": "012345678",
		"title": "Another resource"
	}
}
```

### To remove a resource
* ** Request: `DELETE /resource/123456789` **
* ** Response: `204`**
```js
{
	"message": "resource deleted successfully"
}
```
