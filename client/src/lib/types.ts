export type APIResponse<Data = unknown> = {
  status: string;
  message: string;
  data: Data;
};

export type Customer = {
  Customer_id: string;
  email: string;
  password: string;
  name: string;
  phone_number?: string;
  address?: string;
  driver_license_number?: string;
};

type CarImage = {
  image_car_id: string;
  car_id: string;
  image_link: string;
  car?: Car;
};

type Rental = {
  Rental_id: string;
  rental_date: Date;
  return_date?: Date;
  total_price?: number;
  payment_status?: boolean;
  customer_id: string;
  car_id: string;
  customer?: Customer;
  car?: Car;
  payments?: Payment[];
};

export type Payment = {
  Payment_id: string;
  payment_date: Date;
  amount?: number;
  payment_method?: string;
  rental_id: string;
  rental?: Rental;
};

export type Employee = {
  Employee_id: string;
  name: string;
  position?: string;
  email?: string;
  phone_number?: string;
  maintenances?: Maintenance[];
};

export type Maintenance = {
  Maintenance_id: string;
  maintenance_date: Date;
  description?: string;
  cost?: number;
  car_id: string;
  employee_id: string;
  car?: Car;
  employee?: Employee;
};

export type Car = {
  Car_id: string;
  name: string;
  model?: string;
  year?: number;
  license_plate: string;
  number_of_car_seats?: number;
  transmission?: string;
  price_per_day?: number;
  status?: boolean;
  car_images?: CarImage[];
  rentals?: Rental[];
  maintenances?: Maintenance[];
};

export type CarInfo = {
  model: string;
  name: string;
  transmission?: string;
  customer?: string;
  email: string;
  rental_date?: string;
  return_date?: string;
  number_of_car_seats?: number;
  price_per_day?: number;
  total_price?: number;
  car_images_link?: string[];
}
