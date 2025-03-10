export const getFormattedAddress = (address) => {
  const {
    name,
    phoneNumber,
    pinCode,
    addressLine1,
    addressLine2,
    addressLine3,
    landmark,
    city,
    state
  } = address || {};

  const line1 = [];
  const line2 = [];
  const line3 = [];
  const line4 = [];

  if (name) line1.push(name);

  if (landmark) line2.push(landmark);
  if (addressLine1) line2.push(addressLine1);
  if (addressLine2) line2.push(addressLine2);
  if (addressLine3) line2.push(addressLine3);

  if (city) line3.push(city);
  if (state && state.name) line3.push(state.name);
  if (pinCode) line3.push(pinCode);
  if (phoneNumber && phoneNumber.countryCode && phoneNumber.phoneNumber)
    line4.push(
      `Phone Number: ${phoneNumber.countryCode}  ${phoneNumber.phoneNumber}`
    );

  let result = line1.join(', ');

  if (line2.length) result += `\n${line2.join(', ')}`;
  if (line3.length) result += `\n${line3.join(', ')}`;
  if (line4.length) result += `\n${line4.join(', ')}`;

  return result;
};

export const docDefinition = {
  footer: {
    columns: [
      {
        text: [
          { text: 'Contact us:', bold: true },
          { text: '\nPh. 783847374 | Email: customersupport@crafthills.com' }
        ],
        alignment: 'left',
        style: 'footer'
      }
    ]
  },
  content: [
    { text: 'Crafthills', style: 'company' },
    { text: 'Address Line1\nAddress Line2' },
    {
      columns: [
        {
          text: [{ text: 'Invoice#: ', bold: true }, { text: '4444444' }],
          alignment: 'left',
          style: 'invoiceNumber'
        },
        {
          text: [
            { text: 'Invoice Date: ', bold: true },
            { text: '01/01/2022' }
          ],
          alignment: 'right',
          style: 'invoiceDate'
        }
      ]
    },
    {
      canvas: [
        {
          type: 'rect',
          x: 5,
          y: 10,
          w: 520,
          h: 25,
          color: 'black',
          fillOpacity: 0.6
        }
      ],
      alignment: 'center'
    },

    {
      text: 'INVOICE',
      style: 'invoiceLabel',
      textAlign: 'centre',
      absolutePosition: { y: 140 }
    },
    {
      columns: [
        {
          text: [{ text: 'To: ', bold: true }],
          alignment: 'left',
          style: 'to'
        },
        {
          text: [{ text: 'Order#: ', bold: true }, { text: '01/01/2022' }],
          alignment: 'right',
          style: 'orderNumber'
        }
      ]
    },
    {
      columns: [
        {
          text: 'Nitesh Kumar\nDarbhanga, Bihar\nIndia, 842004'
        },
        {
          text: [{ text: 'Order Date: ', bold: true }, { text: '01/01/2022' }],
          alignment: 'right',
          style: 'orderDate'
        }
      ]
    },

    {
      table: {
        headerRows: 1,
        widths: ['auto', '*', '*', '*'],

        body: [
          [
            { text: 'S. No.', border: [false, true, false, true] },
            { text: 'Product Name', border: [false, true, false, true] },
            {
              text: 'Quantity',
              alignment: 'right',
              border: [false, true, false, true]
            },
            {
              text: 'Price per Unit',
              alignment: 'right',
              border: [false, true, false, true]
            }
          ],
          [
            { text: '1.', border: [false, false, false, false] },
            {
              text: 'Organic Honey 500ml',
              border: [false, false, false, false]
            },
            {
              text: '1',
              alignment: 'right',
              border: [false, false, false, false]
            },
            {
              text: 'Rs. 100',
              alignment: 'right',
              border: [false, false, false, false]
            }
          ],
          [
            { text: '2.', border: [false, false, false, false] },
            {
              text: 'Organic Honey 500ml',
              border: [false, false, false, false]
            },
            {
              text: '1',
              alignment: 'right',
              border: [false, false, false, false]
            },
            {
              text: 'Rs. 100',
              alignment: 'right',
              border: [false, false, false, false]
            }
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            {
              text: 'Subtotal',
              border: [false, false, false, false],
              alignment: 'right'
            },
            {
              text: 'Rs. 100',
              alignment: 'right',
              border: [false, false, false, false]
            }
          ],
          [
            { text: '', border: [false, true, false, true] },
            { text: 'Grand Total', border: [false, true, false, true] },
            {
              text: '',
              border: [false, true, false, true],
              alignment: 'right'
            },
            {
              text: 'Rs. 100',
              alignment: 'right',
              border: [false, true, false, true]
            }
          ]
        ]
      },
      style: 'table'
    },

    { text: 'Seller:', style: 'seller' },
    { text: 'A2Z Crafts\nNew Delhi, 110024' }
  ],
  styles: {
    invoiceNumber: {
      marginTop: 20
    },
    invoiceDate: {
      marginTop: 20
    },
    orderNumber: {
      marginTop: 20
    },
    orderDate: {
      marginTop: 20
    },
    footer: {
      marginLeft: 30
    },
    invoiceLabel: {
      fontSize: 14,
      bold: true,
      alignment: 'center',
      color: 'white'
    },
    company: {
      bold: true,
      marginTop: 10
    },
    to: {
      marginTop: 20,
      bold: true
    },
    table: {
      marginTop: 20
    },
    seller: {
      marginTop: 40,
      bold: true
    }
  }
};

