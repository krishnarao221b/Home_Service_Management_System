using Core.Entities;

namespace API.Dtos
{
    public class ServiceToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string PictureUrl { get; set; } = string.Empty;

        public string ServiceType { get; set; } = string.Empty ;

        public string ServiceCategory { get; set; } = string.Empty;

    }
}
