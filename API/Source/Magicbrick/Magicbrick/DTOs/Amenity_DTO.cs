namespace Magicbrick.DTOs
{
 

 
public class Amenity_DTO

    {

        public AmenityDTO[] amenities { get; set; }

    }


    public class AmenityDTO

    {

        public int id { get; set; }

        public string amenity { get; set; }

        public bool exist { get; set; }

 
    }
}
