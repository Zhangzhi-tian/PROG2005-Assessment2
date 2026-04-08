interface InventoryItem {
  itemID: number;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  inStock: boolean;
  isPopular: boolean;
}

let inventory: InventoryItem[] = [];

function addNewItem() {
  const idInput = document.getElementById("itemID") as HTMLInputElement | null;
  const nameInput = document.getElementById("itemName") as HTMLInputElement | null;
  const categoryInput = document.getElementById("category") as HTMLInputElement | null;
  const quantityInput = document.getElementById("quantity") as HTMLInputElement | null;
  const priceInput = document.getElementById("price") as HTMLInputElement | null;
  const supplierInput = document.getElementById("supplierName") as HTMLInputElement | null;
  const popularCheck = document.getElementById("isPopular") as HTMLInputElement | null;
  const output = document.getElementById("output") as HTMLElement | null;

  if (!idInput || !nameInput || !categoryInput || !quantityInput || !priceInput || !output) return;

  const itemID = parseInt(idInput.value);
  const itemName = nameInput.value.trim();
  const category = categoryInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  const price = parseFloat(priceInput.value);
  const supplierName = supplierInput?.value.trim() || "";
  const isPopular = popularCheck?.checked || false;

  if (isNaN(itemID) || itemID <= 0) {
    output.innerText = "Error: Item ID must be a positive number.";
    return;
  }

  if (!itemName || !category) {
    output.innerText = "Error: Please fill all required fields.";
    return;
  }

  if (isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0) {
    output.innerText = "Error: Quantity and price must be valid.";
    return;
  }

  const exists = inventory.some(i => i.itemID === itemID);
  if (exists) {
    output.innerText = "Error: Item ID already exists.";
    return;
  }

  const newItem: InventoryItem = {
    itemID,
    itemName,
    category,
    quantity,
    price,
    supplierName,
    inStock: quantity > 0,
    isPopular
  };

  inventory.push(newItem);
  output.innerText = "Item added successfully!";

  idInput.value = "";
  nameInput.value = "";
  categoryInput.value = "";
  quantityInput.value = "";
  priceInput.value = "";
  if (supplierInput) supplierInput.value = "";
  if (popularCheck) popularCheck.checked = false;
}

function showAllItems() {
  const output = document.getElementById("output") as HTMLElement | null;
  if (!output) return;

  if (inventory.length === 0) {
    output.innerText = "No items in inventory.";
    return;
  }

  let html = "<h3>All Items</h3><ul>";
  inventory.forEach(item => {
    html += `<li>ID: ${item.itemID} | ${item.itemName} | ${item.category} | $${item.price.toFixed(2)}</li>`;
  });
  html += "</ul>";
  output.innerHTML = html;
}

function searchItem() {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
  const output = document.getElementById("output") as HTMLElement | null;
  if (!searchInput || !output) return;

  const keyword = searchInput.value.toLowerCase().trim();
  const results = inventory.filter(i => i.itemName.toLowerCase().includes(keyword));

  if (results.length === 0) {
    output.innerText = "No matching items found.";
    return;
  }

  let html = "<h3>Search Results</h3><ul>";
  results.forEach(item => {
    html += `<li>ID: ${item.itemID} | ${item.itemName} | $${item.price.toFixed(2)}</li>`;
  });
  html += "</ul>";
  output.innerHTML = html;
}

// Expose functions to HTML
(window as any).addNewItem = addNewItem;
(window as any).showAllItems = showAllItems;
(window as any).searchItem = searchItem;
