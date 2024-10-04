using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class ServiceContextSeed
    {
        public static async Task SeedAsync(ServiceContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ServiceCategories.Any())
                {
                    var categoriesData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/categories.json");

                    var categories = JsonSerializer.Deserialize<List<ServiceCategory>>(categoriesData);

                    foreach (var item in categories)
                    {
                        context.ServiceCategories.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ServiceTypes.Any())
                {
                    var typesData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ServiceType>>(typesData);

                    foreach (var item in types)
                    {
                        context.ServiceTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Services.Any())
                {
                    var servicesData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/services.json");

                    var services = JsonSerializer.Deserialize<List<Service>>(servicesData);

                    foreach (var item in services)
                    {
                        context.Services.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<ServiceContextSeed>();
                logger.LogError(ex.Message);
            }


        }

    }
}
