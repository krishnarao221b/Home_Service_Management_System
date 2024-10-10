using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class ServiceProvision : BaseEntity
    {
        public string ServiceDate { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public decimal ExtraCharge { get; set; }
    }
}
