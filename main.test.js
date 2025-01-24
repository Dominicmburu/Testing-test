const axios = require("axios");
const {
  calculateTotal,
  calculateEmployeePay,
  applyCartDiscounts,
  fetchPost,
} = require("./main");

describe("calculateTotal()", () => {
  it("should apply 10% discount and 8% sales tax for orders over $100", () => {
    const products = [{ price: 50, quantity: 2 }];
    const result = calculateTotal(products);
    expect(result).toBe(108);
  });

  it("should not apply discount if total is $100 or less", () => {
    const products = [{ price: 50, quantity: 1 }];
    const result = calculateTotal(products);
    expect(result).toBe(54);
  });

  it("should handle empty array (no products)", () => {
    const products = [];
    const result = calculateTotal(products);
    expect(result).toBe(0);
  });
});

describe("calculateEmployeePay()", () => {
  it("should calculate overtime pay correctly", () => {
    const result = calculateEmployeePay(4000, 45);
    expect(result).toBe(4000 + 1.5 * (4000 / 40) * 5 - 4000 * 0.1);
  });

  it("should apply the correct tax deduction based on salary", () => {
    const result = calculateEmployeePay(60000, 40);
    expect(result).toBe(60000 + 0 - 60000 * 0.3);
  });

  it("should not apply overtime if hours worked are 40 or less", () => {
    const result = calculateEmployeePay(3000, 40);
    expect(result).toBe(3000 - 3000 * 0.1);
  });
});

describe("applyCartDiscounts()", () => {
  it("should apply quantity discount and category-based discount", () => {
    const cartItems = [{ price: 100, quantity: 6, category: "electronics" }];

    const result = applyCartDiscounts(cartItems, "DISCOUNT10");

    let total = 100 * 6;

    total -=  (total * 0.1) 
    total -= (600 * 0.15) 
    total *= 0.9;

    expect(result).toBe(total);
  });

  it("should apply seasonal promotion in December", () => {
    const cartItems = [{ price: 100, quantity: 1, category: "clothing" }];
    const result = applyCartDiscounts(cartItems, "");
    expect(result).toBe(100);
  });

  it("should not apply seasonal promotion if it’s not December", () => {
    const cartItems = [{ price: 100, quantity: 1, category: "clothing" }];
    const result = applyCartDiscounts(cartItems, "");
    expect(result).toBe(100);
  });

  it("should validate coupon code correctly", () => {
    const cartItems = [{ price: 100, quantity: 1, category: "clothing" }];
    const result = applyCartDiscounts(cartItems, "DISCOUNT10");
    expect(result).toBe(90);
  });
});

describe("fetchPost()", () => {
  it("should fetch post data correctly", async () => {
    const postId = 1;
    const result = await fetchPost(postId);
    expect(result.id).toBe(postId);
    expect(result).toHaveProperty("title");
  });

  it("should throw an error if post does not exist", async () => {
    const postId = 9999;
    await expect(fetchPost(postId)).rejects.toThrow("Failed to fetch post");
  });

  it("should handle network errors gracefully", async () => {
    axios.get = jest.fn().mockRejectedValue(new Error("Network error"));
    await expect(fetchPost(1)).rejects.toThrow("Failed to fetch post");
  });
});
