import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, deleteCustomer } from '@/app/lib/actions';
import darkTheme from '@/app/lib/dark-theme';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className={`rounded-md border p-2 hover:bg-gray-100
        ${darkTheme.border} ${darkTheme.text} ${darkTheme.hoverBg} ${darkTheme.hoverText}
        ${darkTheme.hoverBorder}
      `}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
 
  return (
    <form action={deleteInvoiceWithId}>
      <button className={`rounded-md border p-2 hover:bg-red-500 hover:text-white
        ${darkTheme.border} ${darkTheme.text} ${darkTheme.hoverBg} ${darkTheme.hoverText}
        ${darkTheme.hoverBorder}
      `}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex h-10 items-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
    >
      <span className="hidden md:block">Create Customer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className={`rounded-md border p-2 hover:bg-gray-100
        ${darkTheme.border} ${darkTheme.text} ${darkTheme.hoverBg} ${darkTheme.hoverText}
        ${darkTheme.hoverBorder}
      `}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ id }: { id: string }) {
  const deleteCustomerWithId = deleteCustomer.bind(null, id);
 
  return (
    <form action={deleteCustomerWithId}>
      <button className={`rounded-md bg-red-400 border p-2 hover:text-red-60 hover:bg-red-600
        ${darkTheme.border} ${darkTheme.text} ${darkTheme.hoverBg} ${darkTheme.hoverText}
        ${darkTheme.hoverBorder}
      `}>
        <span className="sr-only">Delete</span>
        <TrashIcon className=" text-white 0 w-5" />
      </button>
    </form>
  );
}