package infinity.service.contracts.order;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import infinity.service.contracts.common.AddressReference1;
import infinity.service.contracts.common.CurrencyReference1;

public class InvoiceDetails1 {

	public String invoiceNumber;

	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date invoiceDate;

	public AddressReference1 customerAddress;

	public AddressReference1 sellerAddress;

	public String orderNumber;

	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date orderDate;

	public OrderItemDetail1[] orderItems;

	public Double orderTotal;

	public CurrencyReference1 currency;

}
