using System.ComponentModel.DataAnnotations;


namespace Magicbrick.DTOs
{
    public class userprofile_DTO
    {


        [Required(AllowEmptyStrings = false)]
        public string name { get; set; }


        [Required(AllowEmptyStrings = false)]
        public string email { get; set; }


}
}
