import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact/Demo/Feedback
  app.post("/api/contact", async (req, res) => {
    const { type, data } = req.body;
    const recipientEmail = "jamesgambrah@gmail.com";

    // Setup Nodemailer transporter
    // Note: The user MUST provide EMAIL_USER and EMAIL_PASS in their environment variables.
    // For Gmail, they should use an "App Password".
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let subject = "";
    let htmlContent = "";

    if (type === "demo") {
      subject = `New Demo Request: ${data.product}`;
      htmlContent = `
        <h2>New Demo Request</h2>
        <p><strong>Product:</strong> ${data.product}</p>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Requested At:</strong> ${new Date().toLocaleString()}</p>
      `;
    } else if (type === "feedback") {
      subject = `New Feedback Received`;
      htmlContent = `
        <h2>New Feedback</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Received At:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("EMAIL_USER or EMAIL_PASS not set. Email not sent, but data is saved to Firestore.");
        return res.status(200).json({ 
          success: true, 
          message: "Data saved to Firestore, but email notification skipped due to missing configuration." 
        });
      }

      await transporter.sendMail({
        from: `"GAM IT Solutions" <${process.env.EMAIL_USER}>`,
        to: recipientEmail,
        subject: subject,
        html: htmlContent,
      });

      res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      // We still return 200 because the data is already saved to Firestore on the client side
      res.status(500).json({ success: false, message: "Failed to send email notification." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
