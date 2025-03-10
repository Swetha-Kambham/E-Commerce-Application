package infinity.service.contracts.order;

import infinity.service.contracts.common.AddressReference1;
import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.common.UserDetails2;

public class OrderPreview {

	public Integer draftId;

	public Double orderTotal;

	public CurrencyReference1 currency;

	public String status;

	public UserDetails2 user;

	public AddressReference1 billingAddress;

	public AddressReference1 shippingAddress;

	public OrderItemDetail1[] orderItems;

}
