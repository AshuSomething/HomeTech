using HomeTech.Services.AuthAPI.Models.Dto;
using HomeTech.Services.AuthAPI.Services;
using HomeTech.Services.AuthAPI.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeTech.Services.AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthAPIController : ControllerBase
    {
        private readonly IAuthService _authService;
        protected ResponseDto _responseDto;

        public AuthAPIController(IAuthService authService)
        {
            _authService = authService;
            _responseDto = new();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationRequestDto registrationRequestDto)
        {
            var message = await _authService.Registration(registrationRequestDto);
            if(!String.Equals(message, "user registered succesfully"))
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = message;
                return BadRequest(_responseDto);
            }
            return Ok(_responseDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginRequestDto loginRequestDto)
        {
            var loginResponseDto = await _authService.Login(loginRequestDto);

            if(loginResponseDto.User == null)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "username or password is incorrect";
                return BadRequest(_responseDto);
            }
            _responseDto.Result = loginResponseDto;
            return Ok(_responseDto);
        }
    }
}
