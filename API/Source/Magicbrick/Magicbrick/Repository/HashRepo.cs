using Magicbrick.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace Magicbrick.Repository
{
    public class HashRepo : IHash
    {
        public string Hash(string pw, string salt)
        {
            var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(salt));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pw));
            return Convert.ToBase64String(hash);
        }

        public bool verify(string inputpassword, string hashedpassword, string salt)
        {
            var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(salt));
            var inputhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(inputpassword));
            string inputpass = Convert.ToBase64String(inputhash);
            return string.Equals(hashedpassword, inputpass, StringComparison.OrdinalIgnoreCase);
        }
    }
}
