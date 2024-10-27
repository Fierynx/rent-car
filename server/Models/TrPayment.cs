using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class TrPayment
{
  [Key]
  public string Payment_id { get; set; }

  public DateTime payment_date { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal amount { get; set; }

  [MaxLength(100)]
  public string payment_method { get; set; }

  public string rental_id { get; set; }

  [ForeignKey("Rental_id")]
  public TrRental rental { get; set; }
}
