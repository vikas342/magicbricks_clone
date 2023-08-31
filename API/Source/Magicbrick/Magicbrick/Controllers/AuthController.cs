using Magicbrick.DTOs;
using Magicbrick.Interfaces;
using Magicbrick.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Magicbrick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MagicBricksDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHash _hash;

        public AuthController(MagicBricksDbContext context,IConfiguration config,IHash hash)
        {
            _context = context;
            _configuration = config;
            _hash = hash;
        }


        [EnableCors("Policy1")]
        [HttpPost("register")]
        public async Task<IActionResult> register(RegisterDTO reg)
        {
            if (_context.Users.Any(obj => obj.Email == reg.Email))
            {
                return BadRequest("User alredy Exist");
            }

            var hmac = new HMACSHA256();
            string salt = Convert.ToBase64String(hmac.Key);
            int rid = 2;
            reg.Password = _hash.Hash(reg.Password, salt);

            var user = new User { Name = reg.Name, Email = reg.Email, PasswordHash = reg.Password, PasswordSalt = salt, RoleId = rid,CreatedDate=DateTime.Now ,ModifiedDate=DateTime.Now,Status=14,CreatedBy= rid };
            await _context.AddAsync(user);

          
            await _context.SaveChangesAsync();


            var data2 = _context.Users.FirstOrDefault(x => x.Email == user.Email);
            data2.CreatedBy = data2.UId;

             


            await _context.SaveChangesAsync();

            return Ok(user);

        }



        [EnableCors("Policy1")]

        [HttpPost("login")]

        public async Task<IActionResult> login(LoginDTO login)
        {
            var usr = (from user in _context.Users
                     join role in _context.Roles on user.RoleId equals role.Id where user.Status==14
                     select new { Uid = user.UId, Name = user.Name, Email = user.Email, Passwordhash = user.PasswordHash, Passwordsalt = user.PasswordSalt, Role = role.Role1 })
                     .FirstOrDefault(x => x.Email == login.Email); ;
            if (usr==null)
            {
                return BadRequest("user not found");


            }

            if (!_hash.verify(login.Password, usr.Passwordhash, usr.Passwordsalt))
            {
                return BadRequest(" wrong Password ");
            }



            UsrDTO u=new UsrDTO() { Uid=usr.Uid,Name=usr.Name,Email=usr.Email,PasswordHash=usr.Passwordhash,PasswordSalt=usr.Passwordsalt,Role=usr.Role};

            var tkn = tokengenrator(u);
            return Ok(new {token=tkn,role=usr.Role,uid=usr.Uid, message = "user logged in success"});
        }

        private object tokengenrator(UsrDTO usr)
        {
            
            var secrate = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value));
            var crad = new SigningCredentials(secrate, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.SerialNumber,usr.Uid.ToString()),
                new Claim(ClaimTypes.Name,usr.Name),
                new Claim(ClaimTypes.Role,usr.Role),
                new Claim(ClaimTypes.Email,usr.Email)

            };
            var tk = new JwtSecurityToken(
                _configuration.GetSection("Jwt:Issuer").Value,
                _configuration.GetSection("Jwt:Audience").Value, claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials: crad
                );
            var token = new JwtSecurityTokenHandler().WriteToken(tk);
            return token;
        }
    }
}
