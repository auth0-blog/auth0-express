```bash
npm start

curl -X POST -H 'Authorization: Bearer '$TOKEN -H 'Content-Type: application/json' -d '{
  "title": "Deserved Vacation",
  "days": 60
}' http://localhost:3001/vacations
```
