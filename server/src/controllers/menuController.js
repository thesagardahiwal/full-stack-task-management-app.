const Menu = require('../models/Menu');


const listMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching menu', error: err.message });
    }
};

const createMenuItem = async (req, res) => {
    const { name, category, price, availability } = req.body;

    if (!name || !category || price == null) {
        return res.status(400).json({ message: 'Name, category, and price are required' });
    }

    try {
        const newMenuItem = new Menu({ name, category, price, availability });
        await newMenuItem.save();
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(500).json({ message: 'Error adding menu item', error: err.message });
    }
};

const editMenuItem = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedMenu = await Menu.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMenu) return res.status(404).json({ message: 'Menu item not found' });
        res.json(updatedMenu);
    } catch (err) {
        res.status(500).json({ message: 'Error updating menu item', error: err.message });
    }
};

const deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMenu = await Menu.findByIdAndDelete(id);
        if (!deletedMenu) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting menu item', error: err.message });
    }
};

module.exports = {
    deleteMenuItem,
    listMenu,
    editMenuItem,
    createMenuItem
}
