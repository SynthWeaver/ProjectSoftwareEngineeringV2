import { shallowMount } from "@vue/test-utils";
import ShoppingCart from "@/components/ShoppingCart.vue";

let wrapper = null;

let pillendoosje = { id: 1, name: "pillendoosje", price: 5.4 };
let oorbel = { id: 2, name: "oorbel", price: 2.1 };
let stokbrood = { id: 3, name: "stokbrood", price: 19.95 };

const dummyCatalog = [pillendoosje, oorbel, stokbrood];

function addCatalogItemsToCart() {
  dummyCatalog.forEach((element) => wrapper.vm.addToCart(element));
}

beforeEach(() => {
  wrapper = shallowMount(ShoppingCart);
});
afterEach(() => {
  wrapper.destroy();
});

describe("Initialize shopping cart", () => {
  test("Shopping cart should have no items", () => {
    expect(wrapper.vm.items.length).toBe(0);
  });
});

describe("Add item to shopping cart", () => {
  test("Shopping cart should contain the same amount of items as 'dummyCatalog' ", () => {
    addCatalogItemsToCart();
    expect(wrapper.vm.items.length).toBe(dummyCatalog.length); //3
  });
});

describe("Remove item from shopping cart", () => {
  test("Pillendoosje should be removed from shopping cart ", () => {
    addCatalogItemsToCart();
    expect(wrapper.vm.items.includes(pillendoosje)).toBe(true);
    wrapper.vm.removeFromCart(pillendoosje);
    expect(wrapper.vm.items.includes(pillendoosje)).toBe(false);
  });
});

describe("Total price of items in cart", () => {
  test("The total price of 0 items should be 0.00", () => {
    expect(wrapper.vm.subtotal).toBe(0.0);
  });
});

describe("Total price of items in cart", () => {
  test("The total price of all dummyCatalog items (27.45) should match with the subtotal of the shopping cart", () => {
    addCatalogItemsToCart();
    expect(wrapper.vm.subtotal).toBe(27.45);
  });
});

describe("Total price of items in cart", () => {
  test("The total price of all dummyCatalog items (27.45) should match with the subtotal of the shopping cart", () => {
    addCatalogItemsToCart();
    expect(wrapper.vm.subtotal).toBe(27.45);
  });
});

describe("Total price should exceed the minimum amount to make an order", () => {
  test("The total price of all dummyCatalog items (27.45) should match with the subtotal of the shopping cart", () => {
    addCatalogItemsToCart();
    expect(wrapper.vm.subtotal).toBe(27.45);
    expect(wrapper.vm.orderAllowed()).toBe(false);
  });
});
