using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, Address serviceAddress, ServiceProvision serviceProvision,  decimal subtotal)
        {
            BuyerEmail = buyerEmail;
            ServiceAddress = serviceAddress;
            ServiceProvision = serviceProvision;
            OrderItems = orderItems;
            Subtotal = subtotal;

        }

        public string BuyerEmail { get; set; } = string.Empty;

        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;

        public Address ServiceAddress { get; set; }

        public ServiceProvision ServiceProvision { get; set; }

        public IReadOnlyList<OrderItem> OrderItems { get; set; }

        public decimal Subtotal { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        public string PaymentIntentId { get; set; } = string.Empty;

        public decimal GetTotal()
        {
            return Subtotal + ServiceProvision.ExtraCharge;
        }
    }
}
