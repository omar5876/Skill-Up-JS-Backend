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
password: 'demo1',
email: 'demo1@gmail.com',
roleId: 1,
id: 1,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo2',
email: 'demo2@gmail.com',
roleId: 1,
id: 2,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo3',
email: 'demo3@gmail.com',
roleId: 1,
id: 3,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo4',
email: 'demo4@gmail.com',
roleId: 1,
id: 4,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo5',
email: 'demo5@gmail.com',
roleId: 1,
id: 5,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo6',
email: 'demo6@gmail.com',
roleId: 1,
id: 6,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo7',
email: 'demo7@gmail.com',
roleId: 1,
id: 7,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo8',
email: 'demo8@gmail.com',
roleId: 1,
id: 8,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo9',
email: 'demo9@gmail.com',
roleId: 1,
id: 9,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo10',
email: 'demo10@gmail.com',
roleId: 1,
id: 10,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo11',
email: 'demo11@gmail.com',
roleId: 2,
id: 11,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo12',
email: 'demo12@gmail.com',
roleId: 2,
id: 12,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo13',
email: 'demo13@gmail.com',
roleId: 2,
id: 13,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo14',
email: 'demo14@gmail.com',
roleId: 2,
id: 14,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo15',
email: 'demo15@gmail.com',
roleId: 2,
id: 15,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo16',
email: 'demo16@gmail.com',
roleId: 2,
id: 16,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo17',
email: 'demo17@gmail.com',
roleId: 2,
id: 17,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo18',
email: 'demo18@gmail.com',
roleId: 2,
id: 18,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo19',
email: 'demo19@gmail.com',
roleId: 2,
id: 19,
},
{
firstName: 'John',
lastName: 'Doe',
password: 'demo20',
email: 'demo20@gmail.com',
roleId: 2,
id: 20,
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
