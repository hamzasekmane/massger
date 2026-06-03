export const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    vendor
    tags
    availableForSale
    options { id name values }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage { url altText width height }
    images(first: 10) {
      edges { node { url altText width height } }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ...ProductFields }
  }
`;

export const GET_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int = 12) {
    products(first: $first) {
      edges { node { ...ProductFields } }
    }
  }
`;

export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost { totalAmount { amount currencyCode } }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions { name value }
              price { amount currencyCode }
              product {
                title
                handle
                featuredImage { url altText width height }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CART = /* GraphQL */ `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
`;
