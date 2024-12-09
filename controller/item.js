const Item = require('../model/item'); // Assuming `Item` is your Sequelize model for managing item data.

exports.addItem = async (req, res) => {
    const { itemname, description, price, quantity } = req.body;

    try {
        const newItem = await Item.create({ itemname, description, price, quantity });
        res.status(201).json(newItem); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error adding item' });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching items' });
    }
};

exports.editItem = async (req, res) => {
    const itemId = req.params.itemId;
    const { itemname, description, price, quantity } = req.body;

    try {
        const updatedItem = await Item.update(
            { itemname, description, price, quantity },
            { where: { id: itemId } }
        );

        if (updatedItem[0] === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const item = await Item.findByPk(itemId);
        res.status(200).json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating item' });
    }
};

exports.deleteItem = async (req, res) => {
    const itemId = req.params.itemId;

    try {
        const deletedItem = await Item.destroy({ where: { id: itemId } });

        if (deletedItem === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error deleting item' });
    }
};

exports.updateQuantity = async (req, res) => {
    const itemId = req.params.itemId;
    const { quantityChange } = req.body;

    try {
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const newQuantity = item.quantity - quantityChange;

        if (newQuantity < 0) {
            return res.status(400).json({ message: 'Not enough quantity available' });
        }

        item.quantity = newQuantity;
        await item.save();

        res.status(200).json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating item quantity' });
    }
};
