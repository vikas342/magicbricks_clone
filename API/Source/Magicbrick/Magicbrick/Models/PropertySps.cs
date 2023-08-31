using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;


namespace Magicbrick.Models
{
    [Keyless]
    public class PropertySps
    {
        public int? U_Id { get; set; }
        public int? Prop_Id { get; set; }
        public string? Prop_desc { get; set; }

        public string? Owner_Name { get; set; }
        public string? o_email { get; set; }
        public string? o_contact { get; set; }
        public string? Building_Name { get; set; }
        public string? Area { get; set; }
        public string? Pincode { get; set; }
        public string? state { get; set; }
        public string? city { get; set; }
        public string? PostedBy { get; set; }
        public string? PropertyFor { get; set; }
        public string? PropertyType { get; set; }
        public string? Status { get; set; }
        public int? Price { get; set; }
        public DateTime? CreatedDate { get; set; }

        public string? prop_amenities { get; set; }
        public string? imageUrl { get; set; }



        //public List<Amenity> prop_amenities { get; set; } = new List<Amenity>();
        //public List<Image> imageUrl { get; set; } = new List<Image>();
    }

    public class Amenity
    {
        public string? amenity { get; set; }
    }

    public class Image
    {
        public int Img_Id { get; set; }
        public string? Image_url { get; set; }
    }



}
