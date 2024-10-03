using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase    
    {
        private readonly ServiceContext _context;
        public ServicesController(ServiceContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Service>>> GetServices()
        {
            var service = await _context.Services.ToListAsync();

            return Ok(service);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetService(int id)
        {
            return await _context.Services.FindAsync(id);
        }

    }
}
