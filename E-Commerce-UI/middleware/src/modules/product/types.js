import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    products(page: Int!, pageSize: Int, filters: ProductFilters): [Product]
    product(id: String!): Product
    pageOfProductUnits(
      page: Int!
      pageSize: Int
      filters: ProductFilters
    ): [ProductUnit]
    productUnitDetail(
      productId: String
      productSlug: String
      skuId: String
      sku: String
    ): ProductUnit
    signedUrlForProductSKUImages(
      productId: String!
      skuId: String!
      images: [SignedUrlForUploadImageInput]
    ): [SignedUrl]
  }

  extend type Mutation {
    putProduct(input: PutProductInput): PutProductResult
    putProductOptionAndValues(input: PutProductOptionAndValuesInput): Boolean
    deleteProductOption(input: DeleteProductOptionInput): Boolean
    deleteProductOptionValue(input: DeleteProductOptionValueInput): Boolean
    updateProductBasicDetails(
      productId: String!
      input: UpdateProductBasicDetailsInput
    ): Boolean
    updateProductDescription(productId: String!, description: String): Boolean
    updateProductTag(productId: String!, tags: [String]): Boolean
    updateProductLocationTag(
      productId: String!
      locationTags: [String]
    ): Boolean
    putProductSKU(
      productId: String!
      skuId: String
      skuInput: ProductSKUInput!
    ): PutProductSKUResult
    deleteProductSKU(productId: String!, skuId: String!): Boolean
    updateProductSKUPricePerUnit(
      productId: String!
      skuId: String!
      pricePerUnit: Money!
    ): Boolean
    updateProductSKUSellingPricePerUnit(
      productId: String!
      skuId: String!
      sellingPricePerUnit: Float!
    ): Boolean
    updateProductSKUQuantity(
      productId: String!
      skuId: String!
      quantity: Int
    ): Boolean
    updateProductStatus(
      productId: String!
      status: String!
      remark: String
    ): Boolean
  }

  extend type Product {
    productOptionAndValues: [OptionAndValues]
    productSkus: [ProductSkusResult]
  }

  input PutProductOptionAndValuesInput {
    productId: String
    productOptionValue: [ProductOptionValueInput]
  }

  input DeleteProductOptionInput {
    productId: String
    optionId: String
  }

  input DeleteProductOptionValueInput {
    productId: String
    optionId: String
    valueId: String
  }

  input ProductFilters {
    sellerIds: [String]
    productIds: [String]
    skuIds: [String]
    categoryIds: [String]
    textSearch: String
  }

  input PutProductInput {
    name: String!
    commonName: String
    categoryId: Int!
    sellerId: String!
  }

  input UpdateProductBasicDetailsInput {
    name: String!
    commonName: String
    categoryId: Int!
  }

  input ProductSKUInput {
    quantity: Int
    code: String
    currencyId: String
    pricePerUnit: Float
    sellingPricePerUnit: Float
    optionAndValues: [OptionValueInput]
  }

  input OptionValueInput {
    optionId: String
    valueId: String
  }

  input ProductOptionValueInput {
    optionName: String
    values: [String]
  }

  type OptionAndValues {
    option: ProductOption
    values: [ProductOptionValue]
  }

  type ProductOption {
    id: String!
    name: String!
  }

  type ProductOptionValue {
    id: String!
    name: String!
  }

  type ProductSkusResult {
    id: String
    sku: String
    quantity: Int
    currency: Currency
    pricePerUnit: Float
    sellingPricePerUnit: Float
    specifications: [OptionValueReferece]
    images: [ImageResult]
  }

  type ImageResult {
    key: String
    url: String
  }

  type OptionValueReferece {
    option: String
    value: String
    optionId: String
    valueId: String
  }

  type PutProductResult {
    id: String
    name: String
  }

  type PutProductSKUResult {
    id: String
    productId: String
    sku: String
  }

  type ProductUnit {
    id: String
    productId: String
    name: String
    slug: String
    commonName: String
    description: String
    category: ObjectReference
    seller: SellerReference
    skuId: String
    sku: String
    quantityInStock: Int
    currency: Currency
    pricePerUnit: Float
    sellingPricePerUnit: Float
    specifications: [OptionValueReferece]
    images: [ImageResult]
  }

  type ProductUnitReference {
    productId: String
    slug: String
    skuId: String
    sku: String
  }

  type Product {
    id: String
    name: String
    slug: String
    commonName: String
    description: String
    tags: [String]
    category: ObjectReference
    seller: SellerReference
    locationTags: [String]
    status: String
    statusRemark: String
    enabled: Boolean
  }
`;
