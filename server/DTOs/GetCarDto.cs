using System;

namespace server.DTOs;

public class GetCarDto
{
  public string? pickup_date { get; set; }
  public string? return_date { get; set; }
  public string? year { get; set; }
  public string? sort_by { get; set; }
}
