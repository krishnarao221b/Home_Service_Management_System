using System.Reflection;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data
{
    public class ServiceContext : DbContext
    {
        public ServiceContext(DbContextOptions<ServiceContext> options) : base(options) { }

        public DbSet<Service> Services { get; set; }

        public DbSet<ServiceType> ServiceTypes { get; set; }

        public DbSet<ServiceCategory> ServiceCategories { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderItem> OrderItems { get; set; }

        public DbSet<ServiceProvision> ServiceProvisions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.SqlServer")
            {
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

                    //var dateTimeProperties = entityType.ClrType.GetProperties()
                    //    .Where(p=>p.PropertyType == typeof(DateTimeOffset)); 

                    foreach (var property in properties)
                    {
                        modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                    }

                    //foreach (var property in dateTimeProperties)
                    //{
                    //    modelBuilder.Entity(entityType.Name).Property(property.Name)
                    //        .HasConversion(new DateTimeOffsetToBinaryConverter());
                    //}

                }
            }


        }

    }
}
