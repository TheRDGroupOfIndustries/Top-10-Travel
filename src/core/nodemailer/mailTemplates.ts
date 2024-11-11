import image from "/public/roundLogo.jpg"

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

export function getRequestAcceptedTemplate(
  companyName: string,
  isAccepted: boolean
) {
  return {
    subject: "Profile Update Request Accepted",
    text: `Dear ${companyName},

We are pleased to inform you that your request for profile updates or changes has been ${
      isAccepted
        ? "accepted and the necessary updates have been made"
        : "rejected"
    }.

Thank you for your patience and cooperation.

Best regards,
The Travel-Top-10 Team`,
    html: `<p>Dear ${companyName},</p>

<p>We are pleased to inform you that your request for profile updates or changes has been ${
      isAccepted
        ? "accepted and the necessary updates have been made."
        : "rejected."
    }</p>

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
    subject: "🚨 New Contact Submission - Travel Top 10 🚨",
    text: `Hi Admin,\n\nYou have a new contact submission from Travel Top 10.\n\nName: ${userName}\nEmail: ${userEmail}\nPhone: ${phone}\nMessage:\n${message}\n\nBest regards,\nThe Travel-Top-10 Team`,
    html: `
      <div style="font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; padding: 20px; max-width: 600px; margin: auto; background: linear-gradient(to right, #e1f5fe, #fff); border-radius: 15px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);">
        <h2 style="font-size: 28px; color: #ff6f61; text-align: center; margin-bottom: 20px;">
          🚨 New Contact Submission
        </h2>

        <p style="font-size: 18px; color: #666; text-align: center; margin-bottom: 30px;">
          A new message has been submitted via the Travel Top 10 contact form. Here are the details:
        </p>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; margin-bottom: 20px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
          <h3 style="font-size: 22px; color: #444; margin-bottom: 15px;">Contact Information</h3>
          <p style="font-size: 16px; color: #555; margin: 5px 0;">
            <strong style="color: #ff6f61;">Name:</strong> <span style="color: #333;">${userName}</span>
          </p>
          <p style="font-size: 16px; color: #555; margin: 5px 0;">
            <strong style="color: #ff6f61;">Email:</strong> <a href="mailto:${userEmail}" style="color: #008CBA; text-decoration: none; font-weight: bold;">${userEmail}</a>
          </p>
          <p style="font-size: 16px; color: #555; margin: 5px 0;">
            <strong style="color: #ff6f61;">Phone:</strong> <span style="color: #333;">${phone}</span>
          </p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; margin-bottom: 20px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
          <h3 style="font-size: 22px; color: #444; margin-bottom: 15px;">Message</h3>
          <p style="font-size: 16px; color: #555; line-height: 1.6; border-left: 4px solid #ff6f61; padding-left: 10px;">
            "${message}"
          </p>
        </div>


         <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 20px;">
          <a href="https://traveltop10.in/" style="text-decoration: none; color: #333;">
            <img src="https://res.cloudinary.com/dfkiu7dq5/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731307751/l0a51hrslrvfot2oo0ze.jpg" alt="logo" style="border-radius: 50%; max-height: 40px; vertical-align: middle;">
            <span style="font-family: 'Cinzel', serif; font-weight: bold; font-size: 20px; text-transform: uppercase; color: #333;">
              Travel <span style="color: #f04a4a;">Top 10</span>
            </span>
          </a>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 16px; color: #888; margin-bottom: 10px;">Best regards,</p>
          <p style="font-size: 20px; color: #444; font-weight: bold;">The Travel-Top-10 Team 🤝</p>
        </div>
      </div>
    `,
  };
}

export function getContactUsAppreciationTemplate(userName: string) {
  return {
    subject: "✨ Thank You for Reaching Out to Travel Top 10! ✨",
    text: `Dear ${userName},\n\nThank you for contacting Travel Top 10! We’re thrilled that you’ve chosen us to help plan your next adventure. Your message has been received, and we’ll be in touch soon to assist with all the details.\n\nIn the meantime, feel free to explore the exciting destinations we offer on our website, or simply reply to this email if you have any immediate questions.\n\nWe’re here to make your dream vacation a reality, and we can’t wait to start this journey with you!\n\nWarmest regards,\nThe Travel-Top-10 Team\n\n✉️ Email: [Email Address]\n🌐 Visit us: [Website Link]`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="font-size: 24px; color: #444;">Thank You for Reaching Out, ${userName}!</h2>

        <p style="font-size: 16px; color: #666;">
          We’re absolutely delighted that you’ve contacted <strong>Travel Top 10</strong> for your vacation planning! Your message has been received, and one of our travel experts will get in touch with you shortly to help you plan the perfect getaway.
        </p>

        <p style="font-size: 16px; color: #666;">
          While you wait, why not <a href="https://traveltop10.in/" style="color: #008CBA; text-decoration: none; font-weight: bold; cursor: pointer;">explore some of our exciting destinations</a>? If you have any immediate questions, simply reply to this email, and we’ll be happy to assist you!
        </p>

        <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>

        <p style="font-size: 16px; color: #666;">
          Thank you again for choosing us to be a part of your travel journey. We’re here to make your dream vacation a reality, and we can’t wait to start this exciting adventure with you!
        </p>

        <p style="font-size: 16px; color: #444;">
          <strong>Warmest regards,</strong><br>
          The Travel-Top-10 Team
        </p>

        <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>

        <p style="font-size: 14px; color: #555;">
          ✉️ <strong>Email:</strong> <a href="mailto:contact@traveltop10.in" style="color: #008CBA; text-decoration: none; font-weight: bold; cursor: pointer;">contact@traveltop10.in</a><br>
          🌐 <strong>Visit us:</strong> <a href="https://traveltop10.in/" style="color: #008CBA; text-decoration: none; font-weight: bold; cursor: pointer;">traveltop10.in</a>
        </p>


         <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 20px;">
          <a href="https://traveltop10.in/" style="text-decoration: none; color: #333;">
            <img src="https://res.cloudinary.com/dfkiu7dq5/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731307751/l0a51hrslrvfot2oo0ze.jpg" alt="logo" style="border-radius: 50%; max-height: 40px; vertical-align: middle;">
            <span style="font-family: 'Cinzel', serif; font-weight: bold; font-size: 20px; text-transform: uppercase; color: #333;">
              Travel <span style="color: #f04a4a;">Top 10</span>
            </span>
          </a>
        </div>
      
        <div style="text-align: center; padding: 10px 0;">
          <a href="https://traveltop10.in/" style="background-color: #008CBA; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Explore Destinations</a>
        </div>
      </div>
    `,
  };
}

export function getHotelInquiryTemplate(
  userName: string,
  userEmail: string,
  userMessage: string,
  userPhoneNumber: string,
  hotelName: string
) {
  return {
    subject: `New Inquiry about ${hotelName}`,
    text: `Hi ${hotelName} owner,

You have received a new inquiry about your hotel, ${hotelName}.

Name: ${userName}
Email: ${userEmail}
Phone Number: ${userPhoneNumber}
Date: ${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}

Message:
${userMessage}

Please respond to the inquiry at your earliest convenience.

Best regards,
The Travel-Top-10 Team`,

    html: `<strong>Hi ${hotelName} owner,</strong>

<p>You have received a new inquiry about your hotel, <strong>${hotelName}</strong>.</p>

<p><strong>Contact Us -</strong></p>
<p><strong>Name:</strong> ${userName}</p>
<p><strong>Email:</strong> ${userEmail}</p>
<p><strong>Phone Number:</strong> ${userPhoneNumber}</p>
<p><strong>Date:</strong> ${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}</p>


<p><strong>Message:</strong></p>
<p>${userMessage}</p>

<p>Please respond to the inquiry at your earliest convenience.</p>

<p>Best regards,<br>The Travel-Top-10 Team</p>`,
  };
}
