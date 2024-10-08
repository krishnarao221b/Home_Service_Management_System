using StackExchange.Redis;
using System;
using System.Threading.Tasks;

namespace Infrastructure.Services // Adjust the namespace based on your project structure
{
    public class RedisConnectionTest
    {
        private readonly IConnectionMultiplexer _redis;

        public RedisConnectionTest(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public async Task<bool> TestConnectionAsync()
        {
            try
            {
                // Use the GetDatabase method to check if Redis is accessible
                var db = _redis.GetDatabase();
                var pong = await db.PingAsync(); // This will return a non-null response if connected
                return pong != null; // If pong is not null, the connection is working
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error connecting to Redis: {ex.Message}");
                return false;
            }
        }
    }
}
