using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class TrRental
{
  [Key]
  public string Rental_id { get; set; }

  public DateTime rental_date { get; set; }

  public DateTime return_date { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal total_price { get; set; }

  public bool payment_status { get; set; }

  public string customer_id { get; set; }

  [ForeignKey("Customer_id")]
  public MsCustomer customer { get; set; }

  public string car_id { get; set; }

  [ForeignKey("Car_id")]
  public MsCar car { get; set; }
  public ICollection<TrPayment> payments { get; set; }
}
