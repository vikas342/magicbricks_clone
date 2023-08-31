using Magicbrick.Interfaces;
using Magicbrick.Models;
using Magicbrick.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Org.BouncyCastle.Utilities;

namespace Magicbrick.Controllers
{




    [Route("api/[controller]")]
    //[ApiController]
    public class PropertyEssentials : ControllerBase
    {

        private readonly MagicBricksDbContext _context;

        public PropertyEssentials(MagicBricksDbContext context)
        {
            _context = context;
        }





        //get prop by city

        [EnableCors("Policy1")]

        [HttpGet("getpropbycities")]

        public async Task<IActionResult> getpropbycities()
        {
            var data = (
                from ot in _context.Objecttypes
                join o in _context.Objects on ot.Id equals o.ObjTypeId
                where ot.ParentId == 4
                select new
                {
                    id = o.Id,
                    city = o.Name,
                    stateid=o.ObjTypeId
                }

                ).ToList();


            return Ok(data);



        }




        //get prop by states

        [EnableCors("Policy1")]

        [HttpGet("getpropbystate")]

        public async Task<IActionResult> getpropbystate()
        {
            var data = (
                from ot in _context.Objecttypes

                where ot.ParentId == 4
                select new
                {
                    id = ot.Id,
                    state = ot.Name
                }

                ).ToList();


            return Ok(data);



        }






        //get proptype


        [EnableCors("Policy1")]

        [HttpGet("getproptype")]

        public async Task<IActionResult> getproptype()
        {
            var data = (
                from ot in _context.Objecttypes
                join o in _context.Objects on ot.Id equals o.ObjTypeId
                where ot.Id == 2
                select new
                {
                    id = o.Id,
                    type = o.Name
                }

                ).ToList();


            return Ok(data);



        }



        //prop for

        [EnableCors("Policy1")]

        [HttpGet("Propfor")]

        public async Task<IActionResult> Propfor()
        {
            var data = from x in _context.Objects
                       where x.ObjTypeId == 3
                       select new
                       {
                           id = x.Id,
                           propfor = x.Name
                       };
            //   select  name as propfor  from Object where Obj_type_Id = 3






            return Ok(data);

        }



        //prop amenities

        [EnableCors("Policy1")]

        [HttpGet("PropAmenities")]

        public async Task<IActionResult> PropAmenities()
        {
            var data = from x in _context.Objects
                       where x.ObjTypeId == 8
                       select new
                       {
                           id = x.Id,
                           amenity = x.Name
                       };



            return Ok(data);

        }





        //prop posted by

        [EnableCors("Policy1")]

        [HttpGet("postedby")]

        public async Task<IActionResult> postedby()
        {
            var data = from x in _context.Objects where x.ObjTypeId == 10 select new { id = x.Id, postedby = x.Name };
            //   select  name as propfor  from Object where Obj_type_Id = 10





            return Ok(data);

        }


        ///////////////
        ///////////////
        ///////////////
        ///////////////
        ///////////////



        //add property essential in db

        //add states
        [EnableCors("Policy1")]

        [HttpPost("addstate")]

        public async Task<IActionResult> addstate(string state)
        {
            var checker=_context.Objecttypes.FirstOrDefault(x => x.Name == state);
            if (checker == null)
            {


            var data = new Objecttype();

                data.Name = char.ToUpper(state[0]) + state.Substring(1); // Capitalize the first character
                data.ParentId = 4;


            _context.AddAsync(data);
            _context.SaveChanges();
            return Ok(data);
            }
            else
            {
                return BadRequest("State Alredy Exist");
            }
        }




        ///////////////
        ///////////////
        ///////////////
        ///////////////
        ///////////////
        ///





        //add city
        [EnableCors("Policy1")]

        [HttpPost("addcity")]

        public async Task<IActionResult> addcity(int stateid,string city)
        {
            var checker = _context.Objects.FirstOrDefault(x => x.Name == city);
            if (checker == null)
            {

                var data = new Models.Object();
                data.Name = char.ToUpper(city[0]) + city.Substring(1); // Capitalize the first character
                data.ObjTypeId = stateid;


                _context.AddAsync(data);
                _context.SaveChanges();
                return Ok(data);


            }
            else
            {
                return BadRequest("City Alredy Exist");
            }
        }






        //add amenity
        [EnableCors("Policy1")]

        [HttpPost("addamenity")]

        public async Task<IActionResult> addamenity( string amenity)
        {
            var checker = _context.Objects.FirstOrDefault(x => x.Name == amenity);
            if (checker == null)
            {

                var data = new Models.Object();
                data.Name = char.ToUpper(amenity[0]) + amenity.Substring(1); // Capitalize the first character
                data.ObjTypeId = 8;


                _context.AddAsync(data);
                _context.SaveChanges();
                return Ok(data);


            }
            else
            {
                return BadRequest("Amenity Alredy Exist");
            }
        }

    }
}
