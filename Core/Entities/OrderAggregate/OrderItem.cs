using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem() { }
        public OrderItem(ServiceItemOrdered itemOrdered, decimal price, int quantity)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
        }

        public ServiceItemOrdered ItemOrdered { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

    }
}
