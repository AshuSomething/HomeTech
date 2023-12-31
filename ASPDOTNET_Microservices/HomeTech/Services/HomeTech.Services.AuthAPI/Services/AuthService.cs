﻿using Azure;
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
                if (!result.Succeeded)
                {
                    return result.Errors.FirstOrDefault().Description;
                }
                await _userManager.AddToRoleAsync(user, registrationRequestDto.RoleName);
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
            
            return "user registered succesfully";
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            var user = _db.applicationUsers.FirstOrDefault(u => u.UserName.ToLower() == loginRequestDto.UserName.ToLower());
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);
            if(user == null || !isValid)
            {
                return new LoginResponseDto() { User = null, Token = "" };
            }

            var role = await GetUserRole(user.Id);

            var token =  _jwtTokenGenerator.GenerateToken(user, role);

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

        public async Task<string> GetUserRole(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return "User not found";
            }

            var roles = await _userManager.GetRolesAsync(user);

            if (roles == null || roles.Count == 0)
            {
                return "User has no roles";
            }

            return string.Join(", ", roles);
        }

        public async Task<string> UpdateUser(UpdateRequestDto updateRequestDto)
        {
            var user = await _userManager.FindByNameAsync(updateRequestDto.UserName);

            if (user == null)
            {
                // Handle user not found
                return "User not found.";
            }

            // Update the user's email and phone number
            user.Email = updateRequestDto.Email;
            user.PhoneNumber = updateRequestDto.PhoneNumber;

            // You can also update other user properties here if needed

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return "User updated successfully.";
            }
            else
            {
                // Handle errors, such as validation errors
                return "Error updating user.";
            }
        }
    }
}
