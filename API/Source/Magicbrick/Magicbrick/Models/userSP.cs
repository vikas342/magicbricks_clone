using MessagePack;
using Microsoft.EntityFrameworkCore;

namespace Magicbrick.Models
{
    [Keyless]
    public class userSP
    {
        public int U_id { get; set; }
        public string Name { get; set; }
        public string Email { get; set;}
    }
    
}
