export function getSignupTemplate(userName: string) {
  return {
    subject: "Welcome to Travel-Top-10!",
    text: `Hi ${userName},

Thank you for signing up for Travel-Top-10! We're excited to have you on board.

If you have any questions, feel free to reach out to our support team.

Best regards,
The Travel-Top-10 Team`,

    html: `<strong>Hi ${userName},</strong>

<p>Thank you for signing up for <strong>Travel-Top-10</strong>! We're excited to have you on board.</p>

<p>If you have any questions, feel free to reach out to our support team.</p>

<p>Best regards,<br>The Travel-Top-10 Team</p>`,
  };
}
export function getCompanyCreateTemplate(
  userName: string,
  companyName: string
) {
  return {
    subject: "Congratulations on Creating Your Company!",
    text: `Hi ${userName},

Congratulations on successfully creating your company, ${companyName}, on Travel-Top-10! We're thrilled to see your business grow with us.

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The Travel-Top-10 Team`,

    html: `<strong>Hi ${userName},</strong>

<p>Congratulations on successfully creating your company, <strong>${companyName}</strong>, on Travel-Top-10! We're thrilled to see your business grow with us.</p>

<p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>

<p>Best regards,<br>The Travel-Top-10 Team</p>`,
  };
}
export function getInfluencerCreateTemplate(userName: string) {
  return {
    subject: "Welcome to Top-10-Travels, Travel Influencer!",
    text: `Hi ${userName},

Congratulations on successfully creating your account as a Travel Influencer on Top-10-Travels! We're excited to have you join our community of travel enthusiasts.

Start sharing your amazing travel experiences and inspire others to explore new destinations. If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The Top-10-Travels Team`,

    html: `<strong>Hi ${userName},</strong>

<p>Congratulations on successfully creating your account as a <strong>Travel Influencer</strong> on Top-10-Travels! We're excited to have you join our community of travel enthusiasts.</p>

<p>Start sharing your amazing travel experiences and inspire others to explore new destinations. If you have any questions or need assistance, please don't hesitate to contact our support team.</p>

<p>Best regards,<br>The Top-10-Travels Team</p>`,
  };
}

export function getRequestConfirmationTemplate(companyName: string) {
  return {
    subject: "Profile Update Request Received",
    text: `Dear ${companyName},

We have received your request for profile updates or changes. Our admin team will review your request and take the necessary actions.

Thank you for reaching out to us.

Best regards,
The Travel-Top-10 Team`,
    html: `<p>Dear ${companyName},</p>

<p>We have received your request for profile updates or changes. Our admin team will review your request and take the necessary actions.</p>

<p>Thank you for reaching out to us.</p>

<p>Best regards,<br>The Travel-Top-10 Team</p>`,
  };
}

function getRequestAcceptedTemplate(companyName: string) {
  return {
    subject: "Profile Update Request Accepted",
    text: `Dear ${companyName},

We are pleased to inform you that your request for profile updates or changes has been accepted and the necessary updates have been made.

Thank you for your patience and cooperation.

Best regards,
The Travel-Top-10 Team`,
    html: `<p>Dear ${companyName},</p>

<p>We are pleased to inform you that your request for profile updates or changes has been accepted and the necessary updates have been made.</p>

<p>Thank you for your patience and cooperation.</p>

<p>Best regards,<br>The Travel-Top-10 Team</p>`,
  };
}

export function getContactUsAdminTemplate(
  userName: string,
  userEmail: string,
  message: string,
  phone: string
) {
  return {
    subject: "New Contact Us Submission",
    text: `Hi Admin,

You have a new contact us submission from the website.

Name: ${userName}
Email: ${userEmail}
Phone: ${phone}
Message:
${message}

Best regards,
Your Website Team`,

    html: `<strong>Hi Admin,</strong>

<p>You have a new contact us submission from the website.</p>

<p><strong>Name:</strong> ${userName}</p>
<p><strong>Email:</strong> ${userEmail}</p>
<p><strong>Phone:</strong> ${phone}</p>

<p><strong>Message:</strong></p>
<p>${message}</p>

<p>Best regards,<br>Travel-Top-10 Team</p>`,
  };
}

export function getHotelInquiryTemplate(
  userName: string,
  userEmail: string,
  userMessage: string,
  hotelName: string,
) {
  return {
    subject: `New Inquiry about ${hotelName}`,
    text: `Hi ${hotelName} owner,

You have received a new inquiry about your hotel, ${hotelName}.

Name: ${userName}
Email: ${userEmail}

Message:
${userMessage}

Please respond to the inquiry at your earliest convenience.

Best regards,
The Travel-Top-10 Team`,

    html: `<strong>Hi ${hotelName} owner,</strong>

<p>You have received a new inquiry about your hotel, <strong>${hotelName}</strong>.</p>

<p><strong>Name:</strong> ${userName}</p>
<p><strong>Email:</strong> ${userEmail}</p>

<p><strong>Message:</strong></p>
<p>${userMessage}</p>

<p>Please respond to the inquiry at your earliest convenience.</p>

<p>Best regards,<br>The Travel-Top-10 Team</p>`,
  };
}
