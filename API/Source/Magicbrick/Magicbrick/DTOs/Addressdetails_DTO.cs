using System.ComponentModel.DataAnnotations;

namespace Magicbrick.DTOs
{
    public class Addressdetails_DTO
    {


        [Required(AllowEmptyStrings = false)]
        public string Area { get; set; }


        [Required(AllowEmptyStrings = false)]

        public string Building_Name { get; set; }


        public int City { get; set; }
        public string Pincode { get; set; }

        public int State { get; set; }







    }
}
