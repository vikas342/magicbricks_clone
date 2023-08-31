namespace Magicbrick.DTOs
{
    
    public class UsrDTO
    {
        public int Uid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Role { get; set; }
    }

}
