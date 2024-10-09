using System.Net.Http.Headers;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

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
            CreateMap<Address, AddressDto>().ReverseMap();

        }
    }
}
