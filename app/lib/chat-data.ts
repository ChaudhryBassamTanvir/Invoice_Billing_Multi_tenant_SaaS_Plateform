export const chatData = {
  faqs: [
    {
      keywords: ['nimbus', 'what is nimbus', 'about nimbus', 'saas platform'],
      answer: `Nimbus is a multi-tenant SaaS platform for invoice and billing management created by DS Technologies. 
It allows users to manage invoices, customers, and profiles all in one place, with dashboards and reporting features.`,
    },
    {
      keywords: ['dashboard', 'assam dashboard', 'view dashboard', 'overview'],
      answer: `The Dashboard gives you a quick overview of your account. You can see:
- Collected invoices
- Updated today
- Pending invoices
- Awaiting payment
- Total invoices issued
- Total customers
- Active users
- Recent revenue chart of the last 12 months
- Latest invoices section`,
    },
    {
      keywords: ['invoice', 'create invoice', 'make invoice', 'how to create invoice'],
      answer: `To create an invoice:
1. Go to the Customers page and ensure you have added a customer.
2. Navigate to the Invoice page.
3. Use the search bar to find the customer by email or name.
4. Click the "Create" button.
5. Fill in the invoice details as desired (amount, items, status, etc.).
6. You can mark the invoice as Pending or Paid.
7. You can also Update or Download the invoice using the respective buttons.`,
    },
    {
      keywords: ['customer', 'add customer', 'create customer', 'how to add customer'],
      answer: `Customers must be created before creating invoices. 
To add a customer:
1. Go to the Customers page.
2. Click "Add Customer".
3. Fill in the customer details (name, email, etc.).
4. Save the customer.  
Once the customer is added, you can create invoices assigned to them.`,
    },
    {
      keywords: ['profile', 'update profile', 'change name', 'account settings'],
      answer: `The Profile section allows you to update your account information. 
To update your name, you must enter your current password for security. 
You can change other profile settings as needed.`,
    },
    {
      keywords: ['pending invoices', 'awaiting payment', 'invoice status'],
      answer: `Invoices can have different statuses: Pending or Paid. 
You can update the status of an invoice anytime from the Invoice page.`,
    },
    {
      keywords: ['download invoice', 'export invoice', 'invoice download'],
      answer: `You can download any invoice by clicking the "Download" button on the Invoice page. 
This generates a PDF copy of the invoice for your records.`,
    },
    {
      keywords: ['update invoice', 'edit invoice', 'modify invoice'],
      answer: `Invoices can be updated by clicking the "Update" button on the Invoice page. 
You can edit details such as amounts, items, and status.`,
    },
    {
      keywords: ['recent revenue', 'revenue chart', 'monthly revenue'],
      answer: `The dashboard shows a recent revenue chart for the last 12 months. 
It gives a visual overview of your collected payments and pending invoices.`,
    },
    {
      keywords: ['total customers', 'customer count', 'active users'],
      answer: `The dashboard shows total customers you have added, as well as active users in your account. 
This helps you track your client base and usage.`,
    },
    {
      keywords: ['latest invoices', 'recent invoices', 'invoice section'],
      answer: `The Latest Invoices section on the dashboard lists the most recently created invoices. 
You can quickly view their status, download, or update them from this section.`,
    },
    {
      keywords: ['search invoice', 'find invoice', 'lookup invoice'],
      answer: `You can search invoices on the Invoice page by customer name, email, or other invoice details. 
This helps you quickly find the invoice you need.`,
    },
    {
      keywords: [
        'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'hiya', 'howdy'
      ],
      answer: `Hello! 👋 Welcome to Nimbus. How can I assist you today with your dashboard, invoices, or customers?`,
    },
  ],
  fallback: `I can only answer questions related to Nimbus plateform dashboard, invoices, customers, or profile. I'm only trained for it`
};
