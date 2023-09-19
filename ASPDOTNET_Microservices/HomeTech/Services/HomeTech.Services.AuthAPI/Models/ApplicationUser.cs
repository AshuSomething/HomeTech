using Microsoft.AspNetCore.Identity;

namespace HomeTech.Services.AuthAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
