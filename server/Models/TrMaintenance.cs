using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class TrMaintenance
{
  [Key]
  public string Maintenance_id { get; set; }

  public DateTime maintenance_date { get; set; }

  [MaxLength(4000)]
  public string description { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal cost { get; set; }

  public string car_id { get; set; }

  [ForeignKey("Car_id")]
  public MsCar car { get; set; }

  public string employee_id { get; set; }

  [ForeignKey("Employee_id")]
  public MsEmployee employee { get; set; }
}
