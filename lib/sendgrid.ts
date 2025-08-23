import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: EmailData): Promise<boolean> {
  try {
    const msg = {
      to: 'vanshsharma.official0411@gmail.com',
      from: 'noreply@yourportfolio.com', // This should be a verified sender in SendGrid
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <h3 style="color: #0066cc; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #fff; border: 1px solid #eee; border-radius: 5px;">
            <h3 style="color: #0066cc; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-line;">${data.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background-color: #e7f3ff; border-radius: 5px; font-size: 12px; color: #666;">
            <p style="margin: 0;">This message was sent from your portfolio website contact form.</p>
            <p style="margin: 5px 0 0 0;">Reply directly to ${data.email} to respond to this inquiry.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from your portfolio website contact form.
Reply directly to ${data.email} to respond to this inquiry.
      `
    };

    await sgMail.send(msg);
    console.log('Contact notification email sent successfully');
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}