namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }

        public string ServiceName { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public string PictureUrl { get; set; } = string.Empty;

        public string Category {  get; set; } = string.Empty;

        public string Type {  get; set; } = string.Empty;   
        


    }
}