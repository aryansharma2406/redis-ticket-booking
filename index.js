const express = require("express");
const mongoose = require("mongoose");
require("./db");

const Product = require("./models/product");

const app = express();
const PORT = process.env.PORT || 3000;


// Home route
app.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    let html = `
    <h1>Ecommerce Catalog</h1>
    <h2>Products List</h2>
    `;

    products.forEach(product => {
      html += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px">
        <h3>${product.name}</h3>
        <p><b>Category:</b> ${product.category}</p>
        <p><b>Average Rating:</b> ${product.avgRating}</p>

        <h4>Variants</h4>
        <ul>
      `;

      product.variants.forEach(v => {
        html += `
        <li>
        SKU: ${v.sku} | Color: ${v.color} | Price: $${v.price} | Stock: ${v.stock}
        </li>
        `;
      });

      html += `</ul>`;

      html += `<h4>Reviews</h4><ul>`;

      product.reviews.forEach(r => {
        html += `
        <li>
        Rating: ${r.rating} ⭐ - ${r.comment}
        </li>
        `;
      });

      html += `</ul></div>`;
    });

    res.send(html);

  } catch (error) {
    res.send(error.message);
  }
});


// API route (optional)
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});