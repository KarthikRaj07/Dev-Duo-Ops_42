const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Configure the AWS SDK
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadInvoiceToS3 = async (bookingId, pdfBuffer) => {
    const bucketName = process.env.S3_BUCKET_NAME;
    const fileName = `invoices/invoice-${bookingId}.pdf`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
        // Note: Omitting ACL constraint, as modern S3 buckets disable ACLs by default
    });

    try {
        await s3Client.send(command);
        // Return the public URL
        const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        return publicUrl;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
};

module.exports = {
    uploadInvoiceToS3
};
