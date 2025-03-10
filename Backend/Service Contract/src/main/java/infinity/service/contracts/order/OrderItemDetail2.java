package infinity.service.contracts.order;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import infinity.service.contracts.common.UserDetails2;
import infinity.service.contracts.seller.SellerReference3;

public class OrderItemDetail2 {

	public String orderId;

	public String id;

	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date orderDate;

	public String productName;

	public SellerReference3 seller;

	public UserDetails2 user;

	public Double totalPrice;

	public String currencyId;

	public String orderItemStatus;

}
