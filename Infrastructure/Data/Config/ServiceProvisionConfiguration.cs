using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ServiceProvisionConfiguration : IEntityTypeConfiguration<ServiceProvision>
    {
        public void Configure(EntityTypeBuilder<ServiceProvision> builder)
        {
            builder.Property(d => d.ExtraCharge)
                .HasColumnType("decimal(18,2)");
        }
    }
}
