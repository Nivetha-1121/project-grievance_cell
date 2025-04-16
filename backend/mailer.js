const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    // tls:{
    //     minVersion:'TLSv1',
    //     maxVersion:'TLSv1.3'
    // },
    auth: {
        user: "a1nivetha68@gmail.com",
        pass: "fkediafbruxxavnz",
    },
    // connectionTimeout: 30000,
});


async function sendEmail(data) {
    try {
        console.log('data',data);
        
        const mailOptions = {
            from: "a1nivetha68@gmail.com",
            to: "nivethac920822205020@nprcolleges.org",
            subject: "Grievance Report",
            html: `
                <html>
                    <body>
                        <h2>Grievance Report</h2>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Registration Number:</strong> ${data.regNumber}</p>
                        <p><strong>Department:</strong> ${data.department}</p>
                        <p><strong>Year:</strong> ${data.year}</p>
                        <p><strong>Category:</strong> ${data.category}</p>
                        <p><strong>Grievance:</strong> ${data.grievance}</p>
                    </body>
                </html>
            `,
        };
        

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

exports.sendEmail = sendEmail