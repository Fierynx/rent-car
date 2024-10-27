using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class MsCar
{
  [Key]
  public string Car_id { get; set; }

  [MaxLength(200)]
  public string name { get; set; }

  [MaxLength(100)]
  public string model { get; set; }

  public int year { get; set; }

  [MaxLength(50)]
  public string license_plate { get; set; }

  public int number_of_car_seats { get; set; }

  [MaxLength(100)]
  public string transmission { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal price_per_day { get; set; }

  public bool status { get; set; }
  public ICollection<MsCarImages> car_images { get; set; }
  public ICollection<TrRental> rentals { get; set; }
  public ICollection<TrMaintenance> maintenances { get; set; }
}
