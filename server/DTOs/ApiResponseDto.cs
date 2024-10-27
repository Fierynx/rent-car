using System;

namespace server.DTOs;

public class ApiResponseDto<T>
{
  public int status { get; set; }
  public string message { get; set; }
  public T data { get; set; }

  public ApiResponseDto(int Status, string Message, T Data)
  {
    status = Status;
    message = Message;
    data = Data;
  }
  
}
