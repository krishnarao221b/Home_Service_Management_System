using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(string id)
        {
            Id = id;

        }

        public string Id { get; set; } = string.Empty;

        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public int? serviceProvisionId {  get; set; }

        public string ClientSecret { get; set; } = string.Empty;

        public string PaymentIntentId { get; set; } = string.Empty;

        public decimal ExtraCharge {  get; set; } 

    }
}
