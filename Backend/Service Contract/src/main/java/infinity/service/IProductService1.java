package infinity.service;

import java.util.UUID;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.product.ProductSKUDetails1;
import infinity.service.contracts.product.ProductSKUReference1;
import infinity.service.contracts.product.ProductDetails2;
import infinity.service.contracts.product.ProductUnitDetails1;
import infinity.service.contracts.ChangeProductStatusParameter;
import infinity.service.contracts.DeleteProductOptionParameter;
import infinity.service.contracts.DeleteProductOptionValueParameter;
import infinity.service.contracts.DeleteProductSKUParameter;
import infinity.service.contracts.GetAllProductsParameter;
import infinity.service.contracts.GetPageOfProductsParameter;
import infinity.service.contracts.GetProductDetailsParameter;
import infinity.service.contracts.GetProductOptionAndValuesParameter;
import infinity.service.contracts.GetProductSkusParameter;
import infinity.service.contracts.GetProductUnitDetailParameter;
import infinity.service.contracts.PutProductOptionAndValuesParameter;
import infinity.service.contracts.PutProductParameter;
import infinity.service.contracts.PutProductSKUParameter;
import infinity.service.contracts.UpdateProductBasicDetailsParameter;
import infinity.service.contracts.UpdateProductDescriptionParameter;
import infinity.service.contracts.UpdateProductLocationTagParameter;
import infinity.service.contracts.UpdateProductTagParameter;
import infinity.service.contracts.product.ProductDetails1;
import infinity.service.contracts.product.ProductOptionValuesDetails1;
import infinity.service.contracts.product.ProductReference1;
import infinity.service.implementation.ProductService1;

@RestController
@RequestMapping("/ProductService1/*")
public class IProductService1 {

	ProductService1 service = new ProductService1();

	@RequestMapping(value = "/PutProduct", method = RequestMethod.POST)
	public ProductReference1 putProduct(@RequestBody PutProductParameter input) throws Exception {

		return service.putProduct(input.product);

	}

	@RequestMapping(value = "/UpdateProductBasicDetails", method = RequestMethod.POST)
	public void updateProductBasicDetails(@RequestBody UpdateProductBasicDetailsParameter input) throws Exception {
		service.updateProductBasicDetails(input.target, input.product);
	}

	@RequestMapping(value = "/UpdateProductDescription", method = RequestMethod.POST)
	public void updateProductDescription(@RequestBody UpdateProductDescriptionParameter input) throws Exception {
		service.updateProductDescription(input.target, input.description);
	}

	@RequestMapping(value = "/UpdateProductTag", method = RequestMethod.POST)
	public void updateProductTag(@RequestBody UpdateProductTagParameter input) throws Exception {
		service.updateProductTag(input.target, input.tags);
	}

	@RequestMapping(value = "/UpdateProductLocationTag", method = RequestMethod.POST)
	public void updateProductLocationTag(@RequestBody UpdateProductLocationTagParameter input) throws Exception {
		service.updateProductLocationTag(input.target, input.locationTags);
	}

	@RequestMapping(value = "/GetProductOptionAndValues", method = RequestMethod.POST)
	public ProductOptionValuesDetails1[] getProductOptionAndValues(
			@RequestBody GetProductOptionAndValuesParameter input) throws Exception {

		return service.getProductOptionAndValues(input.target);

	}

	@RequestMapping(value = "/GetProductSkus", method = RequestMethod.POST)
	public ProductSKUDetails1[] getProductSkus(@RequestBody GetProductSkusParameter input) throws Exception {

		return service.getProductSkus(input.target);

	}

	@RequestMapping(value = "/DeleteProductOption", method = RequestMethod.POST)
	public void deleteProductOption(@RequestBody DeleteProductOptionParameter input) throws Exception {
		service.deleteProductOption(input.product, input.target);
	}

	@RequestMapping(value = "/PutProductOptionAndValues", method = RequestMethod.POST)
	public void putProductOptionAndValues(@RequestBody PutProductOptionAndValuesParameter input) throws Exception {

		service.addProductOptionAndValues(input.target, input.productOptionValue);

	}

	@RequestMapping(value = "/DeleteProductOptionValue", method = RequestMethod.POST)
	public void deleteProductOptionValue(@RequestBody DeleteProductOptionValueParameter input) throws Exception {

		service.deleteProductOptionValue(input.product, input.option, UUID.fromString(input.valueId));

	}

	@RequestMapping(value = "/GetProductDetails", method = RequestMethod.POST)
	public ProductDetails1 getProductDetails(@RequestBody GetProductDetailsParameter input) throws Exception {
		return service.getProductDetails(input.target);
	}

	@RequestMapping(value = "/PutProductSKU", method = RequestMethod.POST)
	public ProductSKUReference1 putProductSKU(@RequestBody PutProductSKUParameter input) throws Exception {
		return service.putProductSKU(input.target, input.sku, input.skuDetails);
	}

	@RequestMapping(value = "/DeleteProductSKU", method = RequestMethod.POST)
	public void deleteProductSKU(@RequestBody DeleteProductSKUParameter input) throws Exception {
		service.deleteProductSKU(input.product, input.target);

	}

//	@RequestMapping(value = "/UpdateProductSKUPricePerUnit", method = RequestMethod.POST)
//	public void updateProductSKUPricePerUnit(@RequestBody UpdateProductSKUPricePerUnitParameter input)
//			throws Exception {
//		service.updateProductSKUPricePerUnit(input.target, input.pricePerUnit);
//
//	}
//
//	@RequestMapping(value = "/UpdateProductSKUSellingPricePerUnit", method = RequestMethod.POST)
//	public void updateProductSKUSellingPricePerUnit(@RequestBody UpdateProductSKUSellingPricePerUnitParameter input)
//			throws Exception {
//		service.updateProductSKUSellingPricePerUnit(input.target, input.sellingPricePerUnit);
//
//	}
//
//	@RequestMapping(value = "/UpdateProductSKUQuantity", method = RequestMethod.POST)
//	public void updateProductSKUQuantity(@RequestBody updateProductSKUQuantityParameter input) throws Exception {
//		service.updateProductSKUQuantity(input.target, input.quantity);
//	}

	@RequestMapping(value = "/GetAllProducts", method = RequestMethod.POST)
	public ProductDetails2[] getAllProducts(@RequestBody GetAllProductsParameter input) {
		return service.getPageOfProducts(input.page, input.pageSize, input.filters);
	}

	@RequestMapping(value = "/GetPageOfProductUnits", method = RequestMethod.POST)
	public ProductUnitDetails1[] getPageOfProductUnits(@RequestBody GetPageOfProductsParameter input) {
		return service.getPageOfProductUnits(input.page, input.pageSize, input.filters);
	}

	@RequestMapping(value = "/GetProductUnitDetail", method = RequestMethod.POST)
	public ProductUnitDetails1 getProductUnitDetail(@RequestBody GetProductUnitDetailParameter input) {
		return service.getProductUnitDetail(input.product, input.sku);
	}

	@RequestMapping(value = "/ChangeProductStatus", method = RequestMethod.POST)
	public void changeProductStatus(@RequestBody ChangeProductStatusParameter input) {
		service.changeProductStatus(input.product, input.status, input.remark);
	}

}
