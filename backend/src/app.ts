import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import apiRoutes from './routes/api.routes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();

// Security Headers
app.use(helmet());

// CORS Config
app.use(cors({
    origin: '*', // For extension development, detection of 'chrome-extension://' schema might be needed later
    methods: ['GET', 'POST'],
}));

// Body Parser
app.use(express.json());

// Request Logger (Simple)
app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
});

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { success: false, error: "Too many requests, please try again later." }
});
app.use('/api', limiter);

// Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
