export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit/js/pdfkit.standalone';
import { query } from '@/app/lib/db.server';
function formatMoney(amountInCents: number, currency: 'USD' | 'PKR' | 'EUR') {
  const symbols: Record<string, string> = {
    USD: '$',
    PKR: 'Rs.',
    EUR: '€',
  };

  const symbol = symbols[currency] ?? '';
  const value = (amountInCents / 100).toFixed(2);

  return `${symbol} ${value}`;
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const invoiceId = params.id;

  // ✅ Fetch invoice + customer
  const result = await query(
    `SELECT i.id, i.amount, i.status, i.date,    i.currency,

            c.name AS customer_name,
            c.email AS customer_email
     FROM invoices2 i
     JOIN customers2 c ON i.customer_id = c.id
     WHERE i.id = $1`,
    [invoiceId]
  );

  const invoice = result.rows[0];
  if (!invoice) {
    return new NextResponse('Invoice not found', { status: 404 });
  }

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const today = new Date().toLocaleDateString();

  // Collect PDF chunks
  const chunks: Uint8Array[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  /* ---------- HEADER ---------- */
  doc
    .fontSize(22)
    .text('Nimbus', { align: 'left' })
    .moveDown(0.2);

  doc
    .fontSize(10)
    .fillColor('gray')
    .text('Smart Invoicing Platform', { align: 'left' });

  doc.moveDown();

  doc
    .fillColor('black')
    .fontSize(20)
    .text('INVOICE', { align: 'right' });

  doc
    .fontSize(10)
    .text(`Invoice ID: ${invoice.id}`, { align: 'right' })
    .text(`Date: ${today}`, { align: 'right' });

  doc.moveDown(2);

  /* ---------- BILL TO ---------- */
  doc
    .fontSize(12)
    .fillColor('black')
    .text('Billed To:', { underline: true });

  doc
    .fontSize(11)
    .text(invoice.customer_name)
    .text(invoice.customer_email)
    .moveDown(1.5);

  /* ---------- TABLE HEADER ---------- */
  const tableTop = doc.y;
  const itemX = 50;
  const amountX = 350;
  const statusX = 450;

  doc
    .fontSize(11)
    .fillColor('black')
    .text('Description', itemX, tableTop)
    .text('Amount', amountX, tableTop)
    .text('Status', statusX, tableTop);

  doc
    .moveTo(itemX, tableTop + 15)
    .lineTo(550, tableTop + 15)
    .stroke();

  doc.moveDown(1);

  /* ---------- TABLE ROW ---------- */
  const rowY = doc.y;
  doc
    .fontSize(11)
    .text('Service Charges', itemX, rowY)
.text(
  formatMoney(invoice.amount, invoice.currency),
  amountX,
  rowY
)    .text(invoice.status.toUpperCase(), statusX, rowY);

  doc.moveDown(2);

    /* ---------- LINE ABOVE FOOTER ---------- */
  doc
    .moveTo(itemX, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown(0.5);

  /* ---------- TOTAL ---------- */
  doc
    .fontSize(14)
   .text(
  `Total Amount: ${formatMoney(invoice.amount, invoice.currency)}`,
  { align: 'right' }
);

  doc.moveDown(2);



  /* ---------- FOOTER ---------- */
  doc
    .fontSize(9)
    .fillColor('gray')
    .text('Nimbus • Cloud-based Smart Invoicing Platform', { align: 'center' })
    .text('support@nimbus.com', { align: 'center' });

  // IMPORTANT
  doc.end();

  // WAIT until PDF is fully generated
  await new Promise<void>((resolve) => doc.on('end', resolve));

  const pdfBuffer: any = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${invoice.id}.pdf"`,
      'Content-Length': pdfBuffer.length.toString(),
    },
  });
}
