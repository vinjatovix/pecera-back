db = db.getSiblingDB('pecera');
db.createUser({
  user: 'localUser',
  pwd: 'localPassword',
  roles: [{ role: 'readWrite', db: 'pecera' }]
});

db = db.getSiblingDB('test');
db.createUser({
  user: 'localUser',
  pwd: 'localPassword',
  roles: [
    { role: 'readWrite', db: 'test' }
  ]
});
