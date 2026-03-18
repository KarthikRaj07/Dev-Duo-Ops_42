const PDFDocument = require('pdfkit');

const generateInvoicePDF = (bookingData) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            let buffers = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Add Header
            doc.fontSize(25).font('Helvetica-Bold').text('Booking Invoice', { align: 'center' });
            doc.moveDown(2);

            // Add Details
            doc.fontSize(12).font('Helvetica');
            doc.text(`Booking ID:`, { continued: true }).font('Helvetica-Bold').text(` ${bookingData.bookingId}`);
            doc.font('Helvetica').text(`Customer Name:`, { continued: true }).font('Helvetica-Bold').text(` ${bookingData.customerName}`);
            doc.font('Helvetica').text(`Email:`, { continued: true }).font('Helvetica-Bold').text(` ${bookingData.email}`);
            doc.font('Helvetica').text(`Room:`, { continued: true }).font('Helvetica-Bold').text(` ${bookingData.roomName}`);
            
            doc.moveDown();
            doc.font('Helvetica').text(`Check-in: ${bookingData.checkIn}`);
            doc.font('Helvetica').text(`Check-out: ${bookingData.checkOut}`);
            doc.font('Helvetica').text(`Total Days: ${bookingData.totalDays}`);
            doc.font('Helvetica').text(`Price per Night: Rs. ${bookingData.pricePerNight}`);
            
            doc.moveDown();
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown();
            
            doc.fontSize(14).font('Helvetica-Bold').text(`Total Amount: Rs. ${bookingData.totalAmount}`);
            
            doc.moveDown();
            doc.fontSize(12).font('Helvetica').text(`Payment Status: `, { continued: true }).fillColor('green').text(`${bookingData.paymentStatus}`);

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    generateInvoicePDF
};
