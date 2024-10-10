using Core.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; } = string.Empty;

        public DateTimeOffset OrderDate { get; set; }

        public Address ServiceAddress { get; set; }

        public string ServiceProvision { get; set; }

        public decimal ExtraCharge { get; set; }

        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }

        public decimal Subtotal { get; set; }

        public decimal Total { get; set; }

        public string Status { get; set; }
    }
}
