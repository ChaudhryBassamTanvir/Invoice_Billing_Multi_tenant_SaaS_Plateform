require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const {
  makeUser,
  makeCustomer,
  makeInvoice,
} = require('../app/lib/factories');


// import { makeUser } from '@/app/lib/factories';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 🔑 YOUR ACCOUNT (MAIN USER)
const MAIN_USER = {
  name: 'Poisson Tech',
  email: 'poissontech193@gmail.com',
  password: 'Bani193ch@',
};

/* -------------------- USERS -------------------- */
async function seedUsers(client) {
  console.log('Seeding users2...');

  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS users2 (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      isoauth BOOLEAN DEFAULT false
    );
  `);

  // ✅ Ensure YOUR user exists
  const hashedMainPassword = await bcrypt.hash(MAIN_USER.password, 10);

  await client.query(
    `
    INSERT INTO users2 (name, email, password, isoauth)
    VALUES ($1, $2, $3, false)
    ON CONFLICT (email) DO NOTHING
    `,
    [MAIN_USER.name, MAIN_USER.email, hashedMainPassword]
  );

  // Optional: random users
  const users = Array.from({ length: 3 }, makeUser);

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await client.query(
      `
      INSERT INTO users2 (id, name, email, password, isoauth)
      VALUES ($1, $2, $3, $4, false)
      ON CONFLICT (email) DO NOTHING
      `,
      [user.id, user.name, user.email, hashedPassword]
    );
  }

  console.log(`✅ Seeded users2`);
  return users;
}

/* -------------------- CUSTOMERS -------------------- */
async function seedCustomers(client) {
  console.log('Seeding customers2...');

  await client.query(`
    CREATE TABLE IF NOT EXISTS customers2 (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      user_email TEXT NOT NULL
    );
  `);

  const customers = [];

  // 🔥 ALL customers belong to YOU
  for (let i = 0; i < 2000; i++) {
    customers.push(makeCustomer(MAIN_USER.email));
  }

  for (const customer of customers) {
    await client.query(
      `
      INSERT INTO customers2 (id, name, email, image_url, user_email)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO NOTHING
      `,
      [
        customer.id,
        customer.name,
        customer.email,
        customer.image_url,
        customer.user_email,
      ]
    );
  }

  console.log(`✅ Seeded customers2 (linked to your account)`);
  return customers;
}

/* -------------------- INVOICES -------------------- */
async function seedInvoices(client, customers) {
  console.log('Seeding invoices2...');

  await client.query(`
    CREATE TABLE IF NOT EXISTS invoices2 (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `);

  for (const customer of customers) {
    for (let i = 0; i < 10; i++) {
      const invoice = makeInvoice(customer.id);

      await client.query(
        `
        INSERT INTO invoices2 (customer_id, amount, status, date)
        VALUES ($1, $2, $3, $4)
        `,
        [
          invoice.customer_id,
          invoice.amount,
          invoice.status,
          invoice.date,
        ]
      );
    }
  }

  console.log(`✅ Seeded invoices2 (visible on your dashboard)`);
}

/* -------------------- REVENUE -------------------- */
async function seedRevenue(client) {
  console.log('Seeding revenue...');

  await client.query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `);

  const revenue = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2200 },
    { month: 'Apr', revenue: 2500 },
    { month: 'May', revenue: 2300 },
    { month: 'Jun', revenue: 3200 },
    { month: 'Jul', revenue: 3500 },
    { month: 'Aug', revenue: 3700 },
    { month: 'Sep', revenue: 2500 },
    { month: 'Oct', revenue: 2800 },
    { month: 'Nov', revenue: 3000 },
    { month: 'Dec', revenue: 4800 },
  ];

  for (const rev of revenue) {
    await client.query(
      `
      INSERT INTO revenue (month, revenue)
      VALUES ($1, $2)
      ON CONFLICT (month) DO NOTHING
      `,
      [rev.month, rev.revenue]
    );
  }

  console.log(`✅ Seeded revenue`);
}

/* -------------------- MAIN -------------------- */
async function main() {
  const client = await pool.connect();

  try {
    await seedUsers(client);
    const customers = await seedCustomers(client);
    await seedInvoices(client, customers);
    await seedRevenue(client);

    console.log('🎉 Database seeded successfully for YOUR dashboard!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
