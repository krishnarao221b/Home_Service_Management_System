using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.AsServices
{
    public class OrderAsService : IOrderAsService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepo;
        private readonly IPaymentAsService _paymentAsService;

        public OrderAsService(IUnitOfWork unitOfWork, IBasketRepository basketRepo,
            IPaymentAsService paymentAsService) 
        
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
            _paymentAsService = paymentAsService;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int serviceProvisionId, string basketId, Address address)
        {
            var basket = await _basketRepo.GetBasketAsync(basketId);

            if (basket == null || basket.Items == null || !basket.Items.Any())
            {
                throw new Exception("Basket or items are empty.");
            }

            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var serviceItem = await _unitOfWork.Repository<Service>().GetByIdAsync(item.Id);
                if (serviceItem == null)
                {
                    throw new Exception($"Service item with ID {item.Id} not found.");
                }
                var itemOrdered = new ServiceItemOrdered(serviceItem.Id, serviceItem.Name, serviceItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, serviceItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var serviceProvision = await _unitOfWork.Repository<ServiceProvision>().GetByIdAsync(serviceProvisionId);
            if (serviceProvision == null)
            {
                throw new Exception($"Service provision with ID {serviceProvisionId} not found.");
            }
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);

            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);

                await _paymentAsService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }

            var order = new Order(items, buyerEmail, address, serviceProvision, subtotal, basket.PaymentIntentId);

            _unitOfWork.Repository<Order>().Add(order);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;


            return order;


        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<IReadOnlyList<ServiceProvision>> GetServiceProvisionsAsync()
        {
            return await _unitOfWork.Repository<ServiceProvision>().ListAllAsync();
        }
    }
}
