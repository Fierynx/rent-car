using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class MsCarImages
{
  [Key]
  public string image_car_id { get; set; }

  public string car_id { get; set; }

  [MaxLength(255)]
  public string image_link { get; set; }

  [ForeignKey("Car_id")]
  public MsCar car { get; set; }
}
