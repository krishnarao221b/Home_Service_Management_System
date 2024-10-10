namespace API.Dtos
{
    public class OrderDto
    {
        public string BasketId { get; set; } = string.Empty;

        public int ServiceProvisionId { get; set; }

        public AddressDto Address { get; set; }
    }
}
