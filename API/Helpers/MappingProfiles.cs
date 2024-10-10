using System.Net.Http.Headers;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            CreateMap<Service, ServiceToReturnDto>()
                .ForMember(d => d.ServiceCategory, o => o.MapFrom(s => s.ServiceCategory.Name))
                .ForMember(d => d.ServiceType, o => o.MapFrom(s => s.ServiceType.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ServiceUrlResolver>());
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
              .ForMember(d=> d.ServiceProvision, o=> o.MapFrom(s => s.ServiceProvision.ServiceDate))
              .ForMember(d => d.ExtraCharge, o => o.MapFrom(s => s.ServiceProvision.ExtraCharge));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ServiceId, o => o.MapFrom(s => s.ItemOrdered.ServiceItemId))
                .ForMember(d => d.ServiceName, o => o.MapFrom(s => s.ItemOrdered.ServiceName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>())
            ;

        }
    }
}
