using System;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class MsEmployee
{
  [Key]
  public string Employee_id { get; set; }

  [MaxLength(200)]
  public string name { get; set; }

  [MaxLength(100)]
  public string position { get; set; }

  [EmailAddress, MaxLength(100)]
  public string email { get; set; }

  [MaxLength(50)]
  public string phone_number { get; set; }
  public ICollection<TrMaintenance> maintenances { get; set; }
}
