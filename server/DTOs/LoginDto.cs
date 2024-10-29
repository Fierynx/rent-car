using System;

namespace server.DTOs;

public class LoginDto
{
  public string Username_Or_Email { get; set; }
  public string Password { get; set; }
  public LoginDto() { }
  public LoginDto(string username_or_email, string password)
  {
    Username_Or_Email = username_or_email;
    Password = password;
  }
}
