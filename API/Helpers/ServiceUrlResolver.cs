using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ServiceUrlResolver : IValueResolver<Service, ServiceToReturnDto, string>
    {
        private readonly IConfiguration _config;

        public ServiceUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Service source, ServiceToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}
