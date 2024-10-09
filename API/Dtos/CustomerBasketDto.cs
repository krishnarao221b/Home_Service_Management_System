using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; } = string.Empty;

        public List<BasketItemDto> Items { get; set; }

    }
}
