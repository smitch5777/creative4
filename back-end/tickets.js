const express = require('express');
const bodyParser = require("body-parser");
const Schema = require('mongoose'); 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
});

class CartItem {
  constructor(id, quantity) {
    this.id = id;
    this.quantity = quantity;
  }
}

const cartSchema = new mongoose.Schema({
  items: [{id: String, quantity: Number}]
})

productSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  productSchema.set('toJSON', {
    virtuals: true
  });

  cartSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  cartSchema.set('toJSON', {
    virtuals: true
  });
  const Product = mongoose.model('product', productSchema);
  const Cart = mongoose.model('cart', cartSchema)

  async function getCart() {
    let cart = await Cart.find();
    if (!cart || cart.length == 0) {
      const to_save = new Cart({items: []});
      await to_save.save();
      return to_save;
    } else {
      return cart[0];
    }
  }

  app.get('/api/cart', async (req, res) => {
    try {
      let cart = await getCart();
      console.log('product' + cart);
      res.send(cart.items); //make sure this works
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/cart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let product = await Product.find({ 
      _id: id
    });
    if (!product || product.length < 1) {
      //If the product doesn't exist, return an error code.
      res.sendStatus(404);
    } else {
      const cart = await getCart();
      const items = cart.items
      let item = items.find(item => item.id == id);
      if (item) {
        if (!item.quantity) {
          item.quantity = 0;
        }
        item.quantity++;
      } else {
        item = new CartItem(id, 1);
        items.push(item);
      }
      await cart.save();
      console.log('cart' + cart);
      res.send(item);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.put('/api/cart/:id/:quantity', async (req, res) => {
  try {
    const id = req.params.id;
    const quantity = parseInt(req.params.quantity);
    let product = await Product.find({ 
      _id: id
    });
    if (!product || product.length < 1) {
      //If the product doesn't exist, return an error code.
      res.sendStatus(404);
    } else {
      const cart = await getCart();
      let items = cart.items
      const item = items.find(item => item.id == id);
      if (item) {
        item.quantity = quantity;
        if (quantity == 0) {
          cart.items = items.filter((item) => item.id != id)
        }
        await cart.save();
        console.log('cart' + cart);
        res.send(item);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await getCart();
    let items = cart.items
    cart.items = items.filter((item) => item.id != id);
    cart.save();
    res.send(cart.items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


  app.get('/api/products', async (req, res) => {
    try {
      let products = await Product.find();
      console.log('product' + products);
      res.send(products);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      let product = await Product.find({ 
        _id: req.params.id 
      });
      console.log('product' + product);
      res.send(product[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/products', async (req, res) => {
    const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  try {
    await product.save();
    console.log('product' + product);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));