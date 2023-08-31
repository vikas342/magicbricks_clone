using Amazon.S3.Transfer;
using Amazon.S3;
using Magicbrick.DTOs;
using Magicbrick.Interfaces;
using Magicbrick.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;

using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Xml.Linq;
using Amazon;
using NuGet.Versioning;
using static System.Net.WebRequestMethods;
using System.Text.Json;
using Magicbrick.Repository;
using ThirdParty.Json.LitJson;
using Amazon.Auth.AccessControlPolicy.ActionIdentifiers;
using static Org.BouncyCastle.Math.EC.ECCurve;
using Org.BouncyCastle.Ocsp;

namespace Magicbrick.Controllers
{



    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : GenricController<Property>
    {

        private readonly MagicBricksDbContext _context;
        private readonly IConfiguration _configuration;

        private readonly Emailservice _emailService;


        public PropertyController(IGenric<Property> igenric, MagicBricksDbContext context, Emailservice email, IConfiguration configuration) : base(igenric)
        {
            _context = context;
            _emailService = email;
            _configuration = configuration;
        }


        ///get users prop_listings
        [EnableCors("Policy1")]

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("GetuserPropertylisting")]
        public async Task<IActionResult> GetuserPropertylisting()
        {

            try
            {
                var jwt = Request.Headers["Authorization"].First().Replace("Bearer ", string.Empty);

                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(jwt);
                var userid = Convert.ToInt64(jwtToken.Claims.First().Value);

                var data = _context.PropertySps.FromSqlRaw($"Exec UserListing @userid={userid}");

                return Ok(data);


            }
            catch (Exception)
            {

                return BadRequest();
            }

        }



        //get othres_proplistings

