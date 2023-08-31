using System.ComponentModel.DataAnnotations;

namespace Magicbrick.DTOs
{
    public class Ownerdetails_DTO
    {


        [Required(AllowEmptyStrings = false)]

        public string Email { get; set; }
        public int Owner_Id { get; set; }

        [Required(AllowEmptyStrings = false)]

        public string Owner_Name { get; set; }


        [Required(AllowEmptyStrings = false)]

        public string contact_no { get; set; }






 

    }
}
