using HomeTech.Services.AcceptedRequestApi.Model;
using Microsoft.EntityFrameworkCore;

namespace HomeTech.Services.AcceptedRequestApi.Data
{
	public class AppDbContext:DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
		{
		}

		public DbSet<AcceptRequest> AcceptRequests { get; set; }
		public object AcceptRquests { get; internal set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}

}
