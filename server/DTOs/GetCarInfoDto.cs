using System;

namespace server.DTOs;

public class GetCarInfoDto
{
  public string? model { get; set; }
  public string? name { get; set; }
  public string? transmission { get; set; }
  public string? customer { get; set; }
  public string? email { get; set; }
  public string? rental_date { get; set; }
  public string? return_date { get; set; }
  public int number_of_car_seats { get; set; }
  public decimal price_per_day { get; set; }
  public decimal total_price { get; set; }
  public ICollection<string> car_images_link { get; set; }
}
