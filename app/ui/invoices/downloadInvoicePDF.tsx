import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export function DownloadInvoicePDF({ id }: { id: string }) {
  return (
    <a
      href={`/api/invoices/${id}/pdf`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-md border p-2 hover:bg-gray-100"
      title="Download Invoice PDF"
    >
      <ArrowDownTrayIcon className="h-5 w-5" />
    </a>
  );
}
