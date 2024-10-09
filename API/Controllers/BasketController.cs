using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {



        private readonly IBasketRepository _basketRepository;

        public BasketController(IBasketRepository basketRepository )
        {
            _basketRepository = basketRepository;

        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult> UpdateBasket(CustomerBasket basket)
        {
            // Log the basket being updated
            if (basket == null || string.IsNullOrEmpty(basket.Id))
            {
                return BadRequest("Invalid basket data.");
            }

            var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);
            if (updatedBasket == null)
            {
                return StatusCode(500, "Failed to update basket in Redis.");
            }

            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }


        [HttpGet("test-redis-update")]
        public async Task<IActionResult> TestRedisUpdate()
        {
            // Define a test key and value
            var testKey = "test-key";
            var testValue = "Hello Redis!";

            // Try updating Redis with the test value
            var updated = await _basketRepository.TestUpdateRedisAsync(testKey, testValue);

            if (updated)
            {
                // Retrieve the value from Redis to check if it was updated
                var retrievedValue = await _basketRepository.GetTestValueFromRedisAsync(testKey);
                return Ok(new { Success = true, Message = $"Value in Redis: {retrievedValue}" });
            }

            return StatusCode(500, "Failed to update Redis.");
        }


    }

}

