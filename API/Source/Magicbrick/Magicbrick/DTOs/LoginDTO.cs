using System.ComponentModel.DataAnnotations;

namespace Magicbrick.DTOs
{
    public class LoginDTO
    {

        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter Email")]
        public string Email { get; set; }



        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter password")]
        public string Password { get; set; }
    }
}
