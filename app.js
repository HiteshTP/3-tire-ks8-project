<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tire Database</title>
</head>
<body>
    <h1>Tire Database</h1>
    <form id="tireForm">
        <input type="text" id="brand" placeholder="Brand" required>
        <input type="text" id="model" placeholder="Model" required>
        <input type="text" id="size" placeholder="Size" required>
        <input type="text" id="type" placeholder="Type" required>
        <input type="number" id="price" placeholder="Price" required>
        <button type="submit">Add Tire</button>
    </form>

    <h2>Tires List</h2>
    <ul id="tiresList"></ul>

    <script>
        const form = document.getElementById('tireForm');
        const tiresList = document.getElementById('tiresList');

        async function fetchTires() {
            const response = await fetch('http://localhost:5000/tires');
            const tires = await response.json();
            tiresList.innerHTML = '';
            tires.forEach(tire => {
                const li = document.createElement('li');
                li.textContent = `${tire.brand} ${tire.model} (${tire.size}) - $${tire.price}`;
                tiresList.appendChild(li);
            });
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const newTire = {
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                size: document.getElementById('size').value,
                type: document.getElementById('type').value,
                price: parseFloat(document.getElementById('price').value),
            };
            await fetch('http://localhost:5000/tires', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTire),
            });
            form.reset();
            fetchTires();
        });

        // Fetch initial list of tires
        fetchTires();
    </script>
</body>
</html>

