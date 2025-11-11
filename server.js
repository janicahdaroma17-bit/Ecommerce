const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let orderCounter = 1000;

app.post('/checkout', (req, res) => {
    const orderData = req.body;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Cart is empty or invalid data provided.'
        });
    }

    orderCounter++;
    const newOrderId = `ORD-${orderCounter}`;

    console.log(`\n--- RECEIVED NEW ORDER (${newOrderId}) ---`);
    console.log(`Customer: ${orderData.customer.name}`);
    console.log(`Total: $${orderData.total.toFixed(2)}`);
    console.log(`Items Count: ${orderData.items.length}`);
    console.log('-------------------------------------\n');

    res.json({
        success: true,
        orderId: newOrderId,
        message: 'Order processed successfully.'
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`Backend ready to receive checkout requests.`);
});