package infinity.service;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import infinity.service.contracts.order.OrderItemDetail2;
import infinity.service.contracts.order.OrderItemDetail3;
import infinity.service.contracts.order.OrderPreview;
import infinity.service.contracts.order.OrderReference1;
import infinity.service.contracts.product.ProductUnitReference1;
import infinity.service.contracts.ArchiveOrderParameter;
import infinity.service.contracts.CreatePaymentTokenParameter;
import infinity.service.contracts.DraftOrderParameter;
import infinity.service.contracts.GetInvoiceDetailsParameter;
import infinity.service.contracts.GetOrderItemDetailsParameter;
import infinity.service.contracts.GetOrderItemsForSellerParameter;
import infinity.service.contracts.GetOrderItemsForUserParameter;
import infinity.service.contracts.GetOrderItemsParameter;
import infinity.service.contracts.GetOrderPreviewParameter;
import infinity.service.contracts.GetPaymentStatusParameter;
import infinity.service.contracts.GetProductUnitReferenceForOrderItem;
import infinity.service.contracts.MarkOrderAsCancelledParameter;
import infinity.service.contracts.MarkOrderAsConfirmedParameter;
import infinity.service.contracts.MarkOrderAsPendingParameter;
import infinity.service.contracts.MarkOrderItemAsCancelledParameter;
import infinity.service.contracts.PutOrderAddressParameter;
import infinity.service.contracts.order.CashFreeOrderDetails;
import infinity.service.contracts.order.InvoiceDetails1;

@RestController
@RequestMapping("/OrderService1/*")
public interface IOrderService1 {

	@RequestMapping(value = "/DraftOrder", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public OrderReference1 draftOrder(@RequestBody DraftOrderParameter input);

	@RequestMapping(value = "/GetOrderPreview", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public OrderPreview getOrderPreview(@RequestBody GetOrderPreviewParameter input);

	@RequestMapping(value = "/PutOrderAddress", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void putOrderAddress(@RequestBody PutOrderAddressParameter input);

	@RequestMapping(value = "/MarkOrderAsPending", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void markOrderAsPending(@RequestBody MarkOrderAsPendingParameter input);

	@RequestMapping(value = "/ArchiveOrder", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void archiveOrder(@RequestBody ArchiveOrderParameter input);

	@RequestMapping(value = "/CreatePaymentToken", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public CashFreeOrderDetails createPaymentToken(@RequestBody CreatePaymentTokenParameter input);

	@RequestMapping(value = "/GetPaymentStatus", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public CashFreeOrderDetails getPaymentStatus(@RequestBody GetPaymentStatusParameter input);

	@RequestMapping(value = "/MarkOrderAsConfirmed", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void markOrderAsConfirmed(@RequestBody MarkOrderAsConfirmedParameter input);

	@RequestMapping(value = "/MarkOrderAsCancelled", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void markOrderAsCancelled(@RequestBody MarkOrderAsCancelledParameter input);

	@RequestMapping(value = "/MarkOrderItemAsCancelled", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public void markOrderItemAsCancelled(@RequestBody MarkOrderItemAsCancelledParameter input);

	@RequestMapping(value = "/GetOrderItems", method = RequestMethod.POST)
	@Secured({ "ROLE_ADMIN" })
	public OrderItemDetail2[] getOrderItems(@RequestBody GetOrderItemsParameter input);

	@RequestMapping(value = "/GetOrderItemsForUser", method = RequestMethod.POST)
	@Secured({ "ROLE_USER" })
	public OrderItemDetail2[] getOrderItemsForUser(@RequestBody GetOrderItemsForUserParameter input);

	@RequestMapping(value = "/GetOrderItemsForSeller", method = RequestMethod.POST)
	@Secured({ "ROLE_SELLER" })
	public OrderItemDetail2[] getOrderItemsForSeller(@RequestBody GetOrderItemsForSellerParameter input);

	@Secured({ "ROLE_USER", "ROLE_SELLER", "ROLE_ADMIN" })
	@RequestMapping(value = "/GetOrderItemDetails", method = RequestMethod.POST)
	public OrderItemDetail3 getOrderItemDetails(@RequestBody GetOrderItemDetailsParameter input);

	@Secured({ "ROLE_USER", "ROLE_SELLER", "ROLE_ADMIN" })
	@RequestMapping(value = "/GetProductUnitReferenceForOrderItem", method = RequestMethod.POST)
	public ProductUnitReference1 getProductUnitReferenceForOrderItem(
			@RequestBody GetProductUnitReferenceForOrderItem input);

	@Secured({ "ROLE_USER", "ROLE_SELLER", "ROLE_ADMIN" })
	@RequestMapping(value = "/GetInvoiceDetails", method = RequestMethod.POST)
	public InvoiceDetails1 getInvoiceDetails(@RequestBody GetInvoiceDetailsParameter input);

}
