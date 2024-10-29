using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers.V1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = new MsCustomer
            {
                Customer_id = GenerateNewCustomerId(), //format CAR[D3]
                name = registerDto.Name,
                email = registerDto.Email,
                password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password), //hashing password
                phone_number = registerDto.Phone_number,
                address = registerDto.Address,
                driver_license_number = registerDto.Driver_license_number
            };

            _context.MsCustomer.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponseDto<IEnumerable<MsCustomer>>(
                Status: StatusCodes.Status200OK,
                Message: registerDto.Name + " has successfully registered.",
                Data: new List<MsCustomer> { user }
            ));
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var user = await _context.MsCustomer
                .FirstOrDefaultAsync(u => u.name == request.Username_Or_Email || u.email == request.Username_Or_Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.password))
            {
                return Unauthorized(new { Message = "Invalid credentials." });
            }

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature
            );

            var subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.name),
                new Claim(JwtRegisteredClaimNames.Email, user.name)
            });

            var expires = DateTime.UtcNow.AddMinutes(10);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return Ok(new ApiResponseDto<object>(
                Status: StatusCodes.Status200OK,
                Message: request.Username_Or_Email + " has successfully logged in.",
                Data: new 
                    { 
                        Users = new List<MsCustomer> { user },
                        Token = tokenHandler.WriteToken(token)
                    }
            ));
        }

        [HttpGet("User")]
        public async Task<IActionResult> GetUser()
        {
            var user = await _context.MsCustomer
                .FirstOrDefaultAsync(u => u.name == User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (user == null)
            {
                return NotFound(new { Message = "User not found." });
            }

            return Ok(new ApiResponseDto<MsCustomer>(
                Status: StatusCodes.Status200OK,
                Message: "User retrieved successfully.",
                Data: user
            ));
        } 
        public string GenerateNewCustomerId() {
            //ambil customer terakhir
            var lastCustomer = _context.MsCustomer
                .OrderByDescending(c => c.Customer_id)
                .FirstOrDefault();

            //abil nomor urut terakhir dari Customer_id
            int newIdNumber = 1; // default jika tidak ada customer

            if (lastCustomer != null)
            {
                //ambil bagian akhir dari Customer_id & convert
                var lastIdNumber = int.Parse(lastCustomer.Customer_id.Substring(3));
                newIdNumber = lastIdNumber + 1;
            }

            //format yg baru
            var newCustomerId = $"CUS{newIdNumber:D3}";
            return newCustomerId;
        }
    }
}
