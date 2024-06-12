class User {
  constructor(username, mobileNumber, emailId, addressList, ordersList = [], cartList = []) {
    this.username = username;
    this.mobileNumber = mobileNumber;
    this.emailId = emailId;
    this.addressList = addressList;
    this.ordersList = ordersList;
    this.cartList = cartList;
    this.addProfileToAdmin();
  }

  addProfileToAdmin() {
    Admin.addCustomerDetails(this.viewProfile());
  }

  viewProfile() {
    let profileData = [];

    profileData.push("Username: " + this.username);
    profileData.push("Mobile Number: " + this.mobileNumber);
    profileData.push("Email: " + this.emailId);
    profileData.push("Address List: " + this.addressList);


    profileData.push("Orders List:");
    for (const order of this.ordersList) {
      profileData.push(order.displayOrderDetails());
    }


    let cartItems = this.cartList.map(product => {
      return `{ ID: ${product.productId}, product name: ${product.productTitle}, productCategory: ${product.productCategory}, ProductDescription: ${product.productDescription}, Price: ${product.price}}`;
    }).join("; ");
    profileData.push("Cart List: " + cartItems);

    return profileData;
  }


  editProfile(newUsername, newMobileNumber, newEmailId) {
    this.username = newUsername;
    this.mobileNumber = newMobileNumber;
    this.emailId = newEmailId;
    console.log("Profile updated successfully!");
  }

  addToCart(product) {
    this.cartList.push(product);
    console.log(product.productTitle + " added to cart!");
  }

  removeFromCart(product) {
    const index = this.cartList.findIndex(item => item.productId === product.productId);
    if (index !== -1) {
      this.cartList.splice(index, 1);
      console.log(product.productTitle + " removed from cart!");
    } else {
      console.log("Product not found in cart!");
    }
  }

  calculateTotalPrice(products) {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.price;
    }
    return totalPrice;
  }

  calculateCartTotal() {
    let total = 0;
    for (const product of this.cartList) {
      total += product.price;
    }
    console.log("Total price in cart: Rs" + total);
    return total;
  }
  proceedToBuyProduct(user, products) {
    const totalPrice = user.calculateTotalPrice(products);
    var productbuy = products
    console.log("Total price for selected products: Rs" + totalPrice);

    const order = new Orders(user, products);
    user.ordersList.push(order);

    for (const product of products) {
      const index = user.cartList.findIndex(item => item.productId === product.productId);
      if (index !== -1) {
        user.cartList.splice(index, 1);
      } else {
        console.log("Product not found in cart: " + product.productTitle);
      }
    }


    return order;
  }

  displayOrderDetails() {
    let orderDetails = [];
    for (const order of this.ordersList) {
      orderDetails += order.displayOrderDetails();
    }
    return orderDetails;
  }
}


class Admin extends User {
  static customerDetails = [];

  static addCustomerDetails(user) {
    this.customerDetails.push(user);

  }
}

class Cart {
  constructor() {
    this.cartList = [];
  }

  addToCart(user, product) {
    user.addToCart(product);
  }

  removeFromCart(user, product) {
    user.removeFromCart(product);
  }

  viewCart(user) {
    user.viewProfile();
  }

  buySelectedProducts(user, products) {
    const totalPrice = user.calculateTotalPrice(products);
    console.log("Total price for selected products: Rs" + totalPrice);

    for (const product of products) {
      const index = user.cartList.findIndex(item => item.productId === product.productId);
      if (index !== -1) {
        user.proceedToBuyProduct(user.cartList[index]);
        user.cartList.splice(index, 1);
      } else {
        console.log("Product not found in cart: " + product.productTitle);
      }
    }
  }

  proceedToBuyProduct(user, products) {
    const totalPrice = user.calculateTotalPrice(products);
    console.log("Total price for selected products: Rs" + totalPrice);

    const order = new Orders(user, products);
    user.ordersList.push(order);

    for (const product of products) {
      const index = user.cartList.findIndex(item => item.productId === product.productId);
      if (index !== -1) {
        user.cartList.splice(index, 1);
      } else {
        console.log("Product not found in cart: " + product.productTitle);
      }
    }
  }
}

class Orders {
  constructor(user, products) {
    this.user = user;
    this.products = products;
    this.totalPrice = this.calculateTotalPrice();
    this.orderId = this.generateOrderId();
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    for (const product of this.products) {
      totalPrice += product.price;
    }
    return totalPrice;
  }

