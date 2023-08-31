using System.ComponentModel.DataAnnotations;


namespace Magicbrick.DTOs
{
    public class Propertydetails_DTO
    {


        [Required(AllowEmptyStrings = false)]

        public string Prop_desc { get; set; }


        [Required]

        public int Price { get; set; }

        [Required]

        public int Address { get; set; }


        [Required]
        public int Owner_details { get; set; }

        [Required]
        public int PostedBy { get; set; }
        [Required]
        public int Prop_Type { get; set; }

        [Required]
        public int Prop_for { get; set; }


        public int Status { get; set; }





    }
}
