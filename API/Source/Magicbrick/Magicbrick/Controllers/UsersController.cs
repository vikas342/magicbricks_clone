using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Magicbrick.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Xml.Linq;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Magicbrick.Repository;
using Amazon.S3.Model;
using static System.Net.WebRequestMethods;
using System.Drawing;
using System.Reflection.Metadata;
using System.Security.Policy;
using System.Security.Principal;
using Magicbrick.Interfaces;
using Org.BouncyCastle.Ocsp;
using System.Security.Cryptography;
using Magicbrick.DTOs;

namespace Magicbrick.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MagicBricksDbContext _context;
        private readonly Random _random = new Random();
        private readonly Emailservice _emailService;
        private readonly IHash _hash;


        public UsersController(MagicBricksDbContext context, Emailservice email, IHash hash)
        {
            _context = context;
            _emailService = email;
            _hash = hash;
        }



        // GET: api/Users/5
        [EnableCors("Policy1")]

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {

            try
            {
                var jwt = Request.Headers["Authorization"].First().Replace("Bearer ", string.Empty);

                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(jwt);
                var userid = Convert.ToInt64(jwtToken.Claims.First().Value);

                var data = _context.userSP.FromSqlRaw($"Exec userdetails @userid={userid}");
                return Ok(data);


            }
            catch (Exception)
            {

                return BadRequest();
            }

        }







        private int RandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }



        [EnableCors("Policy1")]

        [HttpPost("verifyOTP")]
        public async Task<IActionResult> verifyOTP(string email, int otp)
        {
            var data = _context.Users.FirstOrDefault(x => x.Email == email);
            var uid = data.UId;
            var userOtpData = _context.Usersotps.FirstOrDefault((x) => x.Uid == uid);
            if (otp == userOtpData.Otp)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }

            //https://localhost:7210/api/Users/verifyOTP?email=vsonwane3660%40gmail.com&otp=468


        }


        [EnableCors("Policy1")]

        [HttpPost("sendotp")]
        public async Task<IActionResult> sendotp(string email)
        {


            // https://localhost:7210/api/Users/sendotp?email=vsonwane3660%40gmail.com

            var data = _context.Users.FirstOrDefault(x => x.Email == email);
            if (data != null)
            {
                var uid = data.UId;
                var otp = RandomNumber(1000, 9999);

                var otpexistance = _context.Usersotps.FirstOrDefault(x => x.Uid == uid);
                if (otpexistance != null)
                {
                    otpexistance.Otp = otp;
                    _context.SaveChanges();

                    //     Send the email
                    var r = email;
                    var s = "Forget password";
                    var b = $"Dear {data.Name},\nWe understand how frustrating it can be to forget your password, but worry not! We're here to assist you in regaining access to your account. Please accept our sincere apologies for any inconvenience caused.To ensure the security of your account, we have generated a unique One - Time Passcode(OTP) that will allow you to reset your password promptly.\n\nHere's Otp:{otp}";
                    _emailService.SendEmail(r, s, b);
                    var resp = new
                    {
                        message = $"Email sent to {r}"
                    };

                    return Ok(otp);
                }

                else
                {

                    var otpdata = new Usersotp();
                    otpdata.Uid = uid;
                    otpdata.Otp = otp;
                    _context.Usersotps.AddAsync(otpdata);
                    _context.SaveChanges();

                    //     Send the email
                    var r = email;
                    var s = "Forget password";
                    var b = $"Dear {data.Name},\nWe understand how frustrating it can be to forget your password, but worry not! We're here to assist you in regaining access to your account. Please accept our sincere apologies for any inconvenience caused.To ensure the security of your account, we have generated a unique One - Time Passcode(OTP) that will allow you to reset your password promptly.\n\nHere's Otp:{otp}";
                    _emailService.SendEmail(r, s, b);
                    var resp = new
                    {
                        message = $"Email sent to {r}"
                    };
                    return Ok(otp);
                }
            }
            else
            {
                return BadRequest();
            }

        }


        [EnableCors("Policy1")]
        [HttpPost("sendotp2")]
        public async Task<IActionResult> sendotp2(string email)

        {
            var data= _context.Users.FirstOrDefault(x=>x.Email == email);
            if(data == null)
            {
                var otp = RandomNumber(1000, 9999);

                //     Send the email
                var r = email;
                var s = "your otp";
                var b = $"Dear {email},\nHere's Otp:{otp}";
                _emailService.SendEmail(r, s, b);
                var resp = new
                {
                    message = $"Email sent to {r}"
                };
                return Ok(otp);


            }
            return BadRequest();

        }








        [EnableCors("Policy1")]

        [HttpPut("updatePassword")]

        public async Task<IActionResult> updatePassword(string email, string password)
        {
            var data = _context.Users.FirstOrDefault(x => x.Email == email);
            if (data == null)
            {
                return BadRequest("user doesnt exist with that email");
            }
            var salt = data.PasswordSalt;
            var newpassword = _hash.Hash(password, salt);
            data.PasswordHash = newpassword;
            data.ModifedBy = data.UId;
            data.ModifiedDate = DateTime.Now;
            _context.SaveChangesAsync();

            return Ok();
        }



        ////////
        ////////
        //user whishlists apis
        ////////
        ///////
        ///


        [EnableCors("Policy1")]

        [HttpGet("get_user_whishlist")]

        public async Task<IActionResult> get_user_whishlist(int uid)
        {
            var data = (from w in _context.Wishlists where w.UserId == uid select w.PropId).ToArray();
            return Ok(data);

        }


        //add property in whishlist


        [EnableCors("Policy1")]

        [HttpPost("add_whishlist")]

        public async Task<IActionResult> add_whishlist(int uid, int pid)
        {

            var existance = _context.Wishlists.FirstOrDefault(x => x.PropId == pid && x.UserId == uid);

            if (existance == null)
            {


                var data = new Wishlist();
                data.UserId = uid;
                data.PropId = pid;
                data.CreatedDate = DateTime.Now;
                data.ModifiedDate = DateTime.Now;
                data.ModifedBy = data.UserId;
                data.CreatedBy = data.UserId;


                _context.Wishlists.AddAsync(data);
                _context.SaveChanges();
                return Ok(data);
            }

            else
            {
                _context.Wishlists.Remove(existance);
                _context.SaveChanges();
                return Ok();


            }

        }





        //get users whishlist data
        [EnableCors("Policy1")]

        [HttpGet("get_user_whishlistdata")]

        public async Task<IActionResult> get_user_whishlistdata(int uid)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec wishlist2 @userid={uid}");

            return Ok(data);

        }


        //get all users

        [EnableCors("Policy1")]

        [HttpGet("get_all_users")]
        public async Task<IActionResult> get_all_users()
        {
            var data = (from u in _context.Users where u.RoleId ==2
                        select new
                        {
                            u.UId,
                            u.Name,
                            u.Email,
                            u.Status
                            

                        }).ToList();

            return Ok(data);


        }



        //delete user

        [EnableCors("Policy1")]

        [HttpPut("userstatus")]
        public async Task<IActionResult> userstatus(int uid)
        {
            //select p.Prop_Id from Property p join Owner o on p.Owner_details = o.id where o.Owner_Id = 28 and p.Status = 14

            var udata = _context.Users.FirstOrDefault(x => x.UId == uid);
            var propdata = (from p in _context.Properties join o in _context.Owners on p.OwnerDetails equals o.Id where o.OwnerId == uid  select p.PropId ).ToList();

            if (udata.Status == 14)
            {
                udata.Status = 15;
                foreach (var item in propdata)
                {
                    var data = _context.Properties.FirstOrDefault(x => x.PropId == item);
                    data.Status = 15;
                }
                _context.SaveChanges();
                return Ok(propdata);
            }

            if (udata.Status == 15)
            {
                udata.Status = 14;
                foreach (var item in propdata)
                {
                    var data = _context.Properties.FirstOrDefault(x => x.PropId == item);
                    data.Status = 14;
                }
                _context.SaveChanges();
                return Ok(propdata);
            }

            return BadRequest();



           
        }



        //update user profile

        [EnableCors("Policy1")]

        [HttpPut("edit_userprofile")]
        public async Task<IActionResult> edit_userprofile(int userid, userprofile_DTO _DTO)
        {
            
            var checker = _context.Users.FirstOrDefault(x => x.Email == _DTO.email);

          if(_context.Users.FirstOrDefault(x=>x.UId==userid).Email == _DTO.email)
            {
                var data = _context.Users.FirstOrDefault(x => x.UId == userid);

                data.ModifiedDate = DateTime.Now;
                data.ModifedBy = userid;
                data.Name = _DTO.name;
                data.Email = _DTO.email;




                _context.SaveChanges();


                return Ok(new
                {
                    uId = data.UId,
                    name = data.Name,
                    email = data.Email,
                });
            }

            if (checker == null)
            {


                var data = _context.Users.FirstOrDefault(x => x.UId == userid);

                data.ModifiedDate = DateTime.Now;
                data.ModifedBy = userid;
                data.Name = _DTO.name;
                data.Email = _DTO.email;




                _context.SaveChanges();


                return Ok(new
                {
                    uId = data.UId,
                    name = data.Name,
                    email = data.Email,
                });

            }
            else
            {
                return BadRequest("email alredy exist");
            }

        }

    }
}