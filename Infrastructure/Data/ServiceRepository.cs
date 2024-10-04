using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ServiceContext _context;

        public ServiceRepository(ServiceContext context)
        {
            _context = context;
        }

        public async Task<Service> GetServiceByIdAsync(int id)
        {
            return await _context.Services
                .Include(p => p.ServiceType)
                .Include(p => p.ServiceCategory)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<ServiceCategory>> GetServiceCategoriesAsync()
        {
            return await _context.ServiceCategories.ToListAsync();
        }

        public async Task<IReadOnlyList<Service>> GetServicesAsync()
        {
            return await _context.Services
                .Include(p => p.ServiceType)
                .Include(p => p.ServiceCategory)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<ServiceType>> GetServiceTypesAsync()
        {
            return await _context.ServiceTypes.ToListAsync();
        }
    }
}
