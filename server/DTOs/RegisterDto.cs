using System;
using System.ComponentModel.DataAnnotations;

namespace server.DTOs;

public class RegisterDto
{
  [EmailAddress, MaxLength(100)]
  public string Email { get; set; }

  [MinLength(8), MaxLength(100)]
  public string Password { get; set; }
  public string Password_confirmation { get; set; }

  [MaxLength(200)]
  public string Name { get; set; }

  [MaxLength(50)]
  public string Phone_number { get; set; }

  [MaxLength(500)]
  public string Address { get; set; }

  [MaxLength(100)]
  public string Driver_license_number { get; set; }

  public RegisterDto() { }
  public RegisterDto(string email, string password, string password_confirmation, string name, string phone_number, string address, string driver_license_number)
  {
    Email = email;
    Password = password;
    Password_confirmation = password_confirmation;
    Name = name;
    Phone_number = phone_number;
    Address = address;
    Driver_license_number = driver_license_number;
  }
}
