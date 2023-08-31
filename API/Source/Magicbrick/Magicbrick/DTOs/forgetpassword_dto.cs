using System.ComponentModel.DataAnnotations;


namespace Magicbrick.DTOs
{
    public class forgetpassword_verifyemail_dto
    {

        [Required(AllowEmptyStrings = false)]

        public string Email { get; set; }

    }
    public class forgetpassword_verifyotp_dto
    {
        [Required(AllowEmptyStrings = false)]

        public string otp { get; set; }


    }
    public class forgetpassword_setpassword_dto
    {
        [Required(AllowEmptyStrings = false)]

        public string password { get; set; }

        [Required(AllowEmptyStrings = false)]

        public string cpassword { get; set; }


    }


    //    {Email: 'v@f'} 
    //{ otp: '852'}
    // { password: '852', cpassword: '52'}


}
