using HomeTech.Services.AuthAPI.Data;
using HomeTech.Services.AuthAPI.Models;
using HomeTech.Services.AuthAPI.Models.Dto;
using HomeTech.Services.AuthAPI.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace HomeTech.Services.AuthAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDBContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IJWTTokenGenerator _jwtTokenGenerator;

        public AuthService(AppDBContext db, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IJWTTokenGenerator jwtTokenGenerator)
        {
            _db = db;
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtTokenGenerator = jwtTokenGenerator;

        }

        public async Task<string> Registration(RegistrationRequestDto registrationRequestDto)
        {
            if (!await _roleManager.RoleExistsAsync(registrationRequestDto.RoleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(registrationRequestDto.RoleName));
            }

            ApplicationUser user = new()
            {
                UserName = registrationRequestDto.UserName,
                Email = registrationRequestDto.Email,
                NormalizedEmail = registrationRequestDto.Email.ToUpper(),
                Name = registrationRequestDto.Name,
                PhoneNumber = registrationRequestDto.PhoneNumber
            };

            try
            {
                var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);
                await _userManager.AddToRoleAsync(user, registrationRequestDto.RoleName);
                if (!result.Succeeded)
                {
                    return result.Errors.FirstOrDefault().Description;
                }
            }catch(Exception ex)
            {
                return ex.Message;
            }
            
            return "user registered succesfully";
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            var user = _db.applicationUsers.FirstOrDefault(u => u.UserName.ToLower() == loginRequestDto.UserName.ToLower());
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if(user == null || isValid)
            {
                return new LoginResponseDto() { User = null, Token = "" };
            }

            var token = _jwtTokenGenerator.GenerateToken(user);

            UserDto userDto = new()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber
            };

            return new LoginResponseDto() { User = userDto, Token = token };
        }
    }
}
