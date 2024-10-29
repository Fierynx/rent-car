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
        public async Task<ActionResult<IEnumerable<MsCar>>> GetCars([FromQuery] GetCarDto request){
            
            var query = _context.MsCar //ngambil dri model MsCar
                .Include(c => c.car_images) //ambil data car images
                .Include(c => c.rentals) //ambil data rentals
                .Include(c => c.maintenances) //ambil data maintenances
                .Where(c => c.status) //cari yg statusnya true
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.year)) { //kalo yearnya ga kosong, filter tahun
                query = query.Where(c => c.year.ToString() == request.year);
            }

            if (!string.IsNullOrEmpty(request.pickup_date) && 
                DateTime.TryParse(request.pickup_date, out DateTime parsedPickupDate))
            {
                query = query.Where(c => //query nyari pickup date yg sama
                    c.rentals.Any(r => r.rental_date.Date == parsedPickupDate.Date)
                );
            }

            if (!string.IsNullOrEmpty(request.return_date) && 
                DateTime.TryParse(request.return_date, out DateTime parsedReturnDate))
            {
                query = query.Where(c => //query nyari return date yg sama
                    c.rentals.Any(r => r.return_date.Date == parsedReturnDate.Date)
                );
            }

            query = request.sort_by switch { //sorting by price_asc/price_desc
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

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCarInfo(string id){
            var info = await _context.MsCar
                .Where(c => c.Car_id == id)
                .Include(c => c.car_images)
                .Include(c => c.rentals)
                    .ThenInclude(r => r.customer) //ambil data penyewa
                .FirstOrDefaultAsync();

            if (info == null)
            {
                return NotFound(new ApiResponseDto<GetCarDto>(
                    Status: StatusCodes.Status404NotFound,
                    Message: "Car not found",
                    Data: null
                ));
            }

            return Ok(new ApiResponseDto<GetCarInfoDto>(
                Status: StatusCodes.Status200OK,
                Message: "Car info retrieved successfully",
                Data: new GetCarInfoDto
                {
                    model = info.model,
                    name = info.name,
                    transmission = info.transmission,
                    customer = info.rentals.LastOrDefault()?.customer.name,
                    email = info.rentals.LastOrDefault()?.customer.email,
                    rental_date = info.rentals.LastOrDefault()?.rental_date.ToString("yyyy-MM-dd"),
                    return_date = info.rentals.LastOrDefault()?.return_date.ToString("yyyy-MM-dd"),
                    number_of_car_seats = info.number_of_car_seats,
                    price_per_day = info.price_per_day,
                    total_price = info.rentals.LastOrDefault()?.total_price ?? 0,
                    car_images_link = info.car_images.Select(i => i.image_link).ToList()
                }
            ));
        }

    }
}
