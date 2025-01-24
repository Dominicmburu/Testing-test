function calculateTotal(products) {
  let total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  if (total > 100) {
    total *= 0.9;
  }

  total *= 1.08;

  return total;
}

console.log(
  calculateTotal([
    { price: 100, quantity: 2 },
    { price: 50, quantity: 3 },
  ])
);


function calculateEmployeePay(baseSalary, hoursWorked) {
  let overtimePay = 0;
  let taxDeduction = 0;
  const overtimeRate = 1.5;

  if (hoursWorked > 40) {
    overtimePay = (hoursWorked - 40) * (baseSalary / 40) * overtimeRate;
  }

  if (baseSalary > 50000) {
    taxDeduction = baseSalary * 0.3;
  } else if (baseSalary > 30000) {
    taxDeduction = baseSalary * 0.2;
  } else {
    taxDeduction = baseSalary * 0.1;
  }

  return baseSalary + overtimePay - taxDeduction;
}


function applyCartDiscounts(cartItems, couponCode) {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
    if (item.quantity > 5) {
      total -= item.price * item.quantity * 0.1;
    }

    if (item.category === "electronics") {
      total -= item.price * item.quantity * 0.15;
    }
  });

  if (new Date().getMonth() === 11) {
    total *= 0.9;
  }

  if (couponCode === "DISCOUNT10") {
    total *= 0.9;
  }

  return total;
}


const axios = require("axios");

async function fetchPost(postId) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch post");
  }
}

module.exports = {
  calculateTotal,
  calculateEmployeePay,
  applyCartDiscounts,
  fetchPost,
};
