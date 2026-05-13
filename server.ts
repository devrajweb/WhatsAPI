import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Auth Routes Mock
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Dummy validation
    if (email && password) {
      const isAdmin = email.includes("admin");
      res.json({
        token: "mock-jwt-token",
        user: { 
          id: "1", 
          email, 
          name: email.split("@")[0], 
          role: isAdmin ? "admin" : "user",
          plan: "Business"
        }
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // Mock Stats API
  app.get("/api/stats", (req, res) => {
    res.json({
      totalMessages: 124500,
      activeSessions: 12,
      pendingCampaigns: 4,
      deliveryRate: 98.2,
      usageData: [
        { name: "Mon", sent: 4500 },
        { name: "Tue", sent: 5200 },
        { name: "Wed", sent: 4800 },
        { name: "Thu", sent: 6100 },
        { name: "Fri", sent: 5900 },
        { name: "Sat", sent: 3200 },
        { name: "Sun", sent: 2800 },
      ]
    });
  });

  // Vite integration
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
    console.log(`🚀 WhatsAPI Server running at http://localhost:${PORT}`);
  });
}

startServer();
