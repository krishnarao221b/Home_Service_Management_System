using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IServiceRepository
    {
        Task<Service> GetServiceByIdAsync(int id);

        Task<IReadOnlyList<Service>> GetServicesAsync();

        Task<IReadOnlyList<ServiceCategory>> GetServiceCategoriesAsync();

        Task<IReadOnlyList<ServiceType>> GetServiceTypesAsync();
    }
}