export const getDocDefinition = ({
  orderNumber,
  orderDate,
  invoiceDate,
  invoiceNumber,
  customerAddress,
  sellerAddress,
  orderItems,
  orderTotal,
  currency
}) => {
  const formattedCustomerAddress = getFormattedAddress(customerAddress);
  const formattedSellerAddress = getFormattedAddress(sellerAddress);

  const formattedOrderItems = orderItems.map((item, index) => [
    { text: `${index + 1}.`, border: [false, false, false, false] },
    {
      text: `${item.productName}`,
      border: [false, false, false, false]
    },
    {
      text: `${item.quantity}`,
      alignment: 'right',
      border: [false, false, false, false]
    },
    {
      text: `${item.currency.symbol} ${item.sellingPrice}`,
      alignment: 'right',
      border: [false, false, false, false]
    }
  ]);

  const subTotal = orderItems.reduce(
    (retVal, curr) => retVal + curr.totalPrice,
    0
  );

  const formattedSubTotal = `${currency.symbol} ${subTotal}`;
  const formattedTotal = `${currency.symbol} ${orderTotal}`;

  return {
    footer: {
      columns: [
        {
          text: [
            { text: 'Contact us:', bold: true },
            {
              text: '\nPh. +919522834252 | Email: 7pointdatasolutions@gmail.com'
            }
          ],
          alignment: 'left',
          style: 'footer'
        }
      ]
    },
    content: [
      { text: 'Crafthills', style: 'company' },
      {
        text: 'Vill-Shahbazpur, Shahbazpur\nPanch-Block, Muzaffarpur BR 842004 IN'
      },
      {
        columns: [
          {
            text: [
              { text: 'Invoice#: ', bold: true },
              { text: `${invoiceNumber}` }
            ],
            alignment: 'left',
            style: 'invoiceNumber'
          },
          {
            text: [
              { text: 'Invoice Date: ', bold: true },
              { text: invoiceDate }
            ],
            alignment: 'right',
            style: 'invoiceDate'
          }
        ]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 5,
            y: 10,
            w: 520,
            h: 25,
            color: 'black',
            fillOpacity: 0.6
          }
        ],
        alignment: 'center'
      },

      {
        text: 'INVOICE',
        style: 'invoiceLabel',
        textAlign: 'centre',
        absolutePosition: { y: 140 }
      },
      {
        columns: [
          {
            text: [{ text: 'To: ', bold: true }],
            alignment: 'left',
            style: 'to'
          },
          {
            text: [{ text: 'Order#: ', bold: true }, { text: orderNumber }],
            alignment: 'right',
            style: 'orderNumber'
          }
        ]
      },
      {
        columns: [
          {
            text: `${formattedCustomerAddress}`
          },
          {
            text: [{ text: 'Order Date: ', bold: true }, { text: orderDate }],
            alignment: 'right',
            style: 'orderDate'
          }
        ]
      },

      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*'],

          body: [
            [
              { text: 'S. No.', border: [false, true, false, true] },
              { text: 'Product Name', border: [false, true, false, true] },
              {
                text: 'Quantity',
                alignment: 'right',
                border: [false, true, false, true]
              },
              {
                text: 'Price per Unit',
                alignment: 'right',
                border: [false, true, false, true]
              }
            ],
            ...formattedOrderItems,
            [
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              {
                text: 'Subtotal',
                border: [false, false, false, false],
                alignment: 'right'
              },
              {
                text: `${formattedSubTotal}`,
                alignment: 'right',
                border: [false, false, false, false]
              }
            ],
            [
              { text: '', border: [false, true, false, true] },
              { text: 'Grand Total', border: [false, true, false, true] },
              {
                text: '',
                border: [false, true, false, true],
                alignment: 'right'
              },
              {
                text: `${formattedTotal}`,
                alignment: 'right',
                border: [false, true, false, true]
              }
            ]
          ]
        },
        style: 'table'
      },

      { text: 'Seller:', style: 'seller' },
      { text: `${formattedSellerAddress}` }
    ],
    styles: {
      invoiceNumber: {
        marginTop: 20
      },
      invoiceDate: {
        marginTop: 20
      },
      orderNumber: {
        marginTop: 20
      },
      orderDate: {
        marginTop: 20
      },
      footer: {
        marginLeft: 40
      },
      invoiceLabel: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
        color: 'white'
      },
      company: {
        bold: true,
        marginTop: 10
      },
      to: {
        marginTop: 20,
        bold: true
      },
      table: {
        marginTop: 20
      },
      seller: {
        marginTop: 40,
        bold: true
      }
    }
  };
};
