package infinity.service;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.AddOrUpdateProductUnitsToProductViewParameter;
import infinity.service.contracts.DeleteProductViewParameter;
import infinity.service.contracts.GetPageOfProductViewParameter;
import infinity.service.contracts.GetProductViewDetailsParameter;
import infinity.service.contracts.PutProductViewParameter;
import infinity.service.contracts.product.ProductViewDetails1;

@RestController
@RequestMapping("/ProductService2/*")
public interface IProductService2 {

	@RequestMapping(value = "/PutProductView", method = RequestMethod.POST)
	@Secured({ "ROLE_ADMIN" })
	public ProductViewDetails1 putProductView(@RequestBody PutProductViewParameter input);

	@RequestMapping(value = "/AddOrUpdateProductUnitsToProductView", method = RequestMethod.POST)
	@Secured({ "ROLE_ADMIN" })
	public void addOrUpdateProductUnitsToProductView(@RequestBody AddOrUpdateProductUnitsToProductViewParameter input);

	@RequestMapping(value = "/DeleteProductView", method = RequestMethod.POST)
	@Secured({ "ROLE_ADMIN" })
	public void deleteProductView(@RequestBody DeleteProductViewParameter input);

	@RequestMapping(value = "/GetProductViewDetails", method = RequestMethod.POST)
	public ProductViewDetails1 getProductViewDetails(@RequestBody GetProductViewDetailsParameter input)
			throws Exception;

	@RequestMapping(value = "/GetPageOfProductView", method = RequestMethod.POST)
	public ProductViewDetails1[] getPageOfProductView(@RequestBody GetPageOfProductViewParameter input);

}
