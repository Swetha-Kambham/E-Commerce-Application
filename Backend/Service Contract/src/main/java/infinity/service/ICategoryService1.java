package infinity.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import infinity.service.contracts.DeleteCategoryParameter;
import infinity.service.contracts.GetCategoryParameter;
import infinity.service.contracts.PutCategoryParameter;
import infinity.service.contracts.category.CategoryReference1;
import infinity.service.implementation.CategoryService1;

@RestController
@RequestMapping("/CategoryService1/*")
public class ICategoryService1 {

	CategoryService1 service = new CategoryService1();

	@RequestMapping(value = "/GetCategory", method = RequestMethod.POST)
	public CategoryReference1 getCategory(@RequestBody GetCategoryParameter input) {

		return service.getCategory(input.target);
	}

	@RequestMapping(value = "/PutCategory", method = RequestMethod.POST)
	public void putCategory(@RequestBody PutCategoryParameter input) {

		service.putCategory(input.target, input.category);

	}

	@RequestMapping(value = "/DeleteCategory", method = RequestMethod.POST)
	public void deleteCategory(@RequestBody DeleteCategoryParameter input) {

		service.deleteCategory(input.target);

	}

	@RequestMapping(value = "/GetAllCategories", method = RequestMethod.POST)
	public CategoryReference1[] getAllCategories() throws Exception {

		return service.getAllCategories();

	}

}
