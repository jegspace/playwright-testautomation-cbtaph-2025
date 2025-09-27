import { faker } from '@faker-js/faker';

/**
 * Generate fake customer data
 */
export function generateCustomerData(browserName = 'browser') {
  const randomNumber = faker.number.int({ min: 10, max: 99 }); // ✅ updated
  const usernameBase = faker.internet.username().slice(0, 8).toLowerCase();
  const username = `${usernameBase}_${browserName}_${randomNumber}`;

  return {
    firstName: faker.person.firstName(),  // ✅ faker.name → faker.person
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(), // ✅ faker.address → faker.location
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    username: username,
    password: 'Passw0rd!', // strong default test password
  };
}

/**
 * Generate fake product data
 */
export function generateProductData() {
  return {
    productName: faker.commerce.productName(),
    productDescription: faker.commerce.productDescription(),
    productPrice: faker.commerce.price(),
  };
}

/**
 * Generate fake contact form data
 */
export function generateContactFormData() {
  return {
    fullName: `${faker.person.firstName()} ${faker.person.lastName()}`, // ✅ faker.name → faker.person
    email: faker.internet.email().toLowerCase(),
    subject: faker.lorem.words(faker.number.int({ min: 3, max: 6 })), // ✅ faker.datatype → faker.number.int
    message: faker.lorem.paragraph(faker.number.int({ min: 1, max: 2 })),
  };
}
