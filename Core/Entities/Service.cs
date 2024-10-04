namespace Core.Entities
{
    public class Service : BaseEntity
    {
       public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string PictureUrl { get; set; } = string.Empty;

        public ServiceType ServiceType { get; set; }

        public int ServiceTypeId { get; set; }

        public ServiceCategory ServiceCategory { get; set; }

        public int ServiceCategoryId { get; set; }

    }
}
