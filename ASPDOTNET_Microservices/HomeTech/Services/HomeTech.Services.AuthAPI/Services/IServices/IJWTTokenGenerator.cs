using HomeTech.Services.AuthAPI.Models;

namespace HomeTech.Services.AuthAPI.Services.IServices
{
    public interface IJWTTokenGenerator
    {
        string GenerateToken(ApplicationUser applicationUser, string role);
    }
}
