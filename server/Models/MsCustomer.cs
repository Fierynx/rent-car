using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class MsCustomer
{
  [Key]
  public string Customer_id { get; set; }

  [EmailAddress, MaxLength(100)]
  public string email { get; set; }

  [MinLength(8), MaxLength(100)]
  public string password { get; set; }

  [MaxLength(200)]
  public string name { get; set; }

  [MaxLength(50)]
  public string phone_number { get; set; }

  [MaxLength(500)]
  public string address { get; set; }

  [MaxLength(100)]
  public string driver_license_number { get; set; }
  public ICollection<TrRental> rentals { get; set; }
}