        [EnableCors("Policy1")]

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("GetotheruserPropertylisting")]
        public async Task<IActionResult> GetotheruserPropertylisting()
        {

            try
            {
                var jwt = Request.Headers["Authorization"].First().Replace("Bearer ", string.Empty);

                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(jwt);
                var userid = Convert.ToInt64(jwtToken.Claims.First().Value);

                var data = _context.PropertySps.FromSqlRaw($"Exec OtherUserListing @userid={userid}");
                return Ok(data);


            }
            catch (Exception)
            {

                return BadRequest();
            }

        }



        //get allusers proplistings

        [EnableCors("Policy1")]

        [HttpGet("all_properties")]

        public async Task<IActionResult> getallprops()
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec AllListing");


            return Ok(data);




        }

        //get allusers proplistings

        [EnableCors("Policy1")]

        [HttpGet("all_properties_admin")]

        public async Task<IActionResult> all_properties_admin()
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec AllListing_admin");


            return Ok(data);




        }


        //get prop by id

        [EnableCors("Policy1")]

        [HttpGet("getpropbyid")]

        public async Task<IActionResult> getpropbyid(int id)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec  Propby_id @pid={id}");


            return Ok(data);



        }



        ////get prop by city


        //[HttpGet("getpropbycities")]

        //public async Task<IActionResult> getpropbycities()
        //{
        //    var data = (
        //        from ot in _context.Objecttypes
        //        join o in _context.Objects on ot.Id equals o.ObjTypeId
        //        where ot.ParentId == 4
        //        select new
        //        {
        //            id = o.Id,
        //            city = o.Name
        //        }

        //        ).ToList();


        //    return Ok(data);



        //}




        ////get prop by states


        //[HttpGet("getpropbystate")]

        //public async Task<IActionResult> getpropbystate()
        //{
        //    var data = (
        //        from ot in _context.Objecttypes

        //        where ot.ParentId == 4
        //        select new
        //        {
        //            id = ot.Id,
        //            state = ot.Name
        //        }

        //        ).ToList();


        //    return Ok(data);



        //}






        ////get proptype



        //[HttpGet("getproptype")]

        //public async Task<IActionResult> getproptype()
        //{
        //    var data = (
        //        from ot in _context.Objecttypes
        //        join o in _context.Objects on ot.Id equals o.ObjTypeId
        //        where ot.Id == 2
        //        select new
        //        {
        //            id = o.Id,
        //            type = o.Name
        //        }

        //        ).ToList();


        //    return Ok(data);



        //}




        //   on click on buy/rent -> property section    on navbar for proptype_section


        [EnableCors("Policy1")]

        [HttpGet("getprop_CTF")]

        public async Task<IActionResult> getprop_CTF(string city, string proptype, string propfor)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec allPropOn_CTF @city={city},@proptype={proptype},@propfor={propfor}");




            return Ok(data);

        }





        //   on click on buy/rent ->budget section    on navbar for budget


        [EnableCors("Policy1")]

        [HttpGet("getpropbudget_CFMinMax")]

        public async Task<IActionResult> getpropbudget_CFMinMax(string city, string propfor, int min, int max)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec allpropbudget_CFMinMax @city={city},@propfor={propfor}, @low={min},@high={max}");




            return Ok(data);

        }



        //admin-filter
        [EnableCors("Policy1")]

        [HttpGet("allpropserch_CTFBM")]
        public async Task<IActionResult> allpropserch_CTFBM(string city, string propfor,string propby,string proptype, int month, int year)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec allpropserch_CTFBM @city = {city},@proptype = {proptype},@propfor = {propfor}, @propby = {propby},@month = {month},@year = {year}");
            return Ok(data);

        }





        //   on click on buy/rent ->serch box    on home component


        [EnableCors("Policy1")]

        [HttpGet("allpropserch_CTFMinMax")]

        public async Task<IActionResult> allpropserch_CTFMinMax(string city, string proptype, string propfor, int min, int max)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec allpropserch_CTFMinMax @city={city},@proptype={proptype},@propfor={propfor}, @low={min},@high={max}");




            return Ok(data);

        }




        //get property accordeing to city

        //   on click link city to see all propertys in that city


        [EnableCors("Policy1")]

        [HttpGet("allpropserch_city")]

        public async Task<IActionResult> allpropserch_city(string city)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec Allcity_Prop @city={city} ");




            return Ok(data);

        }




        ////prop for


        //[HttpGet("Propfor")]

        //public async Task<IActionResult> Propfor()
        //{
        //    var data = from x in _context.Objects
        //               where x.ObjTypeId == 3
        //               select new
        //               {
        //                   id = x.Id,
        //                   propfor = x.Name
        //               };
        //    //   select  name as propfor  from Object where Obj_type_Id = 3






        //    return Ok(data);

        //}



        ////prop amenities


        //[HttpGet("PropAmenities")]

        //public async Task<IActionResult> PropAmenities()
        //{
        //    var data = from x in _context.Objects
        //               where x.ObjTypeId == 8
        //               select new
        //               {
        //                   id = x.Id,
        //                   amenity = x.Name
        //               };



        //    return Ok(data);

        //}





        ////prop posted by


        //[HttpGet("postedby")]

        //public async Task<IActionResult> postedby()
        //{
        //    var data = from x in _context.Objects where x.ObjTypeId == 10 select new { id = x.Id, postedby = x.Name };
        //    //   select  name as propfor  from Object where Obj_type_Id = 10





        //    return Ok(data);

        //}



        //get property accordeing to rent

        [EnableCors("Policy1")]

        [HttpGet("getpropertyon_rnt")]

        public async Task<IActionResult> getpropertyon_city()
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec Allsell_Prop ");





            return Ok(data);

        }




        //get property accordeing to sell

        [EnableCors("Policy1")]

        [HttpGet("getpropertyon_sell")]

        public async Task<IActionResult> getpropertyon_sell()
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec Allrent_Prop ");





            return Ok(data);

        }



        //////////////////////////////////////
        //////////////////////////////////////
        //////////////////////////////////////
        //////////////////////////////////////
        //////////////////////////////////////

        //post propertyy//////


        [EnableCors("Policy1")]

        [HttpPost("post_ownerdetails")]

        public async Task<IActionResult> post_ownerdetails(Ownerdetails_DTO ownerdetails_)
        {

            var data = new Owner();
            data.OwnerId = ownerdetails_.Owner_Id;
            data.CreatedDate = DateTime.Now;
            data.ModifiedDate = DateTime.Now;
            data.CreatedBy = ownerdetails_.Owner_Id;
            data.ModifedBy = ownerdetails_.Owner_Id;
            data.OwnerName = ownerdetails_.Owner_Name;
            data.ContactNo = ownerdetails_.contact_no;
            data.Email = ownerdetails_.Email;






            _context.AddAsync(data);
            _context.SaveChanges();

            return Ok(data.Id);

        }




        [EnableCors("Policy1")]

        [HttpPost("post_Addressdetails")]

        public async Task<IActionResult> post_Addressdetails(int uid, Addressdetails_DTO addressdetails_)
        {

            var data = new Address();
            data.CreatedDate = DateTime.Now;
            data.ModifiedDate = DateTime.Now;
            data.CreatedBy = uid;
            data.ModifedBy = uid;
            data.Area = addressdetails_.Area;
            data.BuildingName = addressdetails_.Building_Name;
            data.State = addressdetails_.State;

            //  data.State = Convert.ToInt32(addressdetails_.State);

            data.City = addressdetails_.City;
            data.Pincode = addressdetails_.Pincode;







            _context.AddAsync(data);
            _context.SaveChanges();

            return Ok(data.AddId);

        }



        [EnableCors("Policy1")]

        [HttpPost("post_Propdetails")]

        public async Task<IActionResult> post_Propdetails(int uid, Propertydetails_DTO propertydetails_)
        {

            var data = new Property();
            data.CreatedDate = DateTime.Now;
            data.ModifiedDate = DateTime.Now;
            data.CreatedBy = uid;
            data.ModifedBy = uid;

            data.Address = propertydetails_.Address;
            data.OwnerDetails = propertydetails_.Owner_details;
            data.PostedBy = propertydetails_.PostedBy;
            data.PropFor = propertydetails_.Prop_for;
            data.PropType = propertydetails_.Prop_Type;
            data.Status = propertydetails_.Status;
            data.Price = propertydetails_.Price;
            data.PropDesc = propertydetails_.Prop_desc;

            _context.AddAsync(data);
            _context.SaveChanges();

            return Ok(data.PropId);

        }



        [EnableCors("Policy1")]

        [HttpPost("post_PropAmenities")]

        public async Task<IActionResult> post_PropAmenities(int uid, int prop_id, Amenity_DTO amenity_)
        {
            var count = _context.PropAmenities.Where(x => x.PropId == prop_id).ToArray();
            if (count.Length != 0)
            {
                _context.PropAmenities.RemoveRange(count);

                _context.SaveChanges();
            }

            foreach (var x in amenity_.amenities)
            {

                if (x.exist == true)
                {
                    var data = new PropAmenity();
                    data.CreatedDate = DateTime.Now;
                    data.ModifiedDate = DateTime.Now;
                    data.CreatedBy = uid;
                    data.ModifedBy = uid;
                    data.PropId = prop_id;
                    data.AmId = x.id;
                    _context.AddAsync(data);



                }

            }
            _context.SaveChanges();
            return Ok();

        }



        [EnableCors("Policy1")]

        [HttpPost("post_PropImages")]

        public async Task<IActionResult> post_PropImages(int uid, int prop_id, PropertyImages_DTO images_)
        {

            foreach (var x in images_.images)
            {
                var data = new PropertyImage();
                data.CreatedDate = DateTime.Now;
                data.ModifiedDate = DateTime.Now;
                data.CreatedBy = uid;
                data.ModifedBy = uid;
                data.PropertyId = prop_id;
                data.ImageUrl = x.imageurl;
                _context.AddAsync(data);
            }
            _context.SaveChanges();
            return Ok();

        }


        [EnableCors("Policy1")]

        [HttpPost("ImageUrl")]
        public async Task<IActionResult> geturl(IFormFile file)
      {
             var accesskey = _configuration.GetSection("aws:accesskey").Value;
             var secretAccesskey = _configuration.GetSection("aws:secrateAccesskey").Value;
             var bucketname = _configuration.GetSection("aws:bucketname").Value;

             if (file == null || file.Length <= 0)
             {
                 return BadRequest("No file specified.");
             }
             var destKey = $"Images/{file.FileName.ToLower()}";




             using (var client = new AmazonS3Client(accesskey, secretAccesskey, Amazon.RegionEndpoint.APSouth1))


             {
                 using (var transferUtility = new TransferUtility(client))
                 {
                     var transferUtilityRequest = new TransferUtilityUploadRequest
                     {
                         BucketName = bucketname,
                         Key = destKey,
                         InputStream = file.OpenReadStream(),
                         //CannedACL = S3CannedACL.PublicRead
                     };

                     await transferUtility.UploadAsync(transferUtilityRequest);
                 }
             }
             var reg = RegionEndpoint.APSouth1;
             var url = $"https://{bucketname}.s3.{reg.SystemName}.amazonaws.com/{destKey}";
             var resp = new
             {
                 imageurl = url
             };


             return Ok(resp);

         }
     
     


        ///   
        /// 
        ///    
        /// 


        //edit property details
        [EnableCors("Policy1")]

        [HttpPut("deleteProperty")]
        public async Task<IActionResult> deleteProperty(int pid)
        {

            var data = _context.Properties.FirstOrDefault(x => x.PropId == pid);

            if (data.Status == 14)
            {
                data.Status = 15;

                _context.SaveChanges();


                return Ok();

            }
            else
            {
                data.Status = 14;

                _context.SaveChanges();


                return Ok();

            }

           

        }


        [EnableCors("Policy1")]

        [HttpGet("get_ownerdetails")]
        public async Task<IActionResult> get_ownerdetails(int uid, int pid)
        {

            var data = (from p in _context.Properties
                        join o in _context.Owners on p.OwnerDetails equals o.Id
                        where p.PropId == pid && o.OwnerId == uid
                        // select o.Id).ToList();
                        select new
                        {
                            p.PropId,
                            ownwerDetails_id = o.Id,
                            o.OwnerName,
                            o.ContactNo,
                            o.Email
                        }).ToList();


            return Ok(data[0]);

        }

        [EnableCors("Policy1")]

        [HttpGet("get_addressdetails")]
        public async Task<IActionResult> get_addressdetails(int pid)
        {

            var data = (from p in _context.Properties
                        join ad in _context.Addresses on p.Address equals ad.AddId
                        where p.PropId == pid
                        //select ad.AddId).ToList();
                        select new
                        {
                            PropertyDetails_Id = p.PropId,
                            AddressDetails_Id = ad.AddId,
                            ad.BuildingName,
                            ad.Area,
                            ad.State,
                            ad.City,
                            ad.Pincode
                        }).ToList();

            return Ok(data[0]);

        }

        [EnableCors("Policy1")]

        [HttpGet("get_Propertydetails")]
        public async Task<IActionResult> get_Propertydetails(int pid)
        {

            var data = (from p in _context.Properties
                        where p.PropId == pid
                        // select p.PropId).ToList();
                        select new
                        {
                            PropDetails_id = p.PropId,
                            p.OwnerDetails,
                            p.Address,
                            p.PostedBy,
                            p.PropFor,
                            p.PropType,
                            p.Price,
                            p.PropDesc
                        }).ToList();
            return Ok(data[0]);

        }




        //edit ownerdetails

        [EnableCors("Policy1")]

        [HttpPut("edit_ownerdetails")]
        public async Task<IActionResult> edit_ownerdetails(int ownerdetails_Id, Ownerdetails_DTO _DTO)
        {
            var data = _context.Owners.FirstOrDefault(x => x.Id == ownerdetails_Id);
            data.Email = _DTO.Email;
            data.ContactNo = _DTO.contact_no;
            data.OwnerName = _DTO.Owner_Name;
            data.ModifiedDate = DateTime.Now;

            _context.SaveChanges();

            return Ok(data);
        }




        //edit Addressdetails

        [EnableCors("Policy1")]

        [HttpPut("edit_addressdetails")]
        public async Task<IActionResult> edit_addressdetails(int addressdetails_id, Addressdetails_DTO _DTO)
        {
            var data = _context.Addresses.FirstOrDefault(x => x.AddId == addressdetails_id);

            data.ModifiedDate = DateTime.Now;
            data.Area = _DTO.Area;
            data.City = _DTO.City;
            data.State = _DTO.State;
            data.BuildingName = _DTO.Building_Name;
            data.Pincode = _DTO.Pincode;

            _context.SaveChanges();

            return Ok(data);
        }





        //edit propertydetails

        [EnableCors("Policy1")]

        [HttpPut("edit_propertydetails")]
        public async Task<IActionResult> edit_propertydetails(int propertydetails_id, Propertydetails_DTO _DTO)
        {
            var data = _context.Properties.FirstOrDefault(x => x.PropId == propertydetails_id);

            data.ModifiedDate = DateTime.Now;

            data.PropDesc = _DTO.Prop_desc;
            data.Price = _DTO.Price;
            data.PropFor = _DTO.Prop_for;
            data.PropType = _DTO.Prop_Type;
            data.PostedBy = _DTO.PostedBy;
            _context.SaveChanges();

            return Ok(data);
        }



        ////edit amenities

        //[HttpGet("edit_PropAmenities")]

        //public async Task<IActionResult> edit_PropAmenities(int prop_id)
        //{

        //    var data = _context.PropAmenities.Where(x => x.PropId == prop_id).ToArray();
        //    if(data.Length !=0)
        //    {
        //    _context.PropAmenities.RemoveRange(data);

        //   _context.SaveChanges();
        //    }

        //    return Ok(data);

        //}



        //delete image

        [EnableCors("Policy1")]

        [HttpDelete("delete_propertyimage")]
        public async Task<IActionResult> delete_propertyimage(int image_id)
        {
            var data = _context.PropertyImages.FirstOrDefault(x => x.ImgId == image_id);
            var propid = data.PropertyId;
            var data2 = (from p in _context.PropertyImages where p.PropertyId == propid select p.ImgId).ToArray();

            if (data2.Length <= 1)
            {
                return BadRequest(new { error = "Property should have atleast 1 image" });
            }
            else
            {


                _context.PropertyImages.Remove(data);




                _context.SaveChanges();

                return Ok(data);
            }

        }



      




        //get callback request form
        [EnableCors("Policy1")]

        [HttpGet("get_callback")]
        public async Task<IActionResult> get_callback(int uid, string o_email, string buyer_c_no)
        {
            var byer_data = _context.Users.FirstOrDefault(x => x.UId == uid);
            var owner_data = _context.Owners.FirstOrDefault(x => x.Email == o_email);

            //     Send the email
            var r = o_email;
            var s = "Intersted in property";
            var b = $"Dear {owner_data.OwnerName},\n\nI hope this email finds you well. I wanted to inform you that {byer_data.Name} has expressed a keen interest in your property.\n\nPlease find his contact details below:\nName: {byer_data.Name}\nContact Number: {buyer_c_no}\n\nI kindly request you to reach out to him at your earliest convenience to discuss the details of the property and arrange a callback.\n\nIf you have any further inquiries or require additional information, please feel free to contact us.\n\nThank you for your attention to this matter.\n\nBest regards,\nMagicBricks ";
            _emailService.SendEmail(r, s, b);
            var resp = new
            {
                message = $"Email sent to {r}"
            };
            return Ok(resp);
        }




        //get contact details form

        [EnableCors("Policy1")]

        [HttpGet("get_contactdetails")]
        public async Task<IActionResult> get_contactdetails(int pid, string buyer_email, string buyer_name, string buyer_c_no)
        {

            var propertydata = (from p in _context.Properties
                                join o in _context.Owners on p.OwnerDetails equals o.Id
                                where p.PropId == pid
                                select new
                                {

                                    o.OwnerName,
                                    o.ContactNo,
                                    o.Email

                                }).FirstOrDefault();





            //     Send the email
            var r = buyer_email;
            var s = "Property Detail That You Requested";
            var b = $"Dear {buyer_name},\n\nI hope this email finds you well. I wanted to inform that you expressed a keen interest in property.\n\nPlease find his contact details of owner below:\nName: {propertydata.OwnerName}\nContact Number: {propertydata.ContactNo}\nEmail: {propertydata.Email}\n\nIf you have any further inquiries or require additional information, please feel free to contact us.\n\nThank you for your attention to this matter.\n\nBest regards,\nMagicBricks ";
            _emailService.SendEmail(r, s, b);
            var resp = new
            {
                message = $"Email sent to {r}"
            };
            return Ok(resp);

            // return Ok();
        }





        //get property info button

        [EnableCors("Policy1")]

        [HttpGet("getProperty_Info")]

        public async Task<IActionResult> getProperty_Info(int uid, int pid)
        {
            var data = _context.PropertySps.FromSqlRaw($"Exec Propby_id @pid={pid}").ToList();
            var userdetails = _context.Users.FirstOrDefault((x) => x.UId == uid);



            //     Send the email
            var r = userdetails.Email;
            var s = "Property Detail That You Requested";
            var b = $"Dear {userdetails.Name},\n\nI hope this email finds you well. I wanted to inform that you expressed a keen interest in property.\n\nPlease find property details below:\n\nBuilding Name: {data[0].Building_Name}\nAddress: {data[0].Building_Name},{data[0].Area},{data[0].city},{data[0].state},{data[0].Pincode} \nPrice: {data[0].Price} \n\nPlease find owner details below:\n\nowner Name: {data[0].Owner_Name}\nContact Number: {data[0].o_contact}\nEmail: {data[0].o_email}\n\nIf you have any further inquiries or require additional information, please feel free to contact us.\n\nThank you for your attention to this matter.\n\nBest regards,\nMagicBricks ";
            _emailService.SendEmail(r, s, b);
            var resp = new
            {
                message = $"Email sent to {r}"
            };
            return Ok(resp);

        }





    }



    }



    