using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using backend.Services;
using backend.Helpers;
using Microsoft.Extensions.Options;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly backendContext _context;

        public AuthenticateController(backendContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        [HttpPost]
        public IActionResult Authenticate([FromBody] User user)
        {
            UserService userService = new UserService(_context);
            var users = userService.Authenticate(user.Username, user.Password);

            if (users == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var userq = _context.Users.SingleOrDefault(x => x.Username == user.Username);
            if (userq != null)
            {
                user.Id = userq.Id;
            }

            //var tokenString = "fake token";
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Some random text for the secret");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);


            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                id = user.Id,
                username = user.Username,
                token = tokenString
            });
        }
    }
}