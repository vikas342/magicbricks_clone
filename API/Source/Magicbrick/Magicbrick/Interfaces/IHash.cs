namespace Magicbrick.Interfaces
{
    public interface IHash
    {


        public string Hash(string pw, string salt);
        public bool verify(string inputpassword, string hashedpassword, string salt);
    }
}
