using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ServicesWithTypesAndCategoriesSpecification : BaseSpecification<Service>
    {
        public ServicesWithTypesAndCategoriesSpecification(ServiceSpecParams serviceParams)
            : base(x =>
            (string.IsNullOrEmpty(serviceParams.Search) || x.Name.ToLower().Contains(serviceParams.Search)) &&
            (!serviceParams.CategoryId.HasValue || x.ServiceCategoryId == serviceParams.CategoryId) &&
            (!serviceParams.TypeId.HasValue || x.ServiceTypeId == serviceParams.TypeId)
            )
        {
            AddInclude(x => x.ServiceType);
            AddInclude(x => x.ServiceCategory);
            AddOrderBy(x => x.Name);
            ApplyPaging(serviceParams.PageSize * (serviceParams.PageIndex - 1), serviceParams.PageSize);

            if (!string.IsNullOrEmpty(serviceParams.Sort))
            {
                switch (serviceParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }


        }

        public ServicesWithTypesAndCategoriesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ServiceType);
            AddInclude(x => x.ServiceCategory);
        }
    }
}
