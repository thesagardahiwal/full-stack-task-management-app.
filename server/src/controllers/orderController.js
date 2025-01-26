const Menu = require('../models/Menu');
const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Order items are required' });
    }

    try {
        let totalAmount = 0;
        for (const item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem || !menuItem.availability) {
                return res.status(400).json({ message: `Item ${item.menuItemId} is not available` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const newOrder = new Order({
            userId: req.user.id,
            items,
            totalAmount,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error placing order', error: err.message });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.menuItemId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
};

module.exports = {
    createOrder,
    listOrders
}