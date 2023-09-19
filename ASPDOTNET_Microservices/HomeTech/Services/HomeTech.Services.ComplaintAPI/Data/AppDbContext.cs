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
				Category="Plumber",
				Service="Pipe Leakage",
				Description="Water is draining out from the damaged position"
			});
			modelBuilder.Entity<Complaint>().HasData(new Complaint
			{
				ComplaintID = 2,
				Category = "Electrician",
				Service = "Switch Replacement",
				Description = "While Switching it on/off it is throwing sparks"
			});

		}
	}
}
