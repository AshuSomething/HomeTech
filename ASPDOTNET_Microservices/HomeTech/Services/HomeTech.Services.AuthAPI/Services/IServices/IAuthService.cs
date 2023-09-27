using HomeTech.Services.AuthAPI.Models.Dto;

namespace HomeTech.Services.AuthAPI.Services.IServices
{
    public interface IAuthService
    {
        Task<string> Registration(RegistrationRequestDto registrationRequestDto);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<string> GetUserRole(string userId);

        Task<string> UpdateUser(UpdateRequestDto updateRequestDto);
    }
}
