using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ServiceWithFiltersForCountSpecification : BaseSpecification<Service>
    {
        public ServiceWithFiltersForCountSpecification(ServiceSpecParams serviceParams)
            : base (x =>
            (string.IsNullOrEmpty(serviceParams.Search) || x.Name.ToLower().Contains(serviceParams.Search)) &&
            (!serviceParams.CategoryId.HasValue || x.ServiceCategoryId == serviceParams.CategoryId) &&
            (!serviceParams.TypeId.HasValue || x.ServiceTypeId == serviceParams.TypeId)
            )
        {
        }
    }
}
