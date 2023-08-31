using Magicbrick.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Magicbrick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenricController<T> : Controller where T : class

    {

        private IGenric<T> _igenric;

        public GenricController(IGenric<T> igenric)
        {
            _igenric = igenric;
        }


        [EnableCors("Policy1")]

        // GET: api/<GenricController>
        [HttpGet("getall")]
        public  Task<List<T>> Getall()
        {
            return _igenric.GetAll();
        }


        [EnableCors("Policy1")]

        // GET api/<GenricController>/5
        [HttpGet("{id}")]

        public Task<T> GetById(int id)
        {
            return _igenric.GetById(id);


        }


        [EnableCors("Policy1")]

        // POST api/<GenricController>
        [HttpPost]
        public Task<List<T>> Insert([FromBody] T value)
        {
            return _igenric.Insert(value);

        }

        //// PUT api/<GenricController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}


        [EnableCors("Policy1")]

        // DELETE api/<GenricController>/5
        [HttpDelete("{id}")]
       public Task<List<T>> Delete(int id)
        {
            return _igenric.Delete(id);
        }
    }
}
