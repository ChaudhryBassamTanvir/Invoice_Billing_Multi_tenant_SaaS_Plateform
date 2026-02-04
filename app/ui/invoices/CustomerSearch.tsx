'use client';

import { useState, useEffect, useRef } from 'react';
import { CustomerField } from '@/app/lib/definitions';

export function CustomerSearch({
  customers,
}: {
  customers: CustomerField[];
}) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        placeholder="Search customer..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded-md border py-2 px-3"
      />

      {/* Hidden value for form submit */}
      <input type="hidden" name="customerId" value={selectedId} />

      {open && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow">
          {filtered.map((customer) => (
            <li
              key={customer.id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                setQuery(customer.name);
                setSelectedId(customer.id);
                setOpen(false);
              }}
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
