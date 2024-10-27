using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers.V1
{
    [Route("api/v1")]
    [ApiController]
    public class RentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/v1/cars
        [HttpGet("cars")]
        public async Task<ActionResult<IEnumerable<MsCar>>> GetCars()
        {
            var cars = await _context.MsCar
                .Include(c => c.car_images)
                .Include(c => c.rentals)
                .Include(c => c.maintenances)
                .ToListAsync();
            return Ok(new ApiResponseDto<IEnumerable<MsCar>>(
                Status: StatusCodes.Status200OK, 
                Message: "Cars retrieved successfully", 
                Data: cars
                )
            );
        }
    }
}
