```bash
# get all ads
curl http://localhost:3001/

# delete an ad
ID=123
curl -X DELETE http://localhost:3001/$ID

# insert a new ad
curl -X POST -H 'Content-Type: application/json' -d '{
  "title": "Pizza",
  "price": 10.5
}' http://localhost:3001/

# update an ad
ID=123
curl -X PUT -H 'Content-Type: application/json' -d '{
  "price": 12.5
}' http://localhost:3001/$ID
```
