using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IOrderAsService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int serviceProvision, string basketId, Address address);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<ServiceProvision>> GetServiceProvisionsAsync();


    }
}
