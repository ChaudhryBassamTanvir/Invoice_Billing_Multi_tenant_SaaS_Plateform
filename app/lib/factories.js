const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

 function makeUser() {
  return {
    id: uuidv4(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: 'password123',
  };
}

function makeCustomer(userEmail) {
  return {
    id: uuidv4(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    image_url: `/customers/default.png`,
    user_email: userEmail,
  };
}

function makeInvoice(customerId) {
  return {
    customer_id: customerId,
    amount: faker.number.int({ min: 500, max: 50000 }),
    status: faker.helpers.arrayElement(['paid', 'pending']),
    date: faker.date.past({ years: 2 }),
  };
}

module.exports = {
  makeUser,
  makeCustomer,
  makeInvoice,
};
