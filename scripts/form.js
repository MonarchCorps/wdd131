const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Flying Skateboard" },
    { id: "ac-2000", name: "Acme Anvil" },
    { id: "gp-1961", name: "Gadget Pro" },
];

function populateProductOptions() {
    const select = document.getElementById("productName");
    if (!select) return;

    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

populateProductOptions();
