const { v4: uuidv4 } = require('uuid');
const { uploadInvoiceToS3 } = require('../utils/s3');
const { generateInvoicePDF } = require('../utils/pdf');

const bookRoom = async (req, res) => {
    try {
        const { name, email, room, checkIn, checkOut, price } = req.body;

        if (!name || !email || !room || !checkIn || !checkOut || !price) {
            return res.status(400).json({ success: false, message: 'All input fields are required.' });
        }

        // Calculate days difference
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        
        if (endDate <= startDate) {
             return res.status(400).json({ success: false, message: 'Check-out date must be after check-in date.' });
        }

        const diffTime = Math.abs(endDate - startDate);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalAmount = totalDays * price;

        // Generate Booking ID
        const bookingId = uuidv4().substring(0, 8).toUpperCase();

        const bookingConfirmation = {
            bookingId,
            customerName: name,
            email,
            roomName: room,
            checkIn,
            checkOut,
            pricePerNight: price,
            totalDays,
            totalAmount,
            paymentStatus: 'Paid',
            status: 'Confirmed'
        };

        // Generate PDF and upload to S3
        const pdfBuffer = await generateInvoicePDF(bookingConfirmation);
        const invoiceUrl = await uploadInvoiceToS3(bookingId, pdfBuffer);
        
        bookingConfirmation.invoiceUrl = invoiceUrl;

        return res.status(200).json({
            success: true,
            message: 'Booking Confirmed 🎉',
            data: bookingConfirmation
        });
    } catch (error) {
        console.error("Booking Error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    bookRoom
};
