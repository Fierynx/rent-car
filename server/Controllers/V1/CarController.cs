using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;
using System.Linq;

namespace server.Controllers.V1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/v1/Car?pickup_date=YYYY-MM-DD&return_date=YYYY-MM-DD&year=YYYY&sort_by=price_asc/price_desc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MsCar>>> GetCars(
            //parameter, diambil dari query
            string? pickup_date, 
            string? return_date, 
            string? year, 
            string? sort_by) 
        {

            var query = _context.MsCar //ngambil dri model MsCar
                .Include(c => c.car_images) //ambil data car images
                .Include(c => c.rentals) //ambil data rentals
                .Include(c => c.maintenances) //ambil data maintenances
                .Where(c => c.status) //cari yg statusnya true
                .AsQueryable();

            if (!string.IsNullOrEmpty(year)) { //kalo yearnya ga kosong, filter tahun
                query = query.Where(c => c.year.ToString() == year);
            }

            if (!string.IsNullOrEmpty(pickup_date) && 
                DateTime.TryParse(pickup_date, out DateTime parsedPickupDate))
            {
                query = query.Where(c => //query nyari pickup date yg sama
                    c.rentals.Any(r => r.rental_date.Date == parsedPickupDate.Date)
                );
            }

            if (!string.IsNullOrEmpty(return_date) && 
                DateTime.TryParse(return_date, out DateTime parsedReturnDate))
            {
                query = query.Where(c => //query nyari return date yg sama
                    c.rentals.Any(r => r.return_date.Date == parsedReturnDate.Date)
                );
            }

            query = sort_by switch { //sorting by price_asc/price_desc
                "price_asc" => query.OrderBy(c => c.price_per_day),
                "price_desc" => query.OrderByDescending(c => c.price_per_day),
                _ => query.OrderBy(c => c.name) //defaultnya by name
            };

            var cars = await query.ToListAsync();

            return Ok(new ApiResponseDto<IEnumerable<MsCar>>( //Manggil Dto respon api
                Status: StatusCodes.Status200OK,
                Message: "Cars retrieved successfully",
                Data: cars
            ));
        }
    }
}
