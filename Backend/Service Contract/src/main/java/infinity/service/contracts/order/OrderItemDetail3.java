package infinity.service.contracts.order;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import infinity.service.contracts.common.AddressReference1;
import infinity.service.contracts.common.CurrencyReference1;
import infinity.service.contracts.common.UserDetails2;
import infinity.service.contracts.seller.SellerReference3;

public class OrderItemDetail3 {

	public String id;

	public String orderId;

	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date orderDate;

	public Integer quantity;

	public String productName;

	public SellerReference3 seller;

	public UserDetails2 user;

	public Double sellingPrice;

	public Double originalPrice;

	public Double totalPrice;

	public CurrencyReference1 currency;

	public String orderItemStatus;

	public AddressReference1 shipingAddress;

	public AddressReference1 billingAddress;

}
