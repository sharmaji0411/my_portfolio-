import os
import logging
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

logger = logging.getLogger(__name__)

def send_contact_notification(name: str, email: str, subject: str, message: str) -> bool:
    """Send email notification for new contact form submissions."""
    
    api_key = os.getenv('SENDGRID_API_KEY')
    if not api_key:
        logger.error("SENDGRID_API_KEY environment variable not set")
        return False
    
    try:
        # Create the email content
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <h3 style="color: #0066cc; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
            <p><strong>Subject:</strong> {subject}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #fff; border: 1px solid #eee; border-radius: 5px;">
            <h3 style="color: #0066cc; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-line;">{message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background-color: #e7f3ff; border-radius: 5px; font-size: 12px; color: #666;">
            <p style="margin: 0;">This message was sent from your portfolio website contact form.</p>
            <p style="margin: 5px 0 0 0;">Reply directly to {email} to respond to this inquiry.</p>
          </div>
        </div>
        """
        
        text_content = f"""
New Contact Form Submission

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This message was sent from your portfolio website contact form.
Reply directly to {email} to respond to this inquiry.
        """
        
        mail = Mail(
            from_email='noreply@yourportfolio.com',  # Should be verified in SendGrid
            to_emails='vanshsharma.official0411@gmail.com',
            subject=f'New Contact Form Submission: {subject}',
            html_content=html_content,
            plain_text_content=text_content
        )
        
        sg = SendGridAPIClient(api_key)
        response = sg.send(mail)
        
        logger.info(f'Email notification sent successfully. Status: {response.status_code}')
        return True
        
    except Exception as e:
        logger.error(f'Failed to send email notification: {str(e)}')
        return False