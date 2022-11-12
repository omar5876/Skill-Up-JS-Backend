Seeders

Running Seeds

If you wish to run all seeds:

npx sequelize db:seed:all

If you wish to run a specific seed:

npx sequelize db:seed --seed file-name

Undoing Seeds

Seeders can be undone if they are using any storage. There are two commands available for that:

If you wish to undo the most recent seed:

npx sequelize-cli db:seed:undo

If you wish to undo a specific seed:

npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

If you wish to undo all seeds:

npx sequelize-cli db:seed:undo:all

Seeders contents:

---

Roles:  
 {
name: 'REGULAR',
id: 1,
},
{
name: 'ADMIN',
id: 2,
},

---

Categories:
{
name: 'OUTCOMES',
id: 1,
},
{
name: 'INCOMES',
id: 2,
},

---

Users:
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular1',
email: 'demoregular1@gmail.com',
roleId: 11,
id: 11,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular2',
email: 'demoregular2@gmail.com',
roleId: 11,
id: 12,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular3',
email: 'demoregular3@gmail.com',
roleId: 11,
id: 13,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular4',
email: 'demoregular4@gmail.com',
roleId: 11,
id: 14,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular5',
email: 'demoregular5@gmail.com',
roleId: 11,
id: 15,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular6',
email: 'demoregular6@gmail.com',
roleId: 11,
id: 16,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular7',
email: 'demoregular7@gmail.com',
roleId: 11,
id: 17,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular8',
email: 'demoregular8@gmail.com',
roleId: 11,
id: 18,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular9',
email: 'demoregular9@gmail.com',
roleId: 11,
id: 19,
createdAt: new Date(),
updatedAt: new Date(),
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoregular10',
email: 'demoregular10@gmail.com',
roleId: 11,
id: 110,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin1',
email: 'demoadmin1@gmail.com',
roleId: 12,
id: 111,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin2',
email: 'demoadmin2@gmail.com',
roleId: 12,
id: 112,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin3',
email: 'demoadmin3@gmail.com',
roleId: 12,
id: 113,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin4',
email: 'demoadmin4@gmail.com',
roleId: 12,
id: 114,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin5',
email: 'demoadmin5@gmail.com',
roleId: 12,
id: 115,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin6',
email: 'demoadmin6@gmail.com',
roleId: 12,
id: 116,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin7',
email: 'demoadmin7@gmail.com',
roleId: 12,
id: 117,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin8',
email: 'demoadmin8@gmail.com',
roleId: 12,
id: 118,
},
{
firstName: 'John',
lastName: 'Doe',
password:'demoadmin9',
email: 'demoadmin9@gmail.com',
roleId: 12,
id: 119,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demoadmin10',
email: 'demoadmin10@gmail.com',
roleId: 12,
id: 120,
},

---

Transactions:
{
description: 'Random desc',
amount: 1000,
date: 9999999,
userId: 1,
categoryId: 1,
},
{
description: 'Random desc',
amount: 105,
date: 9999999,
userId: 1,
categoryId: 1,
},
{
description: 'Random desc',
amount: 999,
date: 9999999,
userId: 2,
categoryId: 1,
},
{
description: 'Random desc',
amount: 22223,
date: 9999999,
userId: 2,
categoryId: 2,
},
{
description: 'Random desc',
amount: 556,
date: 9999999,
userId: 3,
categoryId: 1,
},
{
description: 'Random desc',
amount: 1999,
date: 9999999,
userId: 3,
categoryId: 1,
},
{
description: 'Random desc',
amount: 466,
date: 9999999,
userId: 3,
categoryId: 1,
},
{
description: 'Random desc',
amount: 354,
date: 9999999,
userId: 2,
categoryId: 1,
},
{
description: 'Random desc',
amount: 999,
date: 99999999,
userId: 2,
categoryId: 1,
},
{
description: 'Random desc',
amount: 82,
date: 9999999,
userId: 5,
categoryId: 2,
},
{
description: 'Random desc',
amount: 400,
date: 9999999,
userId: 5,
categoryId: 2,
},
{
description: 'Random desc',
amount: 999,
date: 9999999,
userId: 8,
categoryId: 2,
},
{
description: 'Random desc',
amount: 887,
date: 9999999,
userId: 8,
categoryId: 2,
},
{
description: 'Random desc',
amount: 9999,
date: 9999999,
userId: 11,
categoryId: 2,
},
{
description: 'Random desc',
amount: 456,
date: 9999999,
userId: 2,
categoryId: 1,
},
{
description: 'Random desc',
amount: 2890,
date: 9999999,
userId: 5,
categoryId: 2,
},
{
description: 'Random desc',
amount: 950,
date: 9999999,
userId: 20,
categoryId: 1,
},
{
description: 'Random desc',
amount: 399,
date: 9999999,
userId: 3,
categoryId: 1,
},
{
description: 'Random desc',
amount: 5990,
date: 9999999,
userId: 3,
categoryId: 1,
},
{
description: 'Random desc',
amount: 920,
date: 9999999,
userId: 3,
categoryId: 1,
},

---
