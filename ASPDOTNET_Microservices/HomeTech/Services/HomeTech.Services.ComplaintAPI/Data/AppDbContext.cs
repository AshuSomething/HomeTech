using HomeTech.Services.ComplaintAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace HomeTech.Services.ComplaintAPI.Data
{
	public class AppDbContext : DbContext
	{

		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}
        public DbSet<Complaint> Complaints { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Complaint>().HasData(new Complaint
			{
				ComplaintID = 1,
				Category = "Plumber",
				Service = "Pipe Leakage",
				Date = DateTime.UtcNow,
				CustomerId = "1"
			}); ;
			modelBuilder.Entity<Complaint>().HasData(new Complaint
			{
				ComplaintID = 2,
				Category = "Electrician",
				Service = "Switch Replacement",
                Date = DateTime.UtcNow,
                CustomerId = "1"
            });

		}
	}
}