  generateOrderId() {
    return Math.random().toString(36).substr(2, 9);
  }

  displayOrderDetails() {
    let orderDetails = "";

    orderDetails += "Order ID: " + this.orderId + "\n";
    orderDetails += "User: " + this.user.username + "\n";
    orderDetails += "Mobile Number: " + this.user.mobileNumber + "\n";
    orderDetails += "Address: " + this.user.addressList + "\n";
    orderDetails += "Products:\n";

    for (const product of this.products) {
      orderDetails += "Product ID: " + product.productId + "\n";
      orderDetails += "Product Name: " + product.productTitle + "\n";
      orderDetails += "Product Price: " + product.price + "\n";
      orderDetails += "--------------\n";
    }

    orderDetails += "Total Price: " + this.totalPrice + "\n";

    return orderDetails;
  }
}


class Product {
  constructor(productId, productCategory, productTitle, productDescription, price, color, size, dimension, weight) {
    this.productId = productId;
    this.productCategory = productCategory;
    this.productTitle = productTitle;
    this.productDescription = productDescription;
    this.price = price;
    this.color = color;
    this.size = size;
    this.dimension = dimension;
    this.weight = weight;
  }
}

class Electronics extends Product {
  constructor(productId, productTitle, productDescription, price, color, size, dimension, weight) {
    super(productId, productTitle, productDescription, price, color, size, dimension, weight);
  }
}

class Clothing extends Product {
  constructor(productId, productTitle, productDescription, price, color, size, dimension, weight) {
    super(productId, productTitle, productDescription, price, color, size, dimension, weight);
  }
}

class Books extends Product {
  constructor(productId, productTitle, productDescription, price, color, size, dimension, weight) {
    super(productId, productTitle, productDescription, price, color, size, dimension, weight);
  }
}

class HomeApplication extends Product {
  constructor(productId, productTitle, productDescription, price, color, size, dimension, weight) {
    super(productId, productTitle, productDescription, price, color, size, dimension, weight);
  }
}

class SportsEquipment extends Product {
  constructor(productId, productTitle, productDescription, price, color, size, dimension, weight) {
    super(productId, productTitle, productDescription, price, color, size, dimension, weight);
  }
}
class Wishlist {
  constructor() {
    this.liked = [];
  }

  likeProduct(product) {
    this.liked.push(product);
  }

  getLikedProducts() {
    return this.liked;
  }
}




const user = new User("John Doe", "1234567890", "john@example.com", "Address-1234");
const cart = new Cart();


const product1 = new Electronics("1", "Smartphone", "Latest smartphone", " fast and advance futures", 55000, "Black", "Medium", "5x3x0.3 inches", "0.2 kg");
const product2 = new Clothing("2", "T-shirt", "Cotton T-shirt", "Confort and quality", 550, "Blue", "Large", "40x30x2 cm", "0.3 kg");
const product3 = new SportsEquipment("3", "Bat", "Dhoni Bat", "When use this bat in cricket it feel your Dhoni", 2400, "40x30x2 cm", "0.3 kg");

const product4 = new HomeApplication("4", "Refrigerator", "double Door refrigerator", "New model", 85000, "grey", "Medium", "5x3x0.3 inches", "0.2 kg");
const product5 = new Clothing("5", "kurtis", "silk clothe", "Confort and quality", 550, "Blue", "medium");
const product6 = new SportsEquipment("6", "tennis", "Tennis kit ", "serving the ball over the net, rallies (when the ball is hit back and forth between opponents), fast movements and strategic game play.", 15500);

const Wish = new Wishlist();
Wish.likeProduct(product1);
Wish.likeProduct(product2);
console.log(Wish.getLikedProducts());

cart.addToCart(user, product1);
cart.addToCart(user, product2);
cart.addToCart(user, product3);
cart.addToCart(user, product4);
cart.addToCart(user, product5);
cart.addToCart(user, product6);
console.log(user.viewProfile());
console.log(user.calculateCartTotal());

const productsToBuy = [product1, product3];
const order = new Orders(user, productsToBuy);

const orderDetailsString = order.displayOrderDetails();
console.log(orderDetailsString);
cart.proceedToBuyProduct(user, productsToBuy);

console.log(user.viewProfile());
console.log(Admin.customerDetails)