using Core.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderItemDto
    {
        public int ServiceId { get; set; }

        public string ServiceName { get; set; } = string.Empty;

        public string PictureUrl { get; set; } = string.Empty;



        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}
