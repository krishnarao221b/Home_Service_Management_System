using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ServiceContext : DbContext
    {
        public ServiceContext(DbContextOptions<ServiceContext> options) : base (options){ }

        public DbSet<Service> Services { get; set; }
    }
}
