function handleFormSubmit(event) {
    event.preventDefault();
    const itemDetails = {
        itemname: event.target.itemname.value,
        description: event.target.description.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value
    };

    const itemId = event.target.dataset.itemId;

    if (itemId) {
        axios.put(`http://localhost:3000/item/${itemId}`, itemDetails)
            .then(response => updateOnScreen(response.data))
            .catch(err => console.log(err));
    } else {
        axios.post('http://localhost:3000/item', itemDetails)
            .then(response => display(response.data))
            .catch(err => console.log(err));
    }
    event.target.reset();
    delete event.target.dataset.itemId;
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/item')
        .then(response => response.data.forEach(item => display(item)))
        .catch(err => console.log(err));
});

function display(item) {
    const itemList = document.getElementById('list');
    const itemElement = document.createElement('li');
    itemElement.setAttribute('data-id', item.id);
    itemElement.innerHTML = `${item.itemname} - ${item.description} - ${item.price} - ${item.quantity}
        <button onclick="updateQuantity(${item.id}, 1)">Buy 1</button>
        <button onclick="updateQuantity(${item.id}, 2)">Buy 2</button>
        <button onclick="updateQuantity(${item.id}, 3)">Buy 3</button>
        <button onclick="edit(${item.id}, '${item.itemname}', '${item.description}', '${item.price}', '${item.quantity}')">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
    `;
    itemList.appendChild(itemElement);
}


function updateQuantity(itemId, quantity) {
    axios.put(`http://localhost:3000/item/${itemId}/quantity`, { quantityChange: quantity })
        .then(response => {
            const updatedItem = response.data;
            updateOnScreen(updatedItem);
        })
        .catch(err => {
            console.error(err);
            alert('Unable to update quantity');
        });
}

function updateOnScreen(item) {
    const itemElement = document.querySelector(`li[data-id="${item.id}"]`);
    itemElement.innerHTML = `${item.itemname} - ${item.description} - ${item.price} - ${item.quantity}
        <button onclick="buy1(${item.id})">Buy 1</button>
        <button onclick="buy2(${item.id})">Buy 2</button>
        <button onclick="buy3(${item.id})">Buy 3</button>
        <button onclick="edit(${item.id}, '${item.itemname}', '${item.description}', '${item.price}', '${item.quantity}')">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
    `;
}

function edit(itemId, itemname, description, price, quantity) {
    document.getElementById('itemname').value = itemname;
    document.getElementById('description').value = description;
    document.getElementById('price').value = price;
    document.getElementById('quantity').value = quantity;
    document.getElementById('form').dataset.itemId = itemId;
}

function deleteItem(itemId) {
    axios.delete(`http://localhost:3000/item/${itemId}`)
        .then(() => {
            const itemElement = document.querySelector(`li[data-id="${itemId}"]`);
            itemElement.remove();
        })
        .catch(err => console.log(err));
}
