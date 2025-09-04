import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Services
app.get('/api/v1/services', (req, res) => {
  res.json([
    { id: 'cleaning', name: 'Home Cleaning', baseDurationMin: 120, basePrice: { currency: 'SEK', amount: 890 } },
    { id: 'windows', name: 'Window Cleaning', baseDurationMin: 60, basePrice: { currency: 'SEK', amount: 450 } }
  ]);
});

// Quote
app.post('/api/v1/bookings/quote', (req, res) => {
  const { service_id } = req.body || {};
  const duration_min = service_id === 'windows' ? 60 : 180;
  const price = service_id === 'windows' ? 450 : 1290;
  res.json({
    duration_min,
    price: { currency: 'SEK', amount: price },
    slots: [
      new Date(Date.now() + 24*3600*1000).toISOString(),
      new Date(Date.now() + 48*3600*1000).toISOString()
    ]
  });
});

// Booking
app.post('/api/v1/bookings', (req, res) => {
  const { slot, payment_method_id, use_timebank_hours } = req.body || {};
  res.status(201).json({
    id: 'bk_' + Math.random().toString(36).slice(2,8),
    slot,
    payment_method_id,
    use_timebank_hours: use_timebank_hours || 0,
    status: 'CONFIRMED'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
