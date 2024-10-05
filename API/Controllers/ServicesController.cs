using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;

namespace API.Controllers
{
    public class ServicesController : BaseApiController    
    {
        private readonly IGenericRepository<Service> _servicesRepo;
        private readonly IGenericRepository<ServiceCategory> _serviceCategoryRepo;
        private readonly IGenericRepository<ServiceType> _serviceTypeRepo;
        private readonly IMapper _mapper;

        public ServicesController(IGenericRepository<Service> servicesRepo,
            IGenericRepository<ServiceCategory> serviceCategoryRepo, IGenericRepository<ServiceType> serviceTypeRepo,
            IMapper mapper)
        {
            _servicesRepo = servicesRepo;
            _serviceCategoryRepo = serviceCategoryRepo;
            _serviceTypeRepo = serviceTypeRepo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ServiceToReturnDto>>> GetServices()
        {
            var spec = new ServicesWithTypesAndCategoriesSpecification();
            
            var services = await _servicesRepo.ListAsync(spec);

            return Ok(_mapper
                .Map<IReadOnlyList<Service>, IReadOnlyList<ServiceToReturnDto>>(services));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ServiceToReturnDto>> GetService(int id)
        {
            var spec = new ServicesWithTypesAndCategoriesSpecification(id);
            var service =  await _servicesRepo.GetEntityWithSpec(spec);

            if(service == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Service, ServiceToReturnDto>(service);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<ServiceCategory>>> GetServiceCategories()
        {
            return Ok(await _serviceCategoryRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ServiceType>>> GetServiceTypes()
        {
            return Ok(await _serviceTypeRepo.ListAllAsync());
        }

    }
}
