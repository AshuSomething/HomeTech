using HomeTech.Services.AuthAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HomeTech.Services.AuthAPI.Data
{
    public class AppDBContext : IdentityDbContext<ApplicationUser>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<ApplicationUser> applicationUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var server = "(localdb)";
            var instance = "mssqllocaldb";
            var database = "HomeTech_AuthDB";
            var authentication = "Integrated Security = true";

            var conString = $"Data Source={server}\\{instance}; Initial Catalog={database};{authentication}";

            options.UseSqlServer(conString);
        }
    }
}
