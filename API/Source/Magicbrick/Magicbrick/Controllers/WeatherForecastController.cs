using Magicbrick.Interfaces;
using Magicbrick.Models;
using Microsoft.AspNetCore.Mvc;

namespace Magicbrick.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly Iproperty _prop;

        public WeatherForecastController(Iproperty x)
        {
            _prop = x;
            
        }
      


        //[HttpGet(Name = "GetWeatherForecast")]
        //public  Task<IEnumerable<Property>> Get()
        //{
        //    return _prop.GetAll();
           
        //}

        
    }
}