using System;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class AppDbContext : DbContext
{
   public AppDbContext(DbContextOptions<AppDbContext> options) : base (options)
  {
  }

  public DbSet<MsCar> MsCar { get; set; }
  public DbSet<MsCarImages> MsCarImages { get; set; }
  public DbSet<MsCustomer> MsCustomer { get; set; }
  public DbSet<MsEmployee> MsEmployee { get; set; }
  public DbSet<TrMaintenance> TrMaintenance { get; set; }
  public DbSet<TrPayment> TrPayment { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<MsCustomer>()
          .HasMany(c => c.rentals)
          .WithOne(r => r.customer)
          .HasForeignKey(r => r.customer_id);

      modelBuilder.Entity<MsCar>()
          .HasMany(c => c.car_images)
          .WithOne(i => i.car)
          .HasForeignKey(i => i.car_id);

      modelBuilder.Entity<MsCar>()
          .HasMany(c => c.rentals)
          .WithOne(r => r.car)
          .HasForeignKey(r => r.car_id);

      modelBuilder.Entity<MsCar>()
          .HasMany(c => c.maintenances)
          .WithOne(m => m.car)
          .HasForeignKey(m => m.car_id);
          
      modelBuilder.Entity<MsEmployee>()
          .HasMany(e => e.maintenances)
          .WithOne(m => m.employee)
          .HasForeignKey(m => m.employee_id);

      modelBuilder.Entity<TrRental>()
          .HasMany(r => r.payments)
          .WithOne(p => p.rental)
          .HasForeignKey(p => p.rental_id);
    }

}
