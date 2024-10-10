using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class ServiceItemOrdered
    {
        public ServiceItemOrdered()
        {

        }
        public ServiceItemOrdered(int serviceItemId, string serviceName, string pictureUrl)
        {
            ServiceItemId = serviceItemId;
            ServiceName = serviceName;
            PictureUrl = pictureUrl;
        }

        public int ServiceItemId { get; set; }

        public string ServiceName { get; set; } = string.Empty;

        public string PictureUrl { get; set; } = string.Empty;

    }
}
