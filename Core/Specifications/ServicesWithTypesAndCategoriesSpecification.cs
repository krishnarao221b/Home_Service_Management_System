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
        public ServicesWithTypesAndCategoriesSpecification()
        {
            AddInclude(x => x.ServiceType);
            AddInclude(x => x.ServiceCategory);

        }

        public ServicesWithTypesAndCategoriesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ServiceType);
            AddInclude(x => x.ServiceCategory);
        }
    }
}
