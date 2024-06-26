const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const path = require('path');



const PORT = process.env.PORT || 4242

const app = express()

const { connectToDatabase } = require('./database/connection.js');
connectToDatabase()

const { upload } = require('./middleware/multer.js'); 
const {createProduct, deleteProduct, editProduct, productdetails, productimage } = require('./controller/product.js')
const {adminlogin, createAdmin} = require('./controller/admin.js')
const {contact, addcontact} = require('./controller/contact.js')
const {loginuser, createuser} = require('./controller/user.js')
const {checkoutproduct, success, checkoutcart, successcart} = require('./controller/checkout.js')
const {orderdetails} = require('./controller/order.js')

// const corsOptions = {
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };

app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(bodyParser.json({ limit: '500mb' }));
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.set('view engine', 'ejs');


app.post('/login', adminlogin)
app.post('/admin/add', createAdmin)
app.delete('/products/:id', deleteProduct )
app.put('/products/:productId', editProduct)
app.post('/products',  upload.single('image'), createProduct)
app.get('/contacts' , contact)
app.get('/products/:productId', productdetails )
app.get('/api/images', productimage)
app.post('/contact', addcontact)
app.post('/createuser', createuser )
app.post('/user', loginuser)
app.post('/checkout/:productId', checkoutproduct)
app.post('/success', success)
app.post('/checkout', checkoutcart)
app.post('/successcart', successcart)
app.get('/orders', orderdetails)
 

app.listen(PORT,()=>console.log(`Server is Running on Port ${PORT}`))