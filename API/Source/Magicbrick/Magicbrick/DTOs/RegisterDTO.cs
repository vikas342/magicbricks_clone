using System.ComponentModel.DataAnnotations;

namespace Magicbrick.DTOs
{
    public class RegisterDTO
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter Name")]
        public string Name { get; set; }



        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter Email")]
        public string Email { get; set; }



        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter password")]
        public string Password { get; set; }
        public int Role { get; set; } 

    }
}
